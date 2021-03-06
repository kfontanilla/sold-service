import { ServiceDetail } from "./ServiceDetail"

export interface ImportConfig {
  nextLink: any
  AvailableListingCount: any
  serviceDetail: ServiceDetail
  Id: Number
  LegacyImportId: String
  Name: String
  SearchQuery: String
  ProviderType: String
  ProviderUrl: Number
  ProviderUsername: String
  ProviderPassword: String
  UseProxy: Number
  AdditionalHeaders: JSON
  RunIntervalMinutes: Number
  AdditionalConfig: JSON
  CreatedAt: Date
  UpdatedAt: Date
  DeletedAt: Date
}
