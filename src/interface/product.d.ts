interface Product {
    id: number,
    name: string,
    description: string,
    categoryId: number,
    brandId: number,
    price: number,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
    images: { id: number, productId: number, imageUrl: string }[],
    category: Category,
    brand: Brand,
    variants: Variant[]
}
interface Variant {
    id: number,
    productId: number,
    size: string,
    color: string,
    imageUrl: string,
    quantity: number,
    remaining: quantity,
    price: number,
    createdAt: Date,
    updatedAt: Date,
    isActive: boolean
}