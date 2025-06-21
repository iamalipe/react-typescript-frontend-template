import AvatarDropdown from "@/components/avatar-dropdown/avatar-dropdown";
import ThemeToggle from "@/components/theme-toggle/theme-toggle";

const Header = () => {
  return (
    <nav className="flex-none h-16 overflow-hidden border-b flex items-center justify-between px-4 sm:pr-12">
      <span className="text-xl font-bold">Simple Music Dashboard</span>
      <div className="flex items-center gap-2 sm:gap-4">
        <ThemeToggle />
        <AvatarDropdown />
      </div>
    </nav>
  );
};

export default Header;
