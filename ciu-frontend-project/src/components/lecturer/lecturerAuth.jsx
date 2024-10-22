import { useState, useEffect } from 'react'

// Mock user data
const mockUser = {
    name: "Sarah",
    role: "lecturer",
    id: "25678"
}

export function lecturerAuth() {
    const [user, setUser] = useState(mockUser)

    return { user }
}