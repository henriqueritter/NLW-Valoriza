import { Request, Response, NextFunction } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from '../repositories/UsersRepositories';


export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {

  //recupera id do usuario passado pelo token no middleware anterior
  const { user_id } = request;


  //retorna o campo admin do usuario
  const usersRepository = getCustomRepository(UsersRepositories);
  const { admin } = await usersRepository.findOne(user_id);

  if (admin) {
    return next()
  }
  return response.status(401).json({ message: "User is not admin" })
}