'use client'
import BookSellBanner from "@/app/page/HomePage/components/BookSellBanner/page";
import { CarouselDApiDemo } from "@/app/page/HomePage/components/Carousel/carousel"
import { GetFreeBooks } from "@/app/page/HomePage/components/GetFreeBook/page";
import Navbar from "@/app/page/HomePage/components/NavBar/page"
import { NewReleaseBooks } from "@/app/page/HomePage/components/ReleasedBook/page";
import Footer from "@/Shared/Footer/page";



const booksData = [
    {
        id: 1,
        title: "The Great Gatsby",
        image: "/books/gatsby.jpg", 
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        image: "/books/mockingbird.jpg",
    },
    {
        id: 3,
        title: "1984",
        image: "/books/1984.jpg",
    },
    {
        id: 4,
        title: "Pride and Prejudice",
        image: "/books/pride.jpg",
    },

    {
        id: 5,
        title: "Pride and Prejudice",
        image: "/books/pride.jpg",
    },


    {
        id: 6,
        title: "Pride and Prejudice",
        image: "/books/pride.jpg",
    },

    {
        id: 7,
        title: "Pride and Prejudice",
        image: "/books/pride.jpg",
    },

    {
        id: 8,
        title: "Pride and Prejudice",
        image: "/books/pride.jpg",
    },

    {
        id: 9,
        title: "Pride and Prejudice",
        image: "/books/pride.jpg",
    },

    {
        id: 10,
        title: "Pride and Prejudice",
        image: "/books/pride.jpg",
    },
];
export default function Homepage() {


    return (
        <div className="bg-white">
            <Navbar />
            <CarouselDApiDemo/>
            <NewReleaseBooks books={booksData} />
            <GetFreeBooks />
            <BookSellBanner/>
            <Footer/>
        </div>
    )
}
