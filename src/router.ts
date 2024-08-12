import { Router } from 'express'
import { body } from 'express-validator'
import { createProduct, getProducts } from './handlers/product'
import { handleInputErrors } from './middleware'

const router = Router()

// Routing
router.get('/', getProducts)

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

router.put('/', (req, res) => {
  res.json('Desde PUT')
})

router.patch('/', (req, res) => {
  res.json('Desde PATCH')
})

router.delete('/', (req, res) => {
  res.json('Desde DELETE')
})

export default router
