export interface ITunesResult {
  trackId: number;
  collectionId?: number;
  artistId?: number;
  artistName: string;
  collectionName?: string;
  trackName?: string;
  artworkUrl100: string;
  kind?: string;
  wrapperType: string;
}

export interface ITunesResponse {
  resultCount: number;
  results: ITunesResult[];
}

export interface ClientSearchState {
  allResults: ITunesResult[];
  displayedResults: ITunesResult[];
  loading: boolean;
  error: string | null;
  query: string;
  displayCount: number;
  hasMore: boolean;
  isInitialEmpty: boolean;
}