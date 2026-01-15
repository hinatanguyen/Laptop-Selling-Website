import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import FilterSidebar from '../src/components/FilterSidebar'

describe('FilterSidebar Component', () => {
  const mockFilters = {
    categories: [],
    brands: [],
    maxPrice: 5000
  }

  const mockOnFilterChange = jest.fn()

  beforeEach(() => {
    mockOnFilterChange.mockClear()
  })

  it('renders all filter sections', () => {
    render(
      <BrowserRouter>
        <FilterSidebar filters={mockFilters} onFilterChange={mockOnFilterChange} />
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
        <FilterSidebar filters={mockFilters} onFilterChange={mockOnFilterChange} />
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
        <FilterSidebar filters={mockFilters} onFilterChange={mockOnFilterChange} />
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

    const priceSlider = screen.getByRole('slider')
    fireEvent.change(priceSlider, { target: { value: '2000' } })

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...mockFilters,
      maxPrice: 2000
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

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      categories: [],
      brands: [],
      maxPrice: 5000
    })
  })
})
