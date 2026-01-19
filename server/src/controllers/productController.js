import { query } from '../config/database.js'

// Get all products with filters
export const getAllProducts = async (req, res, next) => {
  try {
    const {
      categories,
      brands,
      search = '',
      sortBy = 'featured',
      page = 1,
      limit = 20
    } = req.query

    const maxPriceParam = req.query.maxPrice
    const minPriceParam = req.query.minPrice
    const priceRangesParam = req.query.priceRanges
    const maxPrice = maxPriceParam !== undefined && maxPriceParam !== null
      ? parseFloat(maxPriceParam)
      : null
    const minPrice = minPriceParam !== undefined && minPriceParam !== null
      ? parseFloat(minPriceParam)
      : null
    const priceRangeIds = (priceRangesParam || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)

    const rangeMap = {
      lt5: { min: 0, max: 5000000 },
      '5to10': { min: 5000000, max: 10000000 },
      '10to15': { min: 10000000, max: 15000000 },
      '15to20': { min: 15000000, max: 20000000 },
      '20to25': { min: 20000000, max: 25000000 },
      '25to30': { min: 25000000, max: 30000000 },
      '30to40': { min: 30000000, max: 40000000 },
      gt50: { min: 50000000, max: null }
    }

    let queryText = `SELECT id, name, brand, category, processor, price, stock, image_url, images, description, featured, created_at FROM products WHERE 1=1`
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

    if (Number.isFinite(maxPrice)) {
      paramCount++
      queryText += ` AND price <= $${paramCount}`
      params.push(maxPrice)
    }
    if (Number.isFinite(minPrice)) {
      paramCount++
      queryText += ` AND price >= $${paramCount}`
      params.push(minPrice)
    }
    if (priceRangeIds.length > 0) {
      const orConds = []
      for (const id of priceRangeIds) {
        const range = rangeMap[id]
        if (!range) continue
        if (range.max == null) {
          // price >= min
          paramCount++
          orConds.push(`price >= $${paramCount}`)
          params.push(range.min)
        } else {
          // price BETWEEN min AND max
          paramCount++
          const minIndex = paramCount
          params.push(range.min)
          paramCount++
          const maxIndex = paramCount
          params.push(range.max)
          orConds.push(`(price >= $${minIndex} AND price <= $${maxIndex})`)
        }
      }
      if (orConds.length > 0) {
        queryText += ` AND ( ${orConds.join(' OR ')} )`
      }
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

    // Pagination (sanitize numeric inputs and parameterize)
    const limitNum = Math.min(Math.max(parseInt(limit) || 20, 1), 100)
    const pageNum = Math.max(parseInt(page) || 1, 1)
    const offsetNum = (pageNum - 1) * limitNum
    paramCount++
    const limitParamIndex = paramCount
    params.push(limitNum)
    paramCount++
    const offsetParamIndex = paramCount
    params.push(offsetNum)
    queryText += ` LIMIT $${limitParamIndex} OFFSET $${offsetParamIndex}`

    const result = await query(queryText, params)

    // Get total count - reuse the same parameters to prevent SQL injection
    let countQuery = 'SELECT COUNT(*) FROM products WHERE 1=1'
    const countParams = []
    let countParamCount = 0
    
    if (categories) {
      countParamCount++
      countQuery += ` AND category = ANY($${countParamCount})`
      countParams.push(categories.split(','))
    }

    if (brands) {
      countParamCount++
      countQuery += ` AND brand = ANY($${countParamCount})`
      countParams.push(brands.split(','))
    }

    if (Number.isFinite(maxPrice)) {
      countParamCount++
      countQuery += ` AND price <= $${countParamCount}`
      countParams.push(maxPrice)
    }
    if (Number.isFinite(minPrice)) {
      countParamCount++
      countQuery += ` AND price >= $${countParamCount}`
      countParams.push(minPrice)
    }
    if (priceRangeIds.length > 0) {
      const orConds = []
      for (const id of priceRangeIds) {
        const range = rangeMap[id]
        if (!range) continue
        if (range.max == null) {
          countParamCount++
          orConds.push(`price >= $${countParamCount}`)
          countParams.push(range.min)
        } else {
          countParamCount++
          const minIndex = countParamCount
          countParams.push(range.min)
          countParamCount++
          const maxIndex = countParamCount
          countParams.push(range.max)
          orConds.push(`(price >= $${minIndex} AND price <= $${maxIndex})`)
        }
      }
      if (orConds.length > 0) {
        countQuery += ` AND ( ${orConds.join(' OR ')} )`
      }
    }

    if (search) {
      countParamCount++
      countQuery += ` AND (name ILIKE $${countParamCount} OR description ILIKE $${countParamCount})`
      countParams.push(`%${search}%`)
    }

    const countResult = await query(countQuery, countParams)
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

// Get single product by slug or name
export const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params
    if (!slug) return res.status(400).json({ message: 'Slug required' })

    const slugLower = slug.toLowerCase()
    const nameCandidate = slugLower.replace(/-/g, ' ')

    // Canonicalize product name to match client slugify:
    // slugify: toLower -> remove [^a-z0-9\s-] -> whitespace to '-' -> collapse '-+'
    const result = await query(
      `SELECT * FROM products
       WHERE regexp_replace(
               regexp_replace(
                 regexp_replace(lower(btrim(name)), '[^a-z0-9\\s-]', '', 'g'),
                 '\\s+', '-', 'g'
               ),
               '-+', '-', 'g'
             ) = $1
          OR lower(name) = $2
       LIMIT 1`,
      [slugLower, nameCandidate]
    )

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
       VALUES ($1, $2, $3, $4, $5, GREATEST($6, 0), $7, $8, $9, $10, $11)
       RETURNING *`,
      [name, brand, category, processor, price, stock, imageArray[0] || null, JSON.stringify(imageArray), JSON.stringify(specs), description, featured]
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
           stock = GREATEST($6, 0), image_url = $7, images = $8, specs = $9, description = $10, featured = $11,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $12
       RETURNING *`,
      [name, brand, category, processor, price, stock, imageArray[0] || null, JSON.stringify(imageArray), JSON.stringify(specs), description, featured, id]
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
      `SELECT id, name, brand, category, price, stock, image_url, featured, created_at
       FROM products 
       WHERE name ILIKE $1 OR description ILIKE $1 OR brand ILIKE $1
       ORDER BY featured DESC, created_at DESC
       LIMIT 20`,
      [`%${q}%`]
    )

    res.json({ products: result.rows })
  } catch (error) {
    next(error)
  }
}
