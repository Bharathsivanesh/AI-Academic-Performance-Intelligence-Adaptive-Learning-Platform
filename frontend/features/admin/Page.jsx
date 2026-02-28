"use client";
import { Avatar, Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import StatCard from "./components/Overviewcards";

import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DynamicFormCard from "../../components/DynamicFormCard";
import UploadCard from "../../components/UploadFile";
import CommonTable from "../../components/Table";
import InputField from "../../components/Inputfields";
import { useState } from "react";
export default function AdminPage() {
  const rows = [
    {
      name: "Alan Turing",
      email: "aturing@uni.edu",
      employeeId: "CS-2024-001",
      department: "Computer Science",
      role: "Senior Professor",
      status: "Active",
    },
    {
      name: "Ada King",
      email: "ada.k@uni.edu",
      employeeId: "CS-2024-002",
      department: "Applied Mathematics",
      role: "Head of Department",
      status: "Active",
    },
    {
      name: "Alan Turing",
      email: "aturing@uni.edu",
      employeeId: "CS-2024-001",
      department: "Computer Science",
      role: "Senior Professor",
      status: "Active",
    },
    {
      name: "Bharath",
      email: "ada.k@uni.edu",
      employeeId: "CS-2024-002",
      department: "Applied Mathematics",
      role: "Head of Department",
      status: "Active",
    },
  ];

  // 🔵 Columns Config
  const columns = [
    {
      label: "NAME",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar
            sx={{
              width: 36,
              height: 36,
              backgroundColor: "#1e3a8a",
              fontSize: 14,
            }}
          >
            {row.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar>

          <div>
            <div className="font-medium text-white">{row.name}</div>
            <div className="text-sm text-gray-400">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      field: "employeeId",
      label: "EMPLOYEE ID",
    },
    {
      field: "department",
      label: "DEPARTMENT",
    },
    {
      field: "role",
      label: "ROLE",
    },
    {
      label: "STATUS",
      render: (row) => (
        <Chip
          label={row.status}
          size="small"
          sx={{
            backgroundColor: "#1d4ed8",
            color: "#fff",
            fontWeight: 500,
          }}
        />
      ),
    },
    {
      label: "ACTIONS",
      render: () => (
        <div className="flex gap-2">
          <IconButton size="small">
            <EditIcon sx={{ color: "#3b82f6" }} />
          </IconButton>
          <IconButton size="small">
            <DeleteIcon sx={{ color: "#ef4444" }} />
          </IconButton>
        </div>
      ),
    },
  ];

  const statsData = [
    {
      title: "Total Staff",
      value: "48",
      icon: GroupsIcon,
      growth: "+2%",
      growthText: "this month",
    },
    {
      title: "Total Students",
      value: "1,240",
      icon: PersonIcon,
      growth: "+5.4%",
      growthText: "this month",
    },
    {
      title: "Total Subjects",
      value: "32",
      icon: MenuBookIcon,
    },
  ];
    const [formData, setFormData] = useState({
    staffName: "",
    registerNumber: "",
    department: "",
    role: "Staff", // default value
  });
  
  
  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
const staffFields = [
  {
    name: "staffName",
    label: "Staff Name",
    placeholder: "Enter full name",
    mandatory: true,
  },
  {
    name: "registerNumber",
    label: "Register Number",
    placeholder: "Enter unique register number",
    mandatory: true,
  },
  {
    name: "department",
    label: "Department",
    placeholder: "Enter department name",
    mandatory: true,
  },
    {
    name: "Password",
    label: "Password",
    placeholder: "Enter password",
    mandatory: true,
  },

];
  const [searchText, setSearchText] = useState("");
    const handleSubmit = () => {
    console.log(formData);
  };
  return (
    <div className="p-8  bg-[#0b1220] min-h-screen text-white">
      {/* <h2 className="text-xl font-semibold mb-6">
        Existing Staff Directory
      </h2>

      <CommonTable
        columns={columns}
        rows={rows}
        limit={2}
      /> */}
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsData.map((card, index) => (
            <StatCard
              key={index}
              title={card.title}
              value={card.value}
              icon={card.icon}
              growth={card.growth}
              growthText={card.growthText}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <UploadCard
            title="Bulk Upload Staff"
            description="Drop your CSV file here"
            buttonText="Browse Files"
            onFileSelect={(file) => console.log(file)}
          />

          <div className="lg:col-span-2">
            <DynamicFormCard
              title="Manual Entry"
              fields={staffFields}
              buttonText="Add Staff"
                   onSubmit={handleSubmit}
      formData={formData}
      handleChange={handleChange}

            />
          </div>
        </div>
        <div className="flex justify-between items-center ">
          <h2 className="text-xl w-2/3 font-semibold">
            Existing Staff Directory
          </h2>

          <InputField
            placeholder="Search by name, ID or department.."
             startIcon={<SearchIcon sx={{ color: "#9ca3af" }} />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
             className="max-w-md rounded-lg"
          />
        </div>

        <CommonTable
          columns={columns}
          rows={rows}
          limit={2}
          searchText={searchText} // ✅ PASS HERE
        />
      </div>
    </div>
  );
}
