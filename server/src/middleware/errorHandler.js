export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err)

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      errors: err.errors
    })
  }

  if (err.code === '23505') { // PostgreSQL unique violation
    return res.status(409).json({
      message: 'Resource already exists'
    })
  }

  if (err.code === '23503') { // PostgreSQL foreign key violation
    return res.status(400).json({
      message: 'Invalid reference'
    })
  }

  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
}
