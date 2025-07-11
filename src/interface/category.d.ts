interface Category {
    id: string;
    name: string;
    description?: string;
    image?: string
    parentId?: string; // Optional, for hierarchical categories
    createdAt: Date;
    updatedAt: Date;
}