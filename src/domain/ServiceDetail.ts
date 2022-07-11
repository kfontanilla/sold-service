export interface ServiceDetail {
    ImportConfigId: Number
    AvailableListingCount?: any
    ImportedListingCount?: number
    ImageDownLoaded?: number
    LastSuccessfulRun?: Date
    ServiceDetails: { startLink?: any; nextLink?: string; modificationTimestamp?: string; }
  }