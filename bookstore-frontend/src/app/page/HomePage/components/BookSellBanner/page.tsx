'use client'
import Image from "next/image"

export default function BookSellBanner() {


    return (
        <div className="bg-[#FCEBEA] flex items-center justify-between px-10 py-6">
          
            <div className="w-1/2 space-y-4">
                <h2 className="text-[#173F5F] text-4xl font-bold">
                    Tất cả sách đều giảm 50%. Đừng bỏ lỡ cơ hội tuyệt vời này!
                </h2>
                <p className="text-gray-600 text-lg">
                    Hơn <span className="font-bold">50.000+</span> đầu sách thuộc các thể loại: tiểu thuyết,
                    phi tiểu thuyết, phát triển bản thân, kinh doanh và sách thiếu nhi.
                </p>
            </div>

          
            <div className="w-1/2 flex justify-center">
                <Image
                    src="/assets/Unsplash.png" 
                    alt="Book Banner"
                    width={400}
                    height={300}
                    className=""
                />
            </div>
        </div>
    )
}
