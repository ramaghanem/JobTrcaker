import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ApplyJob from '../pages/ApplyJob'

vi.mock('../api/axios', () => ({
  default: { get: vi.fn(), post: vi.fn() }
}))

vi.mock('../components/Navbar', () => ({
  default: () => <div>Navbar</div>
}))

import api from '../api/axios'

const mockJob = {
  id: 1, title: 'Frontend Developer', location: 'Gaza',
  description: 'React developer needed', salary: 1500,
  employment_type: 'Full-time', company: { name: 'TechCo' }
}

beforeEach(() => {
  vi.clearAllMocks()
  api.get.mockResolvedValue({ data: mockJob })
})

const renderApplyJob = () => render(
  <MemoryRouter initialEntries={['/jobs/1/apply']}>
    <Routes>
      <Route path="/jobs/:id/apply" element={<ApplyJob />} />
    </Routes>
  </MemoryRouter>
)

describe('ApplyJob', () => {
  it('displays loading initially', () => {
    api.get.mockImplementation(() => new Promise(() => {}))
    renderApplyJob()
    expect(screen.getByText('Loading position details')).toBeInTheDocument()
  })

  it('displays job details', async () => {
    renderApplyJob()
    await waitFor(() => {
      expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
      expect(screen.getByText(/TechCo/)).toBeInTheDocument()
    })
  })

  it('displays success message after applying', async () => {
    api.post.mockResolvedValue({ data: {} })
    renderApplyJob()
    await waitFor(() => screen.getByText('Frontend Developer'))

    fireEvent.change(screen.getByPlaceholderText('e.g. Gaza, Palestine'), {
      target: { value: 'Gaza' }
    })

    const file = new File(['cv content'], 'cv.pdf', { type: 'application/pdf' })
    const fileInput = document.querySelector('input[type="file"]')
    Object.defineProperty(fileInput, 'files', { value: [file] })
    fireEvent.change(fileInput)

    fireEvent.submit(document.querySelector('form'))

    await waitFor(() => {
      expect(screen.getByText('Applied successfully! Redirecting...')).toBeInTheDocument()
    })
  })

  it('displays error message if application fails', async () => {
    api.post.mockRejectedValue({ response: { data: { message: 'Failed to apply' } } })
    renderApplyJob()
    await waitFor(() => screen.getByText('Frontend Developer'))

    fireEvent.change(screen.getByPlaceholderText('e.g. Gaza, Palestine'), {
      target: { value: 'Gaza' }
    })

    const file = new File(['cv content'], 'cv.pdf', { type: 'application/pdf' })
    const fileInput = document.querySelector('input[type="file"]')
    Object.defineProperty(fileInput, 'files', { value: [file] })
    fireEvent.change(fileInput)

    fireEvent.submit(document.querySelector('form'))

    await waitFor(() => {
      expect(screen.getByText('Failed to apply')).toBeInTheDocument()
    })
  })
})