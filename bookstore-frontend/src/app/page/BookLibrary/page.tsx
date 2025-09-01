'use client'
import LibraryNavbar from "@/app/page/BookLibrary/components/LibraryNavbar/page";
import Footer from "@/Shared/Footer/page";
import Link from "next/link";
import { useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
const booksData = [
    { id: 1, title: "The Great Gatsby", image: "/books/gatsby.jpg" },
    { id: 2, title: "To Kill a Mockingbird", image: "/books/mockingbird.jpg" },
    { id: 3, title: "1984", image: "/books/1984.jpg" },
    { id: 4, title: "Pride and Prejudice", image: "/books/pride.jpg" },
    { id: 5, title: "Pride and Prejudice", image: "/books/pride.jpg" },
    { id: 6, title: "Pride and Prejudice", image: "/books/pride.jpg" },
    { id: 7, title: "Pride and Prejudice", image: "/books/pride.jpg" },
    { id: 8, title: "Pride and Prejudice", image: "/books/pride.jpg" },
    { id: 9, title: "Pride and Prejudice", image: "/books/pride.jpg" },
    { id: 10, title: "Pride and Prejudice", image: "/books/pride.jpg" },
];

export default function Library() {
    
    const [searchQuery, setSearchQuery] = useState("");
    const [attempts, setAttempts] = useState<Record<string, number>>({});
    const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
    const [listeningTests, setListeningTests] = useState<{ _id: string; title: string, isCompleted: boolean }[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true); 
    
    return (
        <div className="bg-white">
            <LibraryNavbar/>

            <div className="w-full max-w-6xl mx-auto p-6 flex">
               
                <div className="w-1/4 bg-white shadow-md rounded-lg p-5 h-1/3 border-2">
                    <h3 className="text-lg font-semibold text-customBlue mb-4 text-[#294563]">Thể loại sách</h3>
                    <ul className="space-y-2">
                        <li className="hover:bg-blue-100 p-2 rounded-lg cursor-pointer text-[#294563]">
                            <Link href="/dashboard" className="text-customergray hover:text-customBlue">
                                History
                            </Link>
                        </li>
                        <li className="hover:bg-blue-100 p-2 rounded-lg cursor-pointer text-[#294563]">
                            <Link href="/ielts-services" className="text-customergray hover:text-customBlue">
                                Fiction
                            </Link>
                        </li>
                        <li className="hover:bg-blue-100 p-2 rounded-lg cursor-pointer text-[#294563]">
                            <Link href="/live-lessons" className="text-customergray hover:text-customBlue">
                                Science
                            </Link>
                        </li>
                        <li className="hover:bg-blue-100 p-2 rounded-lg cursor-pointer text-[#294563]">
                            <Link href="/practice-tests" className="text-customergray hover:text-customBlue">
                                Juvenile Fiction
                            </Link>
                        </li>
                        <li className="hover:bg-blue-100 p-2 rounded-lg cursor-pointer text-[#294563]">
                            <Link href="/pages/wallet" className="text-customergray hover:text-customBlue">
                                Poetry
                            </Link>
                        </li>
                        <li className="hover:bg-blue-100 p-2 rounded-lg cursor-pointer text-[#294563]">
                            <Link href="/profile" className="text-customergray hover:text-customBlue">
                                Drama
                            </Link>
                        </li>
                    </ul>
                </div>

               
                <div className="w-3/4 bg-white shadow-md rounded-lg p-6 ml-6 border-2">
                    
                    <h2 className="text-xl font-bold mb-4 text-[#294563]">Kho sách </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {booksData.map((book) => (
                            <div key={book.id} className="bg-gray-50 p-3 rounded-lg shadow hover:shadow-lg transition">
                                <img src={book.image} alt={book.title} className="w-full h-40 object-cover rounded-md mb-2" />
                                <h3 className="text-sm font-medium text-center">{book.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination className="mt-6">
                    <PaginationContent className="gap-4">
                        <PaginationItem>
                            <PaginationPrevious
                                className="bg-white hover:bg-customBlue text-black border border-gray-300"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (page > 1) setPage((prev) => prev - 1);
                                }}
                            />
                        </PaginationItem>
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPage(i + 1);
                                    }}
                                    className={`border border-gray-300 ${page === i + 1
                                        ? "bg-customBlue text-white"
                                        : "bg-white text-black hover:bg-customBlue hover:text-white"
                                        }`}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                className="bg-white hover:bg-customBlue text-black border border-gray-300"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (page < totalPages) setPage((prev) => prev + 1);
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}

            
        </div>
    );
}
