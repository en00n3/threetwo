import {
  AIRDCPP_SEARCH_IN_PROGRESS,
  AIRDCPP_SEARCH_RESULTS_RECEIVED,
  AIRDCPP_HUB_SEARCHES_SENT,
  AIRDCPP_RESULT_DOWNLOAD_INITIATED,
  AIRDCPP_DOWNLOAD_PROGRESS_TICK,
} from "../constants/action-types";
import { LOCATION_CHANGE } from "connected-react-router";

const initialState = {
  isAirDCPPSearchInProgress: false,
  searchStatus: "",
  searchInfo: null,
  searchInstance: null,
  downloadResult: null,
  bundleDBImportResult: null,
};

function airdcppReducer(state = initialState, action) {
  switch (action.type) {
    case AIRDCPP_SEARCH_IN_PROGRESS:
      return {
        ...state,
        isAirDCPPSearchInProgress: true,
      };

    case AIRDCPP_SEARCH_RESULTS_RECEIVED:
      return {
        ...state,
        isAirDCPPSearchInProgress: false,
        searchStatus: "Search complete",
        results: action.results,
      };
    case AIRDCPP_HUB_SEARCHES_SENT:
      return {
        ...state,
        searchStatus: "Hub searches sent",
        isAirDCPPSearchInProgress: true,
        searchInfo: action.searchInfo,
        searchInstance: action.instance,
      };
    case AIRDCPP_RESULT_DOWNLOAD_INITIATED:
      return {
        ...state,
        downloadResult: action.downloadResult,
        bundleDBImportResult: action.bundleDBImportResult,
      };
    case AIRDCPP_DOWNLOAD_PROGRESS_TICK:
      return {
        ...state,
        downloadProgressData: action.downloadProgressData,
      };
    case LOCATION_CHANGE:
      return {
        initialState,
      };

    default:
      return state;
  }
}

export default airdcppReducer;