interface Category {
    id: number;
    name: string;
    parentId?: number;
    parent?: [];
    subcategories?: Category[]
    imageUrl?: string // Optional, for hierarchical categories
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    products?: Product[]
}