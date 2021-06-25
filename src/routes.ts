import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController'
import { CreateTagController } from './controllers/CreateTagController'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateComplimentController } from './controllers/CreateComplimentController';

//middleware
import { ensureAdmin } from './middlewares/ensureAdmin'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController
const authenticateUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()


router.post('/users', createUserController.handle)
router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle)
router.post('/login', authenticateUserController.handle)
router.post('/compliments', createComplimentController.handle)

export { router }