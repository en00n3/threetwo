import axios from "axios";
import { IFolderData, IExtractedComicBookCoverFile } from "threetwo-ui-typings";
import { API_BASE_URI, SOCKET_BASE_URI } from "../constants/endpoints";
import { io } from "socket.io-client";
import {
  IMS_COMICBOOK_METADATA_FETCHED,
  IMS_SOCKET_CONNECTION_CONNECTED,
  IMS_RECENT_COMICS_FETCHED,
  CV_API_CALL_IN_PROGRESS,
  CV_SEARCH_SUCCESS,
  CV_CLEANUP,
  IMS_CV_METADATA_IMPORT_CALL_IN_PROGRESS,
  IMS_CV_METADATA_IMPORT_SUCCESSFUL,
  IMS_CV_METADATA_IMPORT_FAILED,
} from "../constants/action-types";
import { refineQuery } from "../shared/utils/filenameparser.utils";
import sortBy from "array-sort-by";

export async function walkFolder(path: string): Promise<Array<IFolderData>> {
  return axios
    .request<Array<IFolderData>>({
      url: "http://localhost:3000/api/import/walkFolders",
      method: "POST",
      data: {
        basePathToWalk: path,
      },
      transformResponse: (r: string) => JSON.parse(r),
    })
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch((error) => error);
}
/**
 * Fetches comic book covers along with some metadata
 *
 * using {@link Renderer}.
 *
 * Used by external plugins
 *
 * @param  {Object} options
 * @return {Promise<string>}                HTML of the page
 */
export const fetchComicBookMetadata = (options) => async (dispatch) => {
  const extractionOptions = {
    sourceFolder: options,
    extractTarget: "cover",
    targetExtractionFolder: "./userdata/covers",
    extractionMode: "bulk",
    paginationOptions: {
      pageLimit: 25,
      page: 1,
    },
  };
  const walkedFolders = await walkFolder("./comics");

  const socket = io(SOCKET_BASE_URI, {
    reconnectionDelayMax: 10000,
  });

  socket.on("connect", () => {
    console.log(`connect ${socket.id}`);
    dispatch({
      type: IMS_SOCKET_CONNECTION_CONNECTED,
      socketConnected: true,
    });
  });

  socket.on("disconnect", () => {
    console.log(`disconnect`);
  });
  socket.emit("importComicsToDB", {
    action: "getComicCovers",
    params: {
      extractionOptions,
      walkedFolders,
    },
  });

  socket.on("comicBookCoverMetadata", (data: IExtractedComicBookCoverFile) => {
    dispatch({
      type: IMS_COMICBOOK_METADATA_FETCHED,
      data,
      dataTransferred: true,
    });
  });
};

export const getComicBooks = (options) => async (dispatch) => {
  const { paginationOptions } = options;
  return axios
    .request({
      url: "http://localhost:3000/api/import/getComicBooks",
      method: "POST",
      data: {
        paginationOptions,
      },
    })
    .then((response) => {
      dispatch({
        type: IMS_RECENT_COMICS_FETCHED,
        data: response.data,
      });
    });
};

export const importToDB = (payload?: any) => (dispatch) => {
  try {
    const comicBookMetadata = {
      importStatus: {
        isImported: true,
        tagged: false,
        matchedResult: {
          score: "0",
        },
      },
      sourcedMetadata: { comicvine: payload || null },
    };
    dispatch({
      type: IMS_CV_METADATA_IMPORT_CALL_IN_PROGRESS,
    });

    return axios
      .request({
        url: "http://localhost:3000/api/import/rawImportToDb",
        method: "POST",
        data: comicBookMetadata,
        transformResponse: (r: string) => JSON.parse(r),
      })
      .then((response) => {
        const { data } = response;
        dispatch({
          type: IMS_CV_METADATA_IMPORT_SUCCESSFUL,
          importResult: data,
        });
      });
  } catch (error) {
    dispatch({
      type: IMS_CV_METADATA_IMPORT_FAILED,
      importError: error,
    });
  }
};
export const fetchComicVineMatches = (searchPayload) => (dispatch) => {
  try {
    const issueString = searchPayload.rawFileDetails.name;
    const issueSearchQuery: IComicVineSearchQuery = refineQuery(issueString);
    let seriesSearchQuery: IComicVineSearchQuery = {} as IComicVineSearchQuery;
    if (searchPayload.rawFileDetails.containedIn !== "comics") {
      seriesSearchQuery = refineQuery(
        searchPayload.rawFileDetails.containedIn.split("/").pop(),
      );
    }

    dispatch({
      type: CV_API_CALL_IN_PROGRESS,
    });

    axios
      .request({
        url: "http://localhost:3080/api/comicvine/fetchresource",
        method: "POST",
        data: {
          format: "json",
          sort: "name%3Aasc",
          // hack
          query: issueSearchQuery.searchParams.searchTerms.name
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .trim(),
          fieldList: "id",
          limit: "20",
          offset: "0",
          resources: "issue",
          scorerConfiguration: {
            searchQuery: {
              issue: issueSearchQuery,
              series: seriesSearchQuery,
            },
            rawFileDetails: searchPayload.rawFileDetails,
          },
        },
        transformResponse: (r) => {
          const matches = JSON.parse(r);
          return sortBy(matches, (match) => -match.score);
        },
      })
      .then((response) => {
        dispatch({
          type: CV_SEARCH_SUCCESS,
          searchResults: response.data,
          searchQueryObject: {
            issue: issueSearchQuery,
            series: seriesSearchQuery,
          },
        });
      });

    /* return { issueSearchQuery, series: seriesSearchQuery.searchParams }; */
  } catch (error) {
    console.log(error);
  }

  dispatch({
    type: CV_CLEANUP,
  });
};
