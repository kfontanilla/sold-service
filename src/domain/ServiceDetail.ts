export interface ServiceDetail {
    ImportConfigId: Number
    AvailableListingCount?: any
    ImportedListingCount?: number
    ImageDownLoaded?: number
    LastSuccessfulRun?: Date
    ServiceDetails: { 
      extractfull?: { startLink?: any; nextLink?: string; };
      extractincremental?: { startLink?: any; nextLink?: string; };
      modificationTimestamp?: string; 
    }
  }