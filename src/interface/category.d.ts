interface Category {
    id: number;
    name: string;
    parentId?: number;
    parent?: Category;
    subCategories?: Category[]
    imageUrl?: string // Optional, for hierarchical categories
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    products?: Product[]
    type: "CHILD" | "PARENT"
}