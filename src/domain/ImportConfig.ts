import { ServiceDetail } from "./ServiceDetail"

export interface ImportConfig {
  nextLink: any
  AvailableListingCount: any
  serviceDetail: ServiceDetail
  Id: Number
  LegacyImportId: String
  Name: String
  SearchQuery: string
  ProviderType: String
  ProviderUrl: Number
  ProviderUsername: String
  ProviderPassword: String
  UseProxy: Number
  RequestLimit: Number
  AdditionalHeaders: AdditionalHeaders
  RunIntervalMinutes: Number
  AdditionalConfig: AdditionalConfig
  CreatedAt: Date
  UpdatedAt: Date
  DeletedAt: Date
}

interface AdditionalConfig {
  [property: string]: any
}

interface AdditionalHeaders {
  [property: string]: any
}