import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from '../repositories/UsersRepositories';

import { compare } from 'bcryptjs'

import { sign } from 'jsonwebtoken'

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    if (!email) {
      throw new Error('Invalid email');
    }

    const usersRepository = getCustomRepository(UsersRepositories);
    const user = await usersRepository.findOne({ email });

    const passwordMatch = await compare(password, user.password);

    if (!user || !passwordMatch) {
      throw new Error('Invalid email or password');
    }

    const token = sign(
      { email: user.email },
      "89b823a188ac2ee48413b4930e272d5c",
      { subject: user.id, expiresIn: "1d" }
    )

    return token;
  }
}

export { AuthenticateUserService }
