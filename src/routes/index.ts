import { Router } from 'express';
import { productRoutes } from './product-routes';
import { TableRoutes } from './table-routes';
import { TableSessionRoutes } from './table-session-routes';
const routes = Router();

routes.use('/products', productRoutes);
routes.use('/tables', TableRoutes)
routes.use('/tables-sessions', TableSessionRoutes)
export { routes };