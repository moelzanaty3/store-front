import express from 'express';
import authenticationMiddleware from '../middleware/authentication.middleware';
import usersRoutes from './api/users';
import ordersRoutes from './api/orders';
import productsRoutes from './api/products';

const routes = express.Router();

routes.use('/users', usersRoutes);
routes.use('/orders', authenticationMiddleware, ordersRoutes);
routes.use('/product', authenticationMiddleware, productsRoutes);

export default routes;
