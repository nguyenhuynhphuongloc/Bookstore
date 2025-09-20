export interface Book {
  id: string;
  title: string;
  authors: string;
  average_rating: number;
  published_year:number;
  description:string;
  thumbnail:string;
  num_pages:number;
  ratings_count: number;
  price: number;
  inventories: number;
  id_stripe:string;
}

export interface GetBookData {
  book: Book;
}

export interface BookPreview {
  id: string;
  title: string;
  thumbnail: string;
}

export interface GetTopRatedBooksData {
  getTopRatedBooks: Book[];
}

export interface BookCardProps {
    book: Book;
}