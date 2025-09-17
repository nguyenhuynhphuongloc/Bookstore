"use client";
import React from "react";
import Image from "next/image"

export default function GetFreeBooks() {
    return (
        <div className="w-full  bg-[#FFFFFF] mt-12 flex items-center gap-4  bg-gradient-to-r from-[#FFE5E5] via-[#F5FFFE] to-[#FFE5E5]">

            <Image
                src={"/assets/Books.png"}
                alt={"dsa"}
                width={300}
                height={300}
                className="rounded-md mb-4 object-cover ml-12"
            />

            <div className="flex flex-col ml-60">
                <div className="flex-1  rounded p-4 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-2 text-[#000000]">Nhận hơn 100 cuốn sách miễn phí</h2>
                    <p className="text-gray-700 mb-10">
                        Truy cập, đọc, thực hành & tương tác với nội dung kỹ thuật số sách điện tử
                    </p>

                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Nhập email của bạn"
                        className="flex-1 p-2 rounded border border-[#FB635D] text-black focus:outline-none focus:ring-2 focus:ring-[#FB635D]"
                    />
                    <button className="bg- text- px-4 py-2 text-white rounded bg-[#FB635D] curser-pointer">
                        Đăng ký
                    </button>
                </div>  

            </div>

           
            
        </div>
    );
}
