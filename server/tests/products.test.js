import request from 'supertest'
import app from '../src/server.js'

describe('Product API', () => {
  describe('GET /api/products', () => {
    it('should return all products', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect(200)

      expect(response.body).toHaveProperty('products')
      expect(Array.isArray(response.body.products)).toBe(true)
      expect(response.body).toHaveProperty('pagination')
    })

    it('should filter products by category', async () => {
      const response = await request(app)
        .get('/api/products?categories=Laptop')
        .expect(200)

      expect(response.body.products.every(p => p.category === 'Laptop')).toBe(true)
    })

    it('should filter products by price', async () => {
      const response = await request(app)
        .get('/api/products?maxPrice=1000')
        .expect(200)

      expect(response.body.products.every(p => p.price <= 1000)).toBe(true)
    })
  })

  describe('GET /api/products/:id', () => {
    it('should return a single product', async () => {
      const response = await request(app)
        .get('/api/products/1')
        .expect(200)

      expect(response.body).toHaveProperty('id')
      expect(response.body).toHaveProperty('name')
      expect(response.body).toHaveProperty('price')
    })

    it('should return 404 for non-existent product', async () => {
      await request(app)
        .get('/api/products/99999')
        .expect(404)
    })
  })

  describe('POST /api/products', () => {
    it('should require authentication', async () => {
      await request(app)
        .post('/api/products')
        .send({
          name: 'Test Product',
          brand: 'Test',
          category: 'Laptop',
          price: 999.99,
          stock: 10
        })
        .expect(401)
    })
  })

  describe('GET /api/products/search', () => {
    it('should search products', async () => {
      const response = await request(app)
        .get('/api/products/search?q=dell')
        .expect(200)

      expect(response.body).toHaveProperty('products')
      expect(Array.isArray(response.body.products)).toBe(true)
    })

    it('should return 400 without search query', async () => {
      await request(app)
        .get('/api/products/search')
        .expect(400)
    })
  })
})
