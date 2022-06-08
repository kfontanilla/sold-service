class DeleteUser {
  usersRepository: any;
  constructor({ usersRepository }: { usersRepository: any }) {
    this.usersRepository = usersRepository;
  }

  async execute(req: any, res: any) {
    try {
      const {
        params: { id },
      } = req;
      const data = await this.usersRepository.deleteById(id);
      res.json(data);
    } catch (error) {
      console.log('DELETE_USER_ERROR', error);
    }
  }
}

export default DeleteUser;
