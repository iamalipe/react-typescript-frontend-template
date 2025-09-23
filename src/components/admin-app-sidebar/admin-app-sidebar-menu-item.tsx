import { Link, useLocation, type LinkProps } from "@tanstack/react-router";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

export type AdminAppSidebarMenuItemProps = {
  title: string;
  url: LinkProps["to"];
  icon: React.ReactNode;
};
const AdminAppSidebarMenuItem = (props: AdminAppSidebarMenuItemProps) => {
  const { title, url } = props;
  const location = useLocation();

  const pathname = location.pathname;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton variant="accent" isActive={pathname === url} asChild>
        <Link to={url}>
          {props.icon}
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default AdminAppSidebarMenuItem;
