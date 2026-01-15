import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Access token required' })
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' })
  }
}

export const isAdmin = async (req, res, next) => {
  try {
    const { query } = await import('../config/database.js')
    const result = await query('SELECT role FROM users WHERE id = $1', [req.user.userId])

    if (result.rows.length === 0 || result.rows[0].role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' })
    }

    next()
  } catch (error) {
    return res.status(500).json({ message: 'Error checking admin status' })
  }
}
