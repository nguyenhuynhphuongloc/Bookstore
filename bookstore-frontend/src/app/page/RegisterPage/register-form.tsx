"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RegisterSchema } from "@/lib/zod"
import axiosInstance from "@/app/utils/RefeshTokenHandler"
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation"
import { toast } from 'react-toastify';

export function RegisterForm() {

    const router = useRouter(); 

    type FormType = z.infer<typeof RegisterSchema>

    const form = useForm<FormType>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
        },
        mode: "onSubmit",
        disabled: false,
        reValidateMode: "onSubmit",
        delayError: 0,
    })


    async function onSubmit(values: z.infer<typeof RegisterSchema>) {
        try {
            const response = await axiosInstance.post('http://localhost:8080/auth/sign-up', values);

            if (response.status === 201 || response.status === 200) {
                toast.success("Đăng ký thành công! Bạn sẽ được chuyển hướng đến trang chính.");
                router.push(process.env.LoginPage_URL || '');

            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;

                
                if (errorMessage.includes("Email already exists")) {
                    
                    form.setError("email", {
                        type: "manual",
                        message: errorMessage,  
                    });
                }

                toast.error("Đăng ký thất bại! Vui lòng kiểm tra lại thông tin và thử lại.");
                console.error("Lỗi đăng ký:", errorMessage);
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-shrink-0 w-[600px] border border-gray-300 rounded-lg p-6 bg-white shadow-lg">
                <div className="flex justify-center">
                    <span className="text-[#294563] justify-center text-4xl font-sans">Tạo tài khoản</span>
                </div>

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold text-[#2c639e] p-2">Tên tài khoản</FormLabel>
                            <FormControl>
                                <Input className="text-black" placeholder="nhập tên tài khoản" autoComplete="off" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

               
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold text-[#2c639e] p-2">Mật khẩu</FormLabel>
                            <FormControl>
                                <Input className="text-black" placeholder="mật khẩu" type="password" autoComplete="off" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

              
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold text-[#2c639e] p-2">Xác nhận mật khẩu</FormLabel>
                            <FormControl>
                                <Input className="text-black" placeholder="Xác nhận" type="xác nhận" autoComplete="off" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

               
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold text-[#2c639e] p-2">Email</FormLabel>
                            <FormControl>
                                <Input
                                    className="text-black"
                                    placeholder="Nhập email"
                                    autoComplete="off"
                                    {...field}
                                />
                            </FormControl>
                           
                            {form.formState.errors.email && (
                                <FormMessage>
                                    {form.formState.errors.email.message}
                                </FormMessage>
                            )}
                        </FormItem>
                    )}
                />

              
                <Button
                    className="!mt-5 w-full bg-[#2F70AF] text-customMintBlue hover:bg-customBlue hover:text-customMintBlue hover:shadow-none hover:brightness-100 cursor-pointer"
                    type="submit"
                >
                    Đăng ký
                </Button>

                <div className="flex items-center">
                    <div className="flex-1 bg-customebrightBlue w-full h-[0.25px] rounded-sm"></div>
                    <span className="text-xl text-[#2F70AF] font-bold">Hoặc</span>
                    <div className="flex-1 bg-customebrightBlue w-full h-[0.25px] rounded-sm"></div>
                </div>

                <div className="flex items-center justify-center gap-8 ">
                    <Button onClick={() => {
                        window.location.href = 'http://localhost:8080/auth/google/login';
                    }}
                        className="bg-[#df4930] rounded-sm p-5 text-customelightWhite hover:bg-[#df4930] hover:shadow-none w-[450px] cursor-pointer">
                        Đăng nhập với Google
                    </Button>
                </div>
            </form>
        </Form>
    );
}
