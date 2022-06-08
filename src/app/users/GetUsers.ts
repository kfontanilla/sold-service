class GetUsers {
  usersRepository: any;
  constructor({ usersRepository }: { usersRepository: any }) {
    this.usersRepository = usersRepository;
  }

  async execute(req: any, res: any) {
    try {
      const data = await this.usersRepository.getAll();
      res.json(data);
    } catch (error) {
      console.log('GET_USERS_ERROR', error);
    }
  }
}

export default GetUsers;
