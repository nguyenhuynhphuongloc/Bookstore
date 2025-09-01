"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bell, MessageCircle, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";


export default function LibraryNavbar() {

    const router = useRouter();
    
    const [session, setSession] = useState(false); 

    return (
        <nav className="w-full bg-[#393280] shadow-md p-4 flex items-center justify-between">
            
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.push(process.env.HomePage_URL || "/page/HomePage")}
                    className="p-4"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-700 rounded-full bg-white cursor-pointer" />
                </button>
                <span className="text-lg font-semibold text-white">BookStore</span>
            </div>


            <div className="flex-1 mx-6 relative">
                <input
                    type="text"
                    placeholder="Tìm kiếm sách..."
                    className="w-full p-2 pr-10 rounded-lg bg-white outline-none border-none text-black"
                />
                <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-black" />
            </div>

            
            <div className="flex items-center gap-4">
                <button className="p-2 rounded-full bg-gray-100 cursor-pointer hover:bg-gray-300 ">
                    <Bell className="w-5 h-5 text-gray-700" />
                </button>
                <button className="p-2 rounded-full bg-gray-100 cursor-pointer hover:bg-gray-300" onClick={() => router.push(process.env.HomePage_URL || "/page/HomePage")}>
                    <MessageCircle className="w-5 h-5 text-gray-700" />
                </button>
                <button className="p-2 rounded-full bg-gray-100 cursor-pointer hover:bg-gray-300" onClick={() => router.push(process.env.HomePage_URL || "/page/CartPage")}>
                    <ShoppingCart className="w-5 h-5 text-gray-700" />
                </button>

                
                {session ? (
                    <Link
                        href="/profile"
                        className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-100"
                    >
                        <User className="w-5 h-5 text-gray-700" />
                        <span className="text-gray-700">Tài khoản</span>
                    </Link>
                ) : (
                    <div className="flex gap-3">
                        <Link
                            href="/page/LoginPage"
                            className="text-white hover font-medium"
                        >
                            Đăng nhập
                        </Link>
                        <Link
                                href="/page/RegisterPage"
                            className="text-white hover font-medium"
                        >
                            Đăng ký
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
