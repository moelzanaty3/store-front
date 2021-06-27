import express from 'express';
import usersRoutes from './api/users';

const routes = express.Router();

routes.use('/users', usersRoutes);

export default routes;
