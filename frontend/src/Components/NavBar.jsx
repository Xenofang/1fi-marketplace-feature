import { Home, Store, Receipt, BarChart3, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function BottomNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      path: "/",
    },
    {
      id: "shop",
      label: "Shop",
      icon: Store,
      path: "/shop",
    },
    {
      id: "emi",
      label: "EMI Dues",
      icon: Receipt,
      path: "/emi",
    },
    {
      id: "limit",
      label: "Limit",
      icon: BarChart3,
      path: "/limit",
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      path: "/profile",
    },
  ];

  return (
    <nav
      className="
        fixed
        bottom-2
        left-1/2
        z-50
        grid
        min-h-[84px]
        w-[calc(100%-24px)]
        -translate-x-1/2
        grid-cols-5
        rounded-[45px]
        border
        border-[#444]
        bg-[#141414]
        px-1
        py-2
        shadow-2xl
        md:bottom-4
        md:min-h-[100px]
        md:w-[calc(100%-48px)]
        md:max-w-[900px]
        md:rounded-[55px]
        md:px-5
      "
    >
      {navItems.map(({ id, label, icon: Icon, path }) => {
        const active = location.pathname === path;

        return (
          <button
            key={id}
            type="button"
            onClick={() => navigate(path)}
            className={`group flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
              active
                ? "text-[#cf6eff]"
                : "text-[#999ca9] hover:-translate-y-1 hover:text-[#cf6eff]"
            }`}
          >
            <Icon
              size={25}
              className="md:h-[30px] md:w-[30px]"
            />

            <span className="text-[10px] md:text-[15px]">
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNavbar;