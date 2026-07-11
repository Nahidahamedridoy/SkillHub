export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  rating: number;
  reviewsCount: number;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  badge?: string;
  lessonsCount: number;
  duration: string;
}