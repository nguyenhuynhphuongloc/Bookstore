import { Home, Package, Users } from "lucide-react"
import Image from "next/image";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
    {
        title: "Dashboard",
        url: "localhost:3000/admin/products",
        icon: Home,
    },
    {
        title: "Products",
        url: "localhost:3000/admin/products",
        icon: Package,
    },
    {
        title: "Customers",
        url: "localhost:3000/admin/customer",
        icon: Users,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-3xl">
                        <Image
                            src={"/default.jpg"}
                            alt={"icon"}
                            width={50}
                            height={50}
                            className="rounded-md object-cover"
                        />
                    </SidebarGroupLabel>
                    <SidebarGroupContent className="mt-13">
                        <SidebarMenu className="gap-6">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url} className="flex items-center gap-2">
                                            <item.icon className="w-5 h-5" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
