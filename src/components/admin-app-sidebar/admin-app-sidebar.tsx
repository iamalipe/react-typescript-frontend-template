import AdminAppSidebarMenuItem, {
  AdminAppSidebarMenuItemProps,
} from "@/components/admin-app-sidebar/admin-app-sidebar-menu-item";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Home, Package, SquareKanban } from "lucide-react";

const pageMenus: AdminAppSidebarMenuItemProps[] = [
  {
    title: "Home",
    url: "/",
    icon: <Home />,
  },
  {
    title: "Product",
    url: "/admin/product",
    icon: <Package />,
  },
  {
    title: "Kanban",
    url: "/admin/kanban",
    icon: <SquareKanban />,
  },
];

export function AdminAppSidebar() {
  const items = [...pageMenus];

  return (
    <Sidebar className="mt-16 mb-12 h-[calc(100svh-7rem)]" variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Pages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <AdminAppSidebarMenuItem key={item.url} {...item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
