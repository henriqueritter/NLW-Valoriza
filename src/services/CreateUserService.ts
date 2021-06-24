import { UsersRepositories } from '../repositories/UsersRepositories'
import { getCustomRepository } from 'typeorm'

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

class CreateUserService {
  async execute({ name, email, password, admin }: IUserRequest) {
    if (!email) {

      throw new Error("Email incorrect")
    }
    const usersRepository = getCustomRepository(UsersRepositories);

    const userAlreadyExists = await usersRepository.findOne({
      email
    })

    if (userAlreadyExists) {
      throw new Error("User already exists")
    }

    //criacao de objeto no banco
    const user = usersRepository.create({
      name, email, password, admin
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService }