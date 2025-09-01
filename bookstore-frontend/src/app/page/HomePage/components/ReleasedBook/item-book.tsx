'use client'

import { PropsItemBooks } from "@/app/interfaces/Props-ItemBooks.interface"
import Image from "next/image"
import { useState } from "react"

export default function ItemBooks({ books }: PropsItemBooks) {
    const slidesPerView = 4
    const [currentSlide, setCurrentSlide] = useState(0)

    const totalSlides = Math.ceil(books.length / slidesPerView)

    const goToSlide = (index: number) => {
        setCurrentSlide(index)
    }

    return (
        <div className="w-full ">
       
            <div className="overflow-x-hidden relative">
                <div
                    className="flex transition-transform duration-500 gap-6"
                    style={{
                        transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)`,
                    }}
                >
                    {books.map((book) => (
                        <div
                            key={book.id}
                            className="flex-shrink-0 w-[calc(25%-1.5rem)] bg-white rounded-lg  border border-gray-200 shadow-lg flex flex-col items-center p-3 h-[350px] ml-1 "
                        >
                            <Image
                                src={"http://books.google.com/books/content?id=rbvUPps9vKsC&printsec=frontcover&img=1&zoom=1&source=gbs_api"}
                                alt={book.title}
                                width={170}
                                height={150}
                                className="rounded-md mb-4 object-cover"
                            />
                            <button className="bg-[#ED553B] text-white px-4 py-2 rounded hover:bg-[#173F5F] transition-colors duration-300">
                                Xem chi tiết
                            </button>
                        </div>
                    ))}
                </div>
            </div>

          
            <div className="flex justify-center mt-4 gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full ${currentSlide === index ? "bg-[#ED553B]" : "bg-gray-300"
                            }`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    )
}
