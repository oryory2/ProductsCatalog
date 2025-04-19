

export type Review = {
    _id: string;
    username: string;
    rating: number;
    description: string;
    createdAt: Date;
}

export type Product = {
    _id: string;
    price: number;
    description: string;
    image: string;
    rating: number;
    reviews: Review[];
    productName: string;
}

