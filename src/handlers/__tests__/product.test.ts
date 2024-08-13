import request from 'supertest'
import server from '../../server'

describe('POST /api/products', () => {
  it('should display validation errors', async () => {
    const response = await request(server).post('/api/products').send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(4)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(2)
  })

  it('should validate that the price is greater than 0', async () => {
    const response = await request(server).post('/api/products').send({
      name: "Monitor curvo",
      price: 0
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(2)
  })

  it('should validate that the price is a number and greater than 0', async () => {
    const response = await request(server).post('/api/products').send({
      name: "Monitor curvo",
      price: "Hola"
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(2)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(4)
  })

  it('Should create a new product', async () => {
    const response = await request(server).post('/api/products').send({
      name: "Mouse - testing",
      price: 50
    })
    expect(response.status).toEqual(201)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(200)
    expect(response.status).not.toBe(404)
    expect(response.body).not.toHaveProperty('errors')
  })
})

describe('GET /api/products', () => {
  it('Should check if api/products url exists', async () => {
    const response = await request(server).get('/api/products')
    expect(response.status).not.toBe(404)
  })

  it('GET a JSON response with products', async () => {
    const response = await request(server).get('/api/products')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveLength(1)

    expect(response.body).not.toHaveProperty('errors')
  })
})

describe('GET /api/products/:id', () => {
  it('Should return a 404 response for a non-existent product', async () => {
    const productId = 2000
    const response = await request(server).get(`/api/products/${productId}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Producto no encontrado')
  })

  it('Should check a valid ID in the URL', async () => {
    const response = await request(server).get('/api/products/not-valid-url')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('ID no válido')
  })

  it('Should get a JSON response for a single product', async () => {
    const response = await request(server).get('/api/products/1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
  })
})