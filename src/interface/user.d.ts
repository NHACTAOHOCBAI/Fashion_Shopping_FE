interface User {
    id: number
    avatarUrl: string
    name: number
    password: string
    email: string
    phone: string
    address: string
    createdAt: Date
    updatedAt: Date
    isActive: boolean
    role: "USER" | "ADMIN" | "STAFF"
}