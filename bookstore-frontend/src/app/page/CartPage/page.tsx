'use client'

import CartNavbar from "@/app/page/CartPage/navbar-cartpage"
import { useState } from "react"
import { FaTrash } from "react-icons/fa"

interface Book {
    id: number
    title: string
    price: number
}

export default function CartPage() {
    const [cart, setCart] = useState<{ book: Book; quantity: number }[]>([
        { book: { id: 1, title: "Clean Code", price: 120000 }, quantity: 1 },
        { book: { id: 2, title: "Pragmatic Programmer", price: 150000 }, quantity: 2 },
    ])

    const updateCart = (id: number, quantity: number) => {
        if (quantity <= 0) {
            setCart((prev) => prev.filter((item) => item.book.id !== id))
        } else {
            setCart((prev) =>
                prev.map((item) =>
                    item.book.id === id ? { ...item, quantity } : item
                )
            )
        }
    }

    const clearCart = () => {
        setCart([])
    }

    const checkout = () => {
        if (cart.length === 0) {
            alert("Giỏ hàng trống, không thể thanh toán!")
            return
        }
        alert("Thanh toán thành công! 🎉")
        setCart([])
    }

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.book.price * item.quantity,
        0
    )

    return (
        <div className="bg-white min-h-screen">

            <CartNavbar />
            
            <div className="max-w-5xl mx-auto p-6 flex gap-6">
              
                <div className="flex-1">
                    {cart.length === 0 ? (
                        <p className="text-gray-600">Giỏ hàng trống</p>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={item.book.id}
                                    className="flex justify-between items-center border p-3 rounded-lg bg-gray-50"
                                >
                                    <div>
                                        <h3 className="font-medium">{item.book.title}</h3>
                                        <p className="text-black">
                                            {item.book.price.toLocaleString()} đ
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() =>
                                                updateCart(item.book.id, item.quantity - 1)
                                            }
                                            className="px-2 border text-black"
                                        >
                                            -
                                        </button>
                                        <span className="text-black">{item.quantity}</span>
                                        <button
                                            onClick={() =>
                                                updateCart(item.book.id, item.quantity + 1)
                                            }
                                            className="px-2 border text-black "
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={() => updateCart(item.book.id, 0)}
                                            className="ml-3 text-red-500 hover:text-red-700"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="text-right font-bold text-lg text-black">
                                Tổng cộng: {totalPrice.toLocaleString()} đ
                            </div>

                        
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={clearCart}
                                        className="px-4 py-2 bg-[#FB635D] text-white rounded-lg cursor-pointer"
                                >
                                    Xóa giỏ hàng
                                </button>
                                <button
                                    onClick={checkout}
                                    className="px-4 py-2 bg-black text-white rounded-lg cursor-pointer"
                                >
                                    Thanh toán
                                </button>
                            </div>
                        </div>
                    )}
                </div>

              
            </div>
        </div>
    )
}
