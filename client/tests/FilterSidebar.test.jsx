import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import FilterSidebar from '../src/components/FilterSidebar'

describe('FilterSidebar Component', () => {
  const mockFilters = {
    categories: [],
    brands: [],
    priceRange: null
  }

  const mockOnFilterChange = jest.fn()
  const mockOnClearFilters = jest.fn()

  beforeEach(() => {
    mockOnFilterChange.mockClear()
    mockOnClearFilters.mockClear()
  })

  it('renders all filter sections', () => {
    render(
      <BrowserRouter>
        <FilterSidebar filters={mockFilters} onFilterChange={mockOnFilterChange} onClearFilters={mockOnClearFilters} />
      </BrowserRouter>
    )

    expect(screen.getByText('Filters')).toBeInTheDocument()
    expect(screen.getByText('Category')).toBeInTheDocument()
    expect(screen.getByText('Brand')).toBeInTheDocument()
    expect(screen.getByText('Price Range')).toBeInTheDocument()
  })

  it('handles category selection', () => {
    render(
      <BrowserRouter>
        <FilterSidebar filters={mockFilters} onFilterChange={mockOnFilterChange} onClearFilters={mockOnClearFilters} />
      </BrowserRouter>
    )

    const laptopCheckbox = screen.getByLabelText('Laptops')
    fireEvent.click(laptopCheckbox)

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...mockFilters,
      categories: ['Laptop']
    })
  })

  it('handles brand selection', () => {
    render(
      <BrowserRouter>
        <FilterSidebar filters={mockFilters} onFilterChange={mockOnFilterChange} onClearFilters={mockOnClearFilters} />
      </BrowserRouter>
    )

    const dellCheckbox = screen.getByLabelText('Dell')
    fireEvent.click(dellCheckbox)

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...mockFilters,
      brands: ['Dell']
    })
  })

  it('handles price range change', () => {
    render(
      <BrowserRouter>
        <FilterSidebar filters={mockFilters} onFilterChange={mockOnFilterChange} />
      </BrowserRouter>
    )

    const option = screen.getByLabelText('5M - 10M VND')
    fireEvent.click(option)

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...mockFilters,
      priceRange: { min: 5000000, max: 10000000 }
    })
  })

  it('clears all filters when clear button is clicked', () => {
    const activeFilters = {
      categories: ['Laptop'],
      brands: ['Dell'],
      maxPrice: 2000
    }

    render(
      <BrowserRouter>
        <FilterSidebar filters={activeFilters} onFilterChange={mockOnFilterChange} />
      </BrowserRouter>
    )

    const clearButton = screen.getByText('Clear All')
    fireEvent.click(clearButton)

    expect(mockOnClearFilters).toHaveBeenCalled()
  })
})
