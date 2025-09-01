"use client"

import { User } from "lucide-react";
import Link from "next/link"
import { useState } from "react";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa"

export default function CartNavbar() {
    const [session, setSession] = useState(false); 
    return (
        <nav className="w-full bg-white shadow-md p-4 flex items-center justify-between">
            
            <Link
                href="/page/HomePage"
                className="flex items-center gap-2 text-black hover:text-blue-800"
            >
                <FaArrowLeft /> <span>Trang chính</span>
            </Link>

          
            <h1 className="text-2xl font-bold text-[#FB635D]">GIỎ HÀNG</h1>

    
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
                        href="/login"
                        className="text-black  font-medium"
                    >
                        Đăng nhập
                    </Link>
                    <Link
                        href="/register"
                        className="text-black  font-medium"
                    >
                        Đăng ký
                    </Link>
                </div>
            )}
        </nav>
    )
}
