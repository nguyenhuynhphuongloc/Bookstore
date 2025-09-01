'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@radix-ui/react-navigation-menu";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdHome } from "react-icons/md";
import { FaChevronDown, FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import Image from "next/image";
import { deleteSession, getSession, Session } from "@/lib/session";
import { FaBell } from "react-icons/fa";
import { FaRobot } from "react-icons/fa6";

export default function Navbar() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSession = async () => {
    const session = await getSession();
    setSession(session);
    setLoading(false);
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <nav className="bg-[#2F70AF] backdrop-blur-md text-white font-bold text-base relative z-50 p-4">
      <NavigationMenu>
        <div className="flex justify-between px-4 mx-auto whitespace-nowrap items-center">
         
          <div className="flex items-center space-x-5">
           
            <NavigationMenuList className="flex space-x-6 ">
              <NavigationMenuItem>
                <Link href="/page/BookLibrary" passHref>
                  <NavigationMenuTrigger className="flex items-center text-white hover:underline hover:text-white cursor-pointer">
                    Danh mục sách
                  </NavigationMenuTrigger>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </div>

         
          {session ? (
            <div className="flex items-center gap-6">
             
              <button
                className="hover:bg-black p-2 rounded-full relative"
                onClick={() => alert("Hiển thị thông báo")}
              >
                <FaBell size={22} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full px-1">
                  3
                </span>
              </button>

              
              <button
                className="hover:bg-black p-2 rounded-full"
                onClick={() => router.push("/pages/Chatbot")}
              >
                <FaRobot size={22} />
              </button>

             
              <button
                className="hover:bg-black p-2 rounded-full relative"
                onClick={() => router.push("/pages/CartPage")}
              >
                <FaShoppingCart size={22} />
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs rounded-full px-1">
                  3
                </span>
              </button>

              
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <Image
                        src="/assets/avatar/avatar.svg"
                        alt="Avatar"
                        width={40}
                        height={40}
                        className="rounded-full cursor-pointer"
                      />
                    </NavigationMenuTrigger>

                    <NavigationMenuContent className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-[#f7f7f7] text-black shadow-lg p-4 min-w-max">
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-[#f7f7f7]"></div>
                      <ul className="space-y-2">
                        <li>
                          <Link href="/pages/profile" passHref legacyBehavior>
                            <NavigationMenuLink className="block px-4 py-2 hover:bg-gray-100 rounded">
                              Hồ sơ cá nhân
                            </NavigationMenuLink>
                          </Link>
                        </li>
                        <li>
                          <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                            onClick={() => {
                              deleteSession();
                              router.push("/pages/LoginPage");
                            }}
                          >
                            Đăng xuất
                          </button>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          ) : (
              <div className="flex items-center gap-4">
                <Link href={process.env.LoginPage_URL || "/page/LoginPage"} className="text-white hover:underline">
                  Đăng nhập
                </Link>

                <Link href={process.env.RegisterPage_URL || "/page/RegisterPage"} className="text-white hover:underline">
                  Đăng ký
                </Link>
              </div>

          )}
        </div>
      </NavigationMenu>
    </nav>
  );
}
