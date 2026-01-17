// Simple in-memory shop reviews for demo purposes
// Later, these can be moved to a database table
const SAMPLE_REVIEWS = [
  {
    id: 1,
    author: 'Alex Nguyen',
    rating: 5,
    date: '2025-11-12',
    content:
      'Amazing service! Ordered a laptop and it arrived the next day. The packaging was secure and the team answered all my questions on chat. Highly recommended for both price and support.'
  },
  {
    id: 2,
    author: 'Minh Tran',
    rating: 4,
    date: '2025-08-03',
    content:
      'Good selection and fair prices. The checkout was easy even without an account, which I appreciate. Delivery took two days instead of one, but still a positive experience overall.'
  },
  {
    id: 3,
    author: 'Linh Pham',
    rating: 5,
    date: '2025-12-20',
    content:
      'Customer support was excellent. I had a technical question about RAM compatibility and they responded within minutes with a clear explanation and links. The laptop performs as expected and the return policy looks solid if anything goes wrong.'
  },
  {
    id: 4,
    author: 'David Chen',
    rating: 3,
    date: '2025-09-15',
    content:
      'Decent store. I think the product page could include more photos out of the box. The device is working fine though and the price matched other shops.'
  },
  {
    id: 5,
    author: 'Sarah Lee',
    rating: 5,
    date: '2026-01-05',
    content:
      'Fantastic experience from start to finish. The order confirmation, shipping updates, and final delivery were all smooth. The packaging included a small handwritten thank you which was a nice touch. I will purchase again and recommend friends.'
  }
]

export const getShopReviews = async (req, res) => {
  const page = parseInt(req.query.page || '1', 10)
  const limit = parseInt(req.query.limit || '5', 10)
  const start = (page - 1) * limit
  const end = start + limit

  const items = SAMPLE_REVIEWS.slice(start, end)
  const total = SAMPLE_REVIEWS.length

  res.json({
    reviews: items,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    },
    // quick aggregate
    rating: {
      average:
        SAMPLE_REVIEWS.reduce((acc, r) => acc + r.rating, 0) / SAMPLE_REVIEWS.length,
      count: SAMPLE_REVIEWS.length
    }
  })
}

export default { getShopReviews }
