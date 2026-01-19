import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ProductCard from '../src/components/ProductCard'

const mockProduct = {
  id: 1,
  name: 'Test Laptop',
  brand: 'TestBrand',
  price: 999.99,
  stock: 10,
  image_url: 'test.jpg',
  featured: true
}

describe('ProductCard Component', () => {
  it('renders product information', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    )

    expect(screen.getByText('Test Laptop')).toBeInTheDocument()
    expect(screen.getByText('TestBrand')).toBeInTheDocument()
    // Price should be displayed in VND format
    expect(screen.getByText(/₫/)).toBeInTheDocument()
  })

  it('shows featured badge when product is featured', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    )

    expect(screen.getByText('Featured')).toBeInTheDocument()
  })

  it('shows out of stock overlay when stock is 0', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 }
    
    render(
      <BrowserRouter>
        <ProductCard product={outOfStockProduct} />
      </BrowserRouter>
    )

    expect(screen.getByText('Out of Stock')).toBeInTheDocument()
  })

  it('shows low stock warning when stock is below 5', () => {
    const lowStockProduct = { ...mockProduct, stock: 3 }
    
    render(
      <BrowserRouter>
        <ProductCard product={lowStockProduct} />
      </BrowserRouter>
    )

    expect(screen.getByText(/Only 3 left/)).toBeInTheDocument()
  })

  it('handles add to cart click', async () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    )

    const addButton = screen.getByText('Add to Cart')
    fireEvent.click(addButton)

    // Toast notification should appear
    await waitFor(() => {
      expect(screen.getByText(/added to cart/i)).toBeInTheDocument()
    })
  })
})
