import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DescriptionIcon from "@mui/icons-material/Description";

export const sidebarMenu = [
  {
    label: "Dashboard",
    icon: DashboardIcon,
    path: "/admin",
    role:"admin"
  },
    {
    label: "Overview",
    icon: DashboardIcon,
    path: "/staff",
    role:"staff"
  },
     {
    label: "Students",
    icon: DashboardIcon,
    path: "/staff/studententry",
    role:"staff"
  },
       {
    label: "Analytics",
    icon: DashboardIcon,
    path: "/staff/analytics",
    role:"staff"
  },
         {
    label: "Performance",
    icon: DashboardIcon,
    path: "/staff/performance",
    role:"staff"
  }
];