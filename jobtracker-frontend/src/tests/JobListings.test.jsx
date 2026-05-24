import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import JobListings from '../pages/JobListings'

vi.mock('../api/axios', () => ({
  default: { get: vi.fn() }
}))

vi.mock('../components/Navbar', () => ({
  default: () => <div>Navbar</div>
}))

import api from '../api/axios'

const mockJobs = [
  { id: 1, title: 'Frontend Developer', location: 'Gaza', description: 'React dev', salary: 1500, employment_type: 'Full-time', company: { name: 'TechCo' } },
  { id: 2, title: 'Backend Developer', location: 'Ramallah', description: 'Node dev', salary: 2000, employment_type: 'Part-time', company: { name: 'DevCo' } }
]

beforeEach(() => {
  vi.clearAllMocks()
  api.get.mockImplementation((url) => {
    if (url === '/jobs/listings') return Promise.resolve({ data: mockJobs })
    if (url === '/applications') return Promise.resolve({ data: [] })
    return Promise.resolve({ data: [] })
  })
})

describe('JobListings', () => {
  it('displays jobs after loading', async () => {
    render(<MemoryRouter><JobListings /></MemoryRouter>)
    await waitFor(() => {
      expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
      expect(screen.getByText('Backend Developer')).toBeInTheDocument()
    })
  })

  it('displays loading spinner initially', () => {
    api.get.mockImplementation(() => new Promise(() => {}))
    render(<MemoryRouter><JobListings /></MemoryRouter>)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('displays message when no jobs found', async () => {
    api.get.mockImplementation((url) => {
      if (url === '/jobs/listings') return Promise.resolve({ data: [] })
      return Promise.resolve({ data: [] })
    })
    render(<MemoryRouter><JobListings /></MemoryRouter>)
    await waitFor(() => {
      expect(screen.getByText('No jobs found.')).toBeInTheDocument()
    })
  })

  it('displays Already Applied for applied jobs', async () => {
    api.get.mockImplementation((url) => {
      if (url === '/jobs/listings') return Promise.resolve({ data: mockJobs })
      if (url === '/applications') return Promise.resolve({ data: [{ job_id: 1 }] })
      return Promise.resolve({ data: [] })
    })
    render(<MemoryRouter><JobListings /></MemoryRouter>)
    await waitFor(() => {
      expect(screen.getByText('Already Applied')).toBeInTheDocument()
    })
  })
})