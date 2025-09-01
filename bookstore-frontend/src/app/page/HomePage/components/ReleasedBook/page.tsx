"use client";

import React from "react";
import Link from "next/link";
import ItemBooks from "@/app/page/HomePage/components/ReleasedBook/item-book";
import { PropsItemBooks } from "@/app/interfaces/Props-ItemBooks.interface";



export function NewReleaseBooks({ books }: PropsItemBooks) {
    return (
        <div className="w-full bg-[#FFFFFF] mt-12 ">
           
            <div className="flex justify-between items-center mb-4 mx-4">
                <h2 className="text-3xl font-bold text-[#173F5F] flex">New Release Book</h2>
                <Link href="/books" className="text-[#ED553B] hover:underline text-xl   ">
                    View All Products
                </Link>
            </div>

           
            <ItemBooks books={books}/>
        </div>
    );
}
