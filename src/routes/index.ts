import { Router } from 'express';
import { productRoutes } from './product-routes';
import { TableRoutes } from './table-routes';
import { TableSessionRoutes } from './table-session-routes';
import { orderRoutes } from './order-routes';
const routes = Router();

routes.use('/products', productRoutes);
routes.use('/tables', TableRoutes);
routes.use('/tables-sessions', TableSessionRoutes);
routes.use('/orders', orderRoutes);

export { routes };