import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction) {
  //receber token
  const authToken = request.headers.authorization;
  //validar se token está preenchido
  if (!authToken) {
    return response.status(401).end();
  }

  // Trata/pega somente a segunda posicao do array gerado pelo split (remove o Bearer)
  const [, token] = authToken.split(" ")

  //valida se token é valido
  try {
    const { sub } = verify(token, '89b823a188ac2ee48413b4930e272d5c') as IPayload;
    //se validou token entao passe para prox rota

    //passa o id do usuario que esta no sub do token para as prox rotas
    request.user_id = sub;

    return next();

  } catch (err) {
    return response.status(401).end();
  }
}
