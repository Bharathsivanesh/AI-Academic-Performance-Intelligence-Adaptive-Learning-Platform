import DashboardIcon from "@mui/icons-material/Dashboard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SchoolIcon from "@mui/icons-material/School";
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
  icon: SchoolIcon,
  path: "/staff/studententry",
  role: "staff",
},
{
  label: "Analytics",
  icon: AnalyticsIcon,
  path: "/staff/analytics",
  role: "staff",
},
{
  label: "Performance",
  icon: TrendingUpIcon,
  path: "/staff/performance",
  role: "staff",
}
];