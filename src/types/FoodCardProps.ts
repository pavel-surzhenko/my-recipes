export type FoodCardProps = {
    _id: string;
    images?: string[];
    name: string;
    category: foodCategory;
    instruction: string[];
    createdAt: Date;
    updatedAt: Date;
    _v: number;
};

export type foodCategory = 'soups' | 'main' | 'salads' | 'desserts';
