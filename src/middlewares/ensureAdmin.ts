import { Request, Response, NextFunction } from 'express'
import { ListUserService } from '../services/ListUserService'

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  /*
  const admin=true;
  if(admin){
    return next()
  }
  
  return response.status(400).json({error:'need admin'})
  */

  const { email } = request.body;

  const listUserService = new ListUserService();

  const admin = await listUserService.execute(email)

  if (admin) {
    return next()
  }
  return response.status(401).json({ message: "User is not admin" })
}