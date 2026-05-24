import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import JobseekerDashboard from '../pages/JobseekerDashboard'

vi.mock('../api/axios', () => ({
  default: { get: vi.fn() }
}))

vi.mock('../components/Navbar', () => ({
  default: () => <div>Navbar</div>
}))

import api from '../api/axios'

const mockApplications = [
  { id: 1, status: 'pending', job: { title: 'Frontend Developer', company: { name: 'TechCo' } } },
  { id: 2, status: 'accepted', job: { title: 'Backend Developer', company: { name: 'DevCo' } } },
  { id: 3, status: 'rejected', job: { title: 'UI Designer', company: { name: 'DesignCo' } } }
]

beforeEach(() => {
  vi.clearAllMocks()
  api.get.mockResolvedValue({ data: mockApplications })
})

describe('JobseekerDashboard', () => {
  it('displays loading initially', () => {
    api.get.mockImplementation(() => new Promise(() => {}))
    render(<MemoryRouter><JobseekerDashboard /></MemoryRouter>)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('displays applications after loading', async () => {
    render(<MemoryRouter><JobseekerDashboard /></MemoryRouter>)
    await waitFor(() => {
      expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
      expect(screen.getByText('Backend Developer')).toBeInTheDocument()
    })
  })

  it('displays correct numbers in statistics', async () => {
    render(<MemoryRouter><JobseekerDashboard /></MemoryRouter>)
    await waitFor(() => {
      expect(screen.getByText('3')).toBeInTheDocument()
    })
  })

  it('displays message when no applications', async () => {
    api.get.mockResolvedValue({ data: [] })
    render(<MemoryRouter><JobseekerDashboard /></MemoryRouter>)
    await waitFor(() => {
      expect(screen.getByText('No applications yet.')).toBeInTheDocument()
    })
  })

  it('displays status of each application', async () => {
    render(<MemoryRouter><JobseekerDashboard /></MemoryRouter>)
    await waitFor(() => {
      expect(screen.getByText('pending')).toBeInTheDocument()
      expect(screen.getByText('accepted')).toBeInTheDocument()
      expect(screen.getByText('rejected')).toBeInTheDocument()
    })
  })
})