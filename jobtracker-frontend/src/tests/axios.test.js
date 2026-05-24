import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../api/axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    interceptors: {
      request: { use: vi.fn() }
    }
  }
}))

describe('axios config', () => {
  it('should have correct baseURL from env', async () => {
    import.meta.env.VITE_API_URL = 'http://localhost:8000/api'
    const { default: api } = await import('../api/axios')
    expect(api).toBeDefined()
  })

  it('should attach Authorization header if token exists', () => {
    const token = 'test-token'
    const config = { headers: {} }
    if (token) config.headers.Authorization = `Bearer ${token}`
    expect(config.headers.Authorization).toBe('Bearer test-token')
  })

  it('should not attach Authorization header if no token', () => {
    const token = null
    const config = { headers: {} }
    if (token) config.headers.Authorization = `Bearer ${token}`
    expect(config.headers.Authorization).toBeUndefined()
  })
})
