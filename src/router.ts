import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { handleInputErrors } from './middleware'

const router = Router()

// Routing
router.get('/', getProducts)

router.get('/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  getProductById
)

router.post('/',
  // Validación
  body('name')
    .notEmpty().withMessage('El nombre del producto es obligatorio'),
  body('price')
    .isNumeric().withMessage('Valor no válido')
    .notEmpty().withMessage('El precio del producto es obligatorio')
    .custom(value => value > 0).withMessage('Precio no válido'),
  handleInputErrors,
  createProduct
)

router.put('/:id',
  param('id').isInt().withMessage('ID no válido'),
  body('name')
    .notEmpty().withMessage('El nombre del producto es obligatorio'),
  body('price')
    .isNumeric().withMessage('Valor no válido')
    .notEmpty().withMessage('El precio del producto es obligatorio')
    .custom(value => value > 0).withMessage('Precio no válido'),
  body('availability')
    .isBoolean().withMessage('Valor para disponibilidad no válido'),
  handleInputErrors,
  updateProduct
)

router.patch('/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  updateAvailability
)

router.delete('/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  deleteProduct
)

export default router
