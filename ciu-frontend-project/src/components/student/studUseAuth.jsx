import { useState, useEffect } from 'react'

// Mock user data
const mockUser = {
    name: "Ssemakadde",
    role: "Student",
    id: "12345"
  }
  
  export function useAuth() {
    const [user, setUser] = useState(mockUser)
  
    return { user }
  }