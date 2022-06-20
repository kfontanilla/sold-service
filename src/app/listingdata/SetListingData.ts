class SetListingData {
    listingDataRepository: any;
    constructor({ listingDataRepository }: { listingDataRepository: any }) {
      this.listingDataRepository = listingDataRepository;
    }

    async set(LegacyImportId: string, ListingData: any) {
        try {
            console.log('Populating Listing Data: ', LegacyImportId);
        
            const data = await this.listingDataRepository.save(ListingData);
            // check data for error 
            

            return data
          } catch (error) {
            console.log('SET_LISTING_DATA_ERROR', error);
          }
    }
  }
  
  export default SetListingData;
  