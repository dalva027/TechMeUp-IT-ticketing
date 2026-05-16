import { Link, useLocation } from "react-router-dom";
import {
  Inbox,
  Ticket,
  User,
  Users as GroupsIcon,
  Monitor,
  Wifi,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  { label: "Inbox", path: "/inbox", icon: <Inbox size={20} /> },
  { label: "My Tickets", path: "/tickets", icon: <Ticket size={20} /> },
  { label: "Users", path: "/users", icon: <User size={20} /> },
  { label: "Groups", path: "/groups", icon: <GroupsIcon size={20} /> },
  { label: "Devices", path: "/devices", icon: <Monitor size={20} /> },
  { label: "Networks", path: "/networks", icon: <Wifi size={20} /> },
  { label: "Reports", path: "/reports", icon: <BarChart3 size={20} /> },
];

interface SidebarProps {
  collapsed: boolean;
  onCollapseChange: (collapsed: boolean) => void;
}

export default function Sidebar({ collapsed, onCollapseChange }: SidebarProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className={`sidebar ${collapsed ? "sidebar--collapsed" : "sidebar--expanded"}`}
      onMouseEnter={() => onCollapseChange(false)}
      onMouseLeave={() => onCollapseChange(true)}
    >
      <button
        className="sidebar__toggle"
        onClick={() => onCollapseChange(!collapsed)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight size={18} />
        ) : (
          <ChevronLeft size={18} />
        )}
      </button>

      <nav className="sidebar__nav">
        {sidebarItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar__item ${active ? "sidebar__item--active" : ""}`}
            >
              <span
                className="sidebar__icon"
                style={{
                  color: active ? "#a5b4fc" : "#a1a1aa",
                }}
              >
                {item.icon}
              </span>
              <span
                className="sidebar__label"
                style={{
                  color: active ? "#e4e4e7" : "#a1a1aa",
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
