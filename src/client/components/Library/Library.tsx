import React, { useMemo, ReactElement, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { isEmpty, isNil, isUndefined } from "lodash";
import MetadataPanel from "../shared/MetadataPanel";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchIssue } from "../../actions/fileops.actions";
import ellipsize from "ellipsize";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";


export const Library = (): ReactElement => {
  const searchResults = useSelector(
    (state: RootState) => state.fileOps.libraryComics,
  );
  const searchError = useSelector(
    (state: RootState) => state.fileOps.librarySearchError,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      searchIssue(
        {
          query: {},
        },
        {
          pagination: {
            size: 15,
            from: 0,
          },
          type: "all",
          trigger: "libraryPage"
        },
      ),
    );
  }, []);

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 1,
      pageSize: 15,
    });


  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const T2Table = (tableOptions): ReactElement => {
    const { columns, totalPages, rowClickHandler } =
      tableOptions;

    // pagination methods
    const goToNextPage = useCallback(() => {
      setPagination({
        pageIndex: pageIndex + 1,
        pageSize,
      });
      dispatch(
        searchIssue(
          {
            query: {},
          },
          {
            pagination: {
              size: pageSize,
              from: pageSize * pageIndex + 1,
            },
            type: "all",
            trigger: "libraryPage",
          },
        ),
      );
    }, []);


    const goToPreviousPage = useCallback(() => {
      setPagination({
        pageIndex: pageIndex - 1,
        pageSize,
      });
      let from = 0;
      if (pageIndex === 2) {
        from = (pageIndex - 1) * pageSize + 2 - 17;
      } else {
        from = (pageIndex - 1) * pageSize + 2 - 16;
      }
      dispatch(
        searchIssue(
          {
            query: {},
          },
          {
            pagination: {
              size: pageSize,
              from,
            },
            type: "all",
            trigger: "libraryPage"
          },
        ),
      );
    }, []);

    const table = useReactTable({
      data: searchResults.hits.hits,
      columns,
      manualPagination: true,
      getCoreRowModel: getCoreRowModel(),
      pageCount: searchResults?.hits?.hits?.length ?? -1,
      state: {
        pagination,
      },
      onPaginationChange: setPagination,
    });

    return (
      <>
        <div className="columns table-controls">
          {/* Search bar */}
          <div className="column is-half">
            <SearchBar />
          </div>
          {/* pagination controls */}
          <nav className="pagination columns">
            <div className="mr-4 has-text-weight-semibold has-text-left">
              <p className="is-size-5">Page {pageIndex} of {Math.ceil(totalPages / pageSize)}</p>
              {/* <p>{totalPages} comics in all</p> */}
            </div>
            <div className="field has-addons">
              <p className="control">
                <div className="button" onClick={() => goToPreviousPage()}> <i className="fas fa-chevron-left"></i></div>
              </p>
              <p className="control">
                <div className="button" onClick={() => goToNextPage()}> <i className="fas fa-chevron-right"></i> </div>
              </p>

        <div className="field has-addons ml-5">
          <p className="control">
            <button className="button">
              <span className="icon is-small">
                <i className="fa-solid fa-list"></i>
              </span>
            </button>
          </p>
          <p className="control">
            <button className="button">
              <Link to="/library-grid">
                <span className="icon is-small">
                  <i className="fa-solid fa-image"></i>
                </span>
              </Link>
            </button>
          </p>
        </div>
            </div>
          </nav>
        </div>
        <table className="table is-hoverable">
          <thead>
            {table.getHeaderGroups().map((headerGroup, idx) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, idx) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row, idx) => {
              return (
                <tr
                  key={row.id}
                  onClick={() => rowClickHandler(row)}
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  };

  // programatically navigate to comic detail
  const navigate = useNavigate();
  const navigateToComicDetail = (row) => {
    navigate(`/comic/details/${row.original._id}`);
  };

  const ComicInfoXML = (value) => {
    return value.data ? (
      <div className="comicvine-metadata">
        <dl>
          <span className="tags has-addons is-size-7">
            <span className="tag">Series</span>
            <span className="tag is-warning is-light">
              {ellipsize(value.data.series[0], 25)}
            </span>
          </span>
        </dl>
        <dl>
          <div className="field is-grouped is-grouped-multiline">
            <div className="control">
              <span className="tags has-addons is-size-7  mt-2">
                <span className="tag">Pages</span>
                <span className="tag is-info is-light has-text-weight-bold">
                  {value.data.pagecount[0]}
                </span>
              </span>
            </div>

            <div className="control">
              <span className="tags has-addons is-size-7 mt-2">
                <span className="tag">Issue</span>
                {!isNil(value.data.number) && (
                  <span className="tag has-text-weight-bold is-success is-light">
                    {parseInt(value.data.number[0], 10)}
                  </span>
                )}
              </span>
            </div>
          </div>
        </dl>
      </div>
    ) : null;
  };

  const WantedStatus = ({ value }) => {
    return !value ? <span className="tag is-info is-light">Wanted</span> : null;
  };
  const columns = React.useMemo(() => [
    {
      header: "Comic Metadata",
      footer: 1,
      columns: [
        {
          header: "File Details",
          id: "fileDetails",
          minWidth: 400,
          accessorKey: "_source",
          cell: info => {
            return <MetadataPanel data={info.getValue()} />;
          },
        },
        {
          header: "ComicInfo.xml",
          accessorKey: "_source.sourcedMetadata.comicInfo",
          align: "center",
          minWidth: 250,
          cell: info =>
            !isEmpty(info.getValue()) ? (
              <ComicInfoXML data={info.getValue()} />
            ) : (
              <span className="tag mt-5">No ComicInfo.xml</span>
            ),
        },
      ],
    },
    {
      header: "Additional Metadata",
      columns: [
        {
          header: "Publisher",
          accessorKey:
            "_source.sourcedMetadata.comicvine.volumeInformation",
          cell: info => {
            return (
              !isNil(info.getValue()) && (
                <h6 className="is-size-7 has-text-weight-bold">
                  {info.getValue().publisher.name}
                </h6>
              )
            );
          },
        },
        {
          header: "Something",
          accessorKey: "_source.acquisition.source.wanted",
          cell: info => {
            !isUndefined(info.getValue()) ?
              <WantedStatus value={info.getValue().toString()} /> : "Nothing";
          },
        },
      ],
    }
  ], []);

  // ImportStatus.propTypes = {
  //   value: PropTypes.bool.isRequired,
  // };


  return (
    <section className="container">
      <div className="section">
        <div className="header-area">
          <h1 className="title">Library</h1>
        </div>
        {!isUndefined(searchResults.hits) && (
          <div>
            <div className="library">
              <T2Table
                totalPages={searchResults.hits.total.value}
                columns={columns}

                rowClickHandler={navigateToComicDetail}
              />
              {/* pagination controls */}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Library;
