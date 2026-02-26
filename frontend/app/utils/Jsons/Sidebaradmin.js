import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DescriptionIcon from "@mui/icons-material/Description";

export const sidebarMenu = [
  {
    label: "Dashboard",
    icon: DashboardIcon,
    path: "/admin/dashboard",
  },
  {
    label: "Staff Management",
    icon: GroupIcon,
    path: "/admin/staff",
  },
  {
    label: "Student Management",
    icon: SchoolIcon,
    path: "/admin/students",
  },
  {
    label: "Subject Mapping",
    icon: MenuBookIcon,
    path: "/admin/subjects",
  },
  {
    label: "System Logs",
    icon: DescriptionIcon,
    path: "/admin/logs",
  },
];