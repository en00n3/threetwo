export const CV_API_CALL_IN_PROGRESS = "CV_SEARCH_IN_PROGRESS";
export const CV_SEARCH_FAILURE = "CV_SEARCH_FAILURE";
export const CV_SEARCH_SUCCESS = "CV_SEARCH_SUCCESS";
export const CV_CLEANUP = "CV_CLEANUP";

export const CV_API_GENERIC_FAILURE = "CV_API_GENERIC_FAILURE";

export const IMS_COMICBOOK_METADATA_FETCHED = "IMS_SOCKET_DATA_FETCHED";

export const IMS_RAW_IMPORT_SUCCESSFUL = "IMS_RAW_IMPORT_SUCCESSFUL";
export const IMS_RAW_IMPORT_FAILED = "IMS_RAW_IMPORT_FAILED";

// Library service generic action types
export const LS_IMPORT_CALL_IN_PROGRESS = "LS_IMPORT_CALL_IN_PROGRESS";
// Library import bull mq queue control
export const LS_TOGGLE_IMPORT_QUEUE = "LS_TOGGLE_IMPORT_QUEUE";
export const LS_QUEUE_DRAINED = "LS_QUEUE_DRAINED";

// ComicVine Metadata
export const IMS_CV_METADATA_IMPORT_CALL_IN_PROGRESS =
  "IMS_CV_METADATA_IMPORT_CALL_IN_PROGRESS";
export const IMS_CV_METADATA_IMPORT_SUCCESSFUL =
  "IMS_CV_METADATA_IMPORT_SUCCESSFUL";
export const IMS_CV_METADATA_IMPORT_FAILED = "IMS_CV_METADATA_IMPORT_FAILED";

export const IMS_RECENT_COMICS_FETCHED = "IMS_RECENT_COMICS_FETCHED";
export const IMS_DATA_FETCH_ERROR = "IMS_DATA_FETCH_ERROR";

// Weekly pull list
export const CV_WEEKLY_PULLLIST_CALL_IN_PROGRESS =
  "CV_WEEKLY_PULLLIST_CALL_IN_PROGRESS";
export const CV_WEEKLY_PULLLIST_FETCHED = "CV_WEEKLY_PULLLIST_FETCHED";
export const CV_WEEKLY_PULLLIST_ERROR = "CV_WEEKLY_PULLLIST_ERROR";

// Single or multiple comic book mongo objects
export const IMS_COMIC_BOOK_DB_OBJECT_FETCHED =
  "IMS_COMIC_BOOK_DB_OBJECT_FETCHED";
export const IMS_COMIC_BOOKS_DB_OBJECTS_FETCHED =
  "IMS_COMIC_BOOKS_DB_OBJECTS_FETCHED";
export const IMS_COMIC_BOOK_DB_OBJECT_CALL_IN_PROGRESS =
  "IMS_COMIC_BOOK_DB_OBJECT_CALL_IN_PROGRESS";
export const IMS_COMIC_BOOK_DB_OBJECT_CALL_FAILED =
  "IMS_COMIC_BOOK_DB_OBJECT_CALL_FAILED";

// wanted comics from CV, LoCG and other sources
export const IMS_WANTED_COMICS_FETCHED = "IMS_WANTED_COMICS_FETCHED";

// volume groups
export const IMS_COMIC_BOOK_GROUPS_FETCHED = "IMS_COMIC_BOOK_GROUPS_FETCHED";
export const IMS_COMIC_BOOK_GROUPS_CALL_IN_PROGRESS =
  "IMS_COMIC_BOOK_GROUPS_CALL_IN_PROGRESS";
export const IMS_COMIC_BOOK_GROUPS_CALL_FAILED =
  "IMS_COMIC_BOOK_GROUPS_CALL_FAILED";

// search results from the Search service
export const SS_SEARCH_RESULTS_FETCHED = "SS_SEARCH_RESULTS_FETCHED";
export const SS_SEARCH_RESULTS_FETCHED_SPECIAL = "SS_SEARCH_RESULTS_FETCHED_SPECIAL";
export const SS_SEARCH_IN_PROGRESS = "SS_SEARCH_IN_PROGRESS";
export const SS_SEARCH_FAILED = "SS_SEARCH_FAILED";

// issues for a given volume
export const CV_ISSUES_METADATA_CALL_IN_PROGRESS =
  "CV_ISSUES_METADATA_CALL_IN_PROGRESS";
export const CV_ISSUES_METADATA_FETCH_SUCCESS =
  "CV_ISSUES_METADATA_FETCH_SUCCESS";
export const CV_ISSUES_METADATA_FETCH_FAILED =
  "CV_ISSUES_METADATA_FETCH_FAILED";
export const CV_ISSUES_FOR_VOLUME_IN_LIBRARY_SUCCESS =
  "CV_ISSUES_FOR_VOLUME_IN_LIBRARY_SUCCESS";
export const CV_ISSUES_FOR_VOLUME_IN_LIBRARY_UPDATED =
  "CV_ISSUES_FOR_VOLUME_IN_LIBRARY_UPDATED";
export const CV_ISSUES_MATCHES_IN_LIBRARY_FETCHED =
  "CV_ISSUES_MATCHES_IN_LIBRARY_FETCHED";

// extracted comic archive
export const IMS_COMIC_BOOK_ARCHIVE_EXTRACTION_SUCCESS =
  "IMS_COMIC_BOOK_ARCHIVE_EXTRACTION_SUCCESS";
export const IMS_COMIC_BOOK_ARCHIVE_EXTRACTION_CALL_IN_PROGRESS =
  "IMS_COMIC_BOOK_ARCHIVE_EXTRACTION_CALL_IN_PROGRESS";
export const IMS_COMIC_BOOK_ARCHIVE_EXTRACTION_CALL_FAILED =
  "IMS_COMIC_BOOK_ARCHIVE_EXTRACTION_CALL_FAILED";

// Image file stats
export const IMG_ANALYSIS_CALL_IN_PROGRESS = "IMG_ANALYSIS_CALL_IN_PROGRESS";
export const IMG_ANALYSIS_DATA_FETCH_SUCCESS =
  "IMG_ANALYSIS_DATA_FETCH_SUCCESS";
export const IMG_ANALYSIS_DATA_FETCH_ERROR = "IMG_ANALYSIS_DATA_FETCH_ERROR";

// library statistics
export const LIBRARY_STATISTICS_CALL_IN_PROGRESS =
  "LIBRARY_STATISTICS_CALL_IN_PROGRESS";
export const LIBRARY_STATISTICS_FETCHED = "LIBRARY_STATISTICS_FETCHED";
export const LIBRARY_STATISTICS_FETCH_ERROR = "LIBRARY_STATISTICS_FETCH_ERROR";

// fileops cleanup
export const FILEOPS_STATE_RESET = "FILEOPS_STATE_RESET";

// AirDC++
export const AIRDCPP_SEARCH_IN_PROGRESS = "AIRDCPP_SEARCH_IN_PROGRESS";
export const AIRDCPP_SEARCH_RESULTS_ADDED = "AIRDCPP_SEARCH_RESULTS_ADDED";
export const AIRDCPP_SEARCH_RESULTS_UPDATED = "AIRDCPP_SEARCH_RESULTS_UPDATED";
export const AIRDCPP_SEARCH_COMPLETE = "AIRDCPP_SEARCH_COMPLETE";

export const AIRDCPP_HUB_SEARCHES_SENT = "AIRDCPP_HUB_SEARCHES_SENT";
export const AIRDCPP_RESULT_DOWNLOAD_INITIATED =
  "AIRDCPP_RESULT_DOWNLOAD_INITIATED";
export const AIRDCPP_FILE_DOWNLOAD_COMPLETED =
  "AIRDCPP_FILE_DOWNLOAD_COMPLETED";
export const LS_SINGLE_IMPORT = "LS_SINGLE_IMPORT";
export const AIRDCPP_BUNDLES_FETCHED = "AIRDCPP_BUNDLES_FETCHED";
export const AIRDCPP_DOWNLOAD_PROGRESS_TICK = "AIRDCPP_DOWNLOAD_PROGRESS_TICK";

// Transfers
export const AIRDCPP_TRANSFERS_FETCHED = "AIRDCPP_TRANSFERS_FETCHED";

// LIBRARY SOCKET ENDPOINT
export const LS_IMPORT = "LS_IMPORT";
export const LS_COVER_EXTRACTED = "LS_COVER_EXTRACTED";
export const LS_COMIC_ADDED = "LS_COMIC_ADDED";

// Settings
export const SETTINGS_CALL_IN_PROGRESS = "SETTINGS_CALL_IN_PROGRESS";
export const SETTINGS_OBJECT_FETCHED = "SETTINGS_OBJECT_FETCHED";
export const SETTINGS_CALL_FAILED = "SETTINGS_CALL_FAILED";
export const SETTINGS_OBJECT_DELETED = "SETTINGS_OBJECT_DELETED";
export const SETTINGS_DB_FLUSH_SUCCESS = "SETTINGS_DB_FLUSH_SUCCESS";

// Metron Metadata
export const METRON_DATA_FETCH_SUCCESS = "METRON_DATA_FETCH_SUCCESS";
export const METRON_DATA_FETCH_IN_PROGRESS = "METRON_DATA_FETCH_IN_PROGRESS";
export const METRON_DATA_FETCH_ERROR = "METRON_DATA_FETCH_ERROR";
