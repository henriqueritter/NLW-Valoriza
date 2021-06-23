import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from '../repositories/UsersRepositories';

class ListUserService {
  async execute(email: string) {
    if (!email) {
      throw new Error('Invalid email');
    }
    const usersRepository = getCustomRepository(UsersRepositories);
    const user = await usersRepository.findOne({ email });
    if (!user) {
      throw new Error('User doesnt exist');
    }

    return user.admin;
  }
}

export { ListUserService }