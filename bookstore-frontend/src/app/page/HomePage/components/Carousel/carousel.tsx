"use client"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"

export function CarouselDApiDemo() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) return
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <Carousel
            className="h-[540px] w-full bg-gradient-to-r from-[#FFE5E5] via-[#F5FFFE] to-[#FFFFFF]"
            opts={{ loop: true }}
        >
            <CarouselContent className="w-full h-[540px] ">

                <CarouselItem className="flex justify-center items-center h-full bg-gradient-to-r from-[#FFE5E5] via-[#F5FFFE] to-[#FFFFFF] ">
                    <div className="w-full h-full">
                        <Card
                            className="w-full h-full border-none rounded-none bg-cover bg-center bg-no-repeat relative"
                            style={{
                                backgroundImage: "url('/assets/bookstore/slider1-bg.jpg')",
                            }}
                        >
                            <CardContent className="absolute inset-0 flex flex-col items-start justify-center pl-12 space-y-6 mx-24 ">
                                <h2 className="text-[#173F5F] text-4xl font-bold">KHÁM PHÁ SÁCH MỚI</h2>
                                <h1 className="text-amber-300 text-6xl font-extrabold">
                                    FAVORITE BOOK
                                </h1>
                                <p className="text-[#000000] text-xl">
                                    Hơn <span className="font-bold">50.000+</span> đầu sách thuộc nhiều thể loại: tiểu thuyết, phi tiểu thuyết, phát triển bản thân, kinh doanh và sách thiếu nhi.
                                </p>
                                <div className="flex items-center space-x-3">
                                    <p className="text-[#173F5F]">
                                        Tham gia cùng <span className="font-bold">1.000.000+</span> độc giả đang tận hưởng sách cùng chúng tôi
                                    </p>
                                </div>
                                <button className="bg-[#FB635D] text-white font-bold py-2 px-6 rounded cursor-pointer">
                                    SHOP NOW
                                </button>
                            </CardContent>
                        </Card>
                    </div>
                </CarouselItem>


                <CarouselItem className="flex justify-center items-center h-full bg-gradient-to-r from-[#FFE5E5] via-[#F5FFFE] to-[#FFFFFF]">
                    <Card
                        className="w-full h-full border-none rounded-none bg-cover bg-center bg-no-repeat relative"
                        style={{
                            backgroundImage: "url('/assets/bookstore/slider2-bg.jpg')",
                        }}
                    >
                        <CardContent className="container mx-28 h-full flex flex-col md:flex-row items-center justify-between ">
                            <div className="flex flex-col space-y-4 max-w-lg mb-8 md:mb-0">


                                <h2 className="text-2xl md:text-3xl font-semibold text-[#173F5F]">
                                    ƯU ĐÃI LỚN NHẤT TRONG NĂM
                                </h2>
                                <h1 className="text-3xl md:text-3xl font-semibold text-[#173F5F]">
                                    GIẢM GIÁ LÊN ĐẾN 50%
                                </h1>
                                <p className="text-base md:text-lg font-semibold text-[#000000]">
                                    Giảm giá đặc biệt cho tất cả Sách Bán Chạy & Sách Mới. Đừng bỏ lỡ!
                                </p>

                                <button className="bg-[#FB635D] text-white font-bold py-2 px-6 rounded-md mt-4 w-fit cursor-pointer">
                                    MUA NGAY
                                </button>

                            </div>

                            <div className="mx-35">
                                <Image
                                    src="/assets/Image.png"
                                    alt="Featured Books"
                                    width={500}
                                    height={300}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </CarouselItem>
            </CarouselContent>


            <CarouselPrevious className="absolute left-[1rem] top-1/2 transform -translate-y-1/2 z-40 duration-1000 border border-[#ED553B] bg-white" />
            <CarouselNext className="absolute right-[1rem] top-1/2 transform -translate-y-1/2 z-40 duration-1000 border border-[#ED553B] bg-white" />
        </Carousel>
    )
}
