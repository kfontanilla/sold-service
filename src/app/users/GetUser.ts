class GetUser {
  usersRepository: any;
  constructor({ usersRepository }: { usersRepository: any }) {
    this.usersRepository = usersRepository;
  }

  async execute(req: any, res: any) {
    try {
      const {
        params: { id },
      } = req;
      const data = await this.usersRepository.getById(id);
      res.json(data);
    } catch (error) {
      console.log('GET_USER_BY_ID_ERROR', error);
    }
  }
}

export default GetUser;
