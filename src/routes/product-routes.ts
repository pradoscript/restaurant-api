import { ProductController } from '@/controllers/product-controller';
import { Router } from 'express';

const productRoutes = Router();
const productController = new ProductController();

productRoutes.get('/', productController.index);
productRoutes.post('/', productController.create);
productRoutes.put('/:id', productController.update);
productRoutes.delete('/:id', productController.remove);


export { productRoutes };