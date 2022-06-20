class GetImportConfigs {
    importConfigRepository: any;
    constructor({ importConfigRepository }: { importConfigRepository: any }) {
      this.importConfigRepository = importConfigRepository;
    }
  
    async execute(req: any, res: any) {
      try {
        const data = await this.importConfigRepository.getAll();
        res.json(data);
      } catch (error) {
        console.log('GET_IMPORT_CONFIGS_ERROR', error);
      }
    }
  }
  
  export default GetImportConfigs;
  