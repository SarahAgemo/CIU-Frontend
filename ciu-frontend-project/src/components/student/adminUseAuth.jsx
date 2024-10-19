import { useState, useEffect } from 'react'

// Mock user data
const mockUser = {
    name: "Jackson",
    role: "Admin",
    id: "12345"
  }
  
  export function useAuth() {
    const [user, setUser] = useState(mockUser)
  
    return { user }
  }