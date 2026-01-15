import { query } from '../config/database.js'

// Get all products with filters
export const getAllProducts = async (req, res, next) => {
  try {
    const {
      categories,
      brands,
      maxPrice = 10000,
      search = '',
      sortBy = 'featured',
      page = 1,
      limit = 20
    } = req.query

    let queryText = 'SELECT * FROM products WHERE 1=1'
    const params = []
    let paramCount = 0

    if (categories) {
      paramCount++
      queryText += ` AND category = ANY($${paramCount})`
      params.push(categories.split(','))
    }

    if (brands) {
      paramCount++
      queryText += ` AND brand = ANY($${paramCount})`
      params.push(brands.split(','))
    }

    if (maxPrice) {
      paramCount++
      queryText += ` AND price <= $${paramCount}`
      params.push(maxPrice)
    }

    if (search) {
      paramCount++
      queryText += ` AND (name ILIKE $${paramCount} OR description ILIKE $${paramCount})`
      params.push(`%${search}%`)
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        queryText += ' ORDER BY price ASC'
        break
      case 'price-high':
        queryText += ' ORDER BY price DESC'
        break
      case 'name-asc':
        queryText += ' ORDER BY name ASC'
        break
      case 'name-desc':
        queryText += ' ORDER BY name DESC'
        break
      default:
        queryText += ' ORDER BY featured DESC, created_at DESC'
    }

    // Pagination
    const offset = (page - 1) * limit
    queryText += ` LIMIT ${limit} OFFSET ${offset}`

    const result = await query(queryText, params)

    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM products WHERE 1=1'
    if (categories) countQuery += ` AND category = ANY(ARRAY[${categories.split(',').map(c => `'${c}'`).join(',')}])`
    if (brands) countQuery += ` AND brand = ANY(ARRAY[${brands.split(',').map(b => `'${b}'`).join(',')}])`
    if (maxPrice) countQuery += ` AND price <= ${maxPrice}`
    if (search) countQuery += ` AND (name ILIKE '%${search}%' OR description ILIKE '%${search}%')`

    const countResult = await query(countQuery)
    const totalProducts = parseInt(countResult.rows[0].count)

    res.json({
      products: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalProducts,
        pages: Math.ceil(totalProducts / limit)
      }
    })
  } catch (error) {
    next(error)
  }
}

// Get single product
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await query('SELECT * FROM products WHERE id = $1', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    next(error)
  }
}

// Create product (Admin only)
export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      brand,
      category,
      processor,
      price,
      stock,
      image,
      images,
      specs,
      description,
      featured = false
    } = req.body

    // Handle both single image and multiple images
    let imageArray = []
    if (images && Array.isArray(images)) {
      imageArray = images
    } else if (image) {
      imageArray = [image]
    }

    const result = await query(
      `INSERT INTO products (name, brand, category, processor, price, stock, image_url, images, specs, description, featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [name, brand, category, processor, price, stock, imageArray[0] || '', JSON.stringify(imageArray), specs, description, featured]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    next(error)
  }
}

// Update product (Admin only)
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const {
      name,
      brand,
      category,
      processor,
      price,
      stock,
      image,
      images,
      specs,
      description,
      featured
    } = req.body

    // Handle both single image and multiple images
    let imageArray = []
    if (images && Array.isArray(images)) {
      imageArray = images
    } else if (image) {
      imageArray = [image]
    }

    const result = await query(
      `UPDATE products 
       SET name = $1, brand = $2, category = $3, processor = $4, price = $5, 
           stock = $6, image_url = $7, images = $8, specs = $9, description = $10, featured = $11,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $12
       RETURNING *`,
      [name, brand, category, processor, price, stock, imageArray[0] || '', JSON.stringify(imageArray), specs, description, featured, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    next(error)
  }
}

// Delete product (Admin only)
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await query('DELETE FROM products WHERE id = $1 RETURNING id', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    next(error)
  }
}

// Search products
export const searchProducts = async (req, res, next) => {
  try {
    const { q } = req.query

    if (!q) {
      return res.status(400).json({ message: 'Search query required' })
    }

    const result = await query(
      `SELECT * FROM products 
       WHERE name ILIKE $1 OR description ILIKE $1 OR specs ILIKE $1
       LIMIT 20`,
      [`%${q}%`]
    )

    res.json({ products: result.rows })
  } catch (error) {
    next(error)
  }
}
