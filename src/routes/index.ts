import { Router } from 'express';
import { productRoutes } from './product-routes';
import { TableRoutes } from './table-routes';

const routes = Router();

routes.use('/products', productRoutes);
routes.use('/tables', TableRoutes)

export { routes };