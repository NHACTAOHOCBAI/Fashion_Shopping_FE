interface Product {
    id: number,
    name: string,
    description: string,
    categoryId: number,
    brandId: number,
    price: number,
    createdAt: Date,
    updatedAt: Date,
    images: { id: number, productId: number, imageUrl: string }[],
    category: Category,
    brand: Brand
}