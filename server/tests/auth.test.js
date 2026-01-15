import request from 'supertest'
import app from '../src/server.js'

describe('Auth API', () => {
  const testUser = {
    email: 'test@example.com',
    password: 'test123456',
    full_name: 'Test User',
    phone: '1234567890'
  }

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(testUser)
        .expect(201)

      expect(response.body).toHaveProperty('user')
      expect(response.body).toHaveProperty('token')
      expect(response.body.user.email).toBe(testUser.email)
    })

    it('should not register duplicate email', async () => {
      await request(app)
        .post('/api/auth/register')
        .send(testUser)
        .expect(400)
    })

    it('should validate email format', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          ...testUser,
          email: 'invalid-email'
        })
        .expect(400)
    })

    it('should validate password length', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          ...testUser,
          password: '123'
        })
        .expect(400)
    })
  })

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        })
        .expect(200)

      expect(response.body).toHaveProperty('user')
      expect(response.body).toHaveProperty('token')
    })

    it('should reject invalid credentials', async () => {
      await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        })
        .expect(401)
    })

    it('should reject non-existent user', async () => {
      await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        })
        .expect(401)
    })
  })

  describe('GET /api/auth/profile', () => {
    let token

    beforeAll(async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        })
      token = response.body.token
    })

    it('should get user profile with valid token', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)

      expect(response.body).toHaveProperty('email')
      expect(response.body).toHaveProperty('full_name')
    })

    it('should reject request without token', async () => {
      await request(app)
        .get('/api/auth/profile')
        .expect(401)
    })

    it('should reject invalid token', async () => {
      await request(app)
        .get('/api/auth/profile')
        .set('Authorization', 'Bearer invalid-token')
        .expect(403)
    })
  })
})
