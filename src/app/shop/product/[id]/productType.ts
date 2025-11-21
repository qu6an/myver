export type Product = {
    id: string;
    title: string;
    description: string;
    price: number;
    originalPrice: number;
    category: string;
    rating: number;
    reviews: number;
    students: number;
    image: string;
    badge: string;
    instructor: {
        name: string;
        title: string;
        avatar: string;
        experience: string;
        courses: number;
        rating: number;
    };
    duration: string;
    lessons: number;
    language: string;
    level: string;
    certificate: boolean;
    features: string[];
    curriculum: {
        title: string;
        lessons: number;
        duration: string;
        topics: string[];
    }[];
};


