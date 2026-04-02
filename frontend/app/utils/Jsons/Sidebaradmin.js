import DashboardIcon from "@mui/icons-material/Dashboard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
export const sidebarMenu = [
  {
    label: "Dashboard",
    icon: DashboardIcon,
    path: "/admin",
    role:"admin"
  },
  {
  label: "Schedule Exam",
  icon: QueryStatsIcon,
  path: "/admin/schedule",
  role: "admin",
},
    {
    label: "Overview",
    icon: DashboardIcon,
    path: "/staff",
    role:"staff"
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
},
{
  label: "Predictition",
  icon: TrendingUpIcon,
  path: "/staff/predict",
  role: "staff",
},
     {
  label: "Students",
  icon: SchoolIcon,
  path: "/staff/studententry",
  role: "staff",
},
{
  label: "Performance",
  icon: TrendingUpIcon,
  path: "/student",
  role: "student",
},

{
  label: "Subject Insights",
  icon: QueryStatsIcon,
  path: "/student/tracking",
  role: "student",
},
{
  label: "Student Plan",
  icon: AssignmentTurnedInIcon,
  path: "/student/plan",
  role: "student",
},
];