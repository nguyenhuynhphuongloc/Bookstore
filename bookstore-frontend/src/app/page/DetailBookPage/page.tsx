"use client"
import LibraryNavbar from "@/app/page/BookLibrary/components/LibraryNavbar/page";
import Footer from "@/Shared/Footer/page";
import { useParams } from "next/navigation";
import Image from "next/image"

export default function BookDetailPage() {
    const { id } = useParams();
   
    const book = {
        id: id,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        image: "/books/gatsby.jpg",
        description:
            "The Great Gatsby là một trong những tác phẩm văn học kinh điển, khám phá chủ đề về giấc mơ Mỹ, sự giàu có, tình yêu và sự mất mát.",
        published: "1925",
        pages: 218,
    };

    return (
        <div className=" bg-white">

            <LibraryNavbar/>
           
            <div className=" rounded-lg p-6 flex flex-col md:flex-row gap-6 mt-15 h-[400px] mx-20 border border-gray-200 mb-10">

             
                <div className="w-full md:w-2/3 flex justify-center">
                    <img
                        src={"http://books.google.com/books/content?id=rbvUPps9vKsC&printsec=frontcover&img=1&zoom=1&source=gbs_api"}
                        alt={"book.title"}
                        className="rounded-lg w-72"
                    />
                </div>

                
                <div className="w-full md:w-2/3 flex flex-col mb-4">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{book.title}</h1>
                    <p className="text-gray-600 mb-1">
                        <span className="font-semibold">Tác giả:</span> {book.author}
                    </p>
                    <p className="text-gray-600 mb-1">
                        <span className="font-semibold">Năm xuất bản:</span> {book.published}
                    </p>
                    <p className="text-gray-600 mb-4">
                        <span className="font-semibold">Số trang:</span> {book.pages}
                    </p>

                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Mô tả</h2>
                    <p className="text-gray-700 leading-relaxed">{book.description}</p>

                    
                    <div className="mt-6 flex gap-4">
                        <button className="bg-[#FB635D] text-white px-4 py-2 rounded-lg cursor-pointer">
                            Mua ngay
                        </button>
                        <button className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer">
                            Thêm vào giỏ
                        </button>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
}
