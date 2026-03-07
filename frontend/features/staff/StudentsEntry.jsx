"use client";
import React, { useState } from "react";
import UploadCard from "../../components/UploadFile";
import DynamicFormCard from "../../components/DynamicFormCard";
import InputField from "../../components/Inputfields";
import CommonTable from "../../components/Table";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


const StudentsEntry = () => {
  const [searchText, setSearchText] = useState("");

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
      name: "Bharath",
      email: "bharath@uni.edu",
      employeeId: "CS-2024-003",
      department: "Physics",
      role: "Lecturer",
      status: "Active",
    },
  ];

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
            <div className="text-xs text-gray-400">{row.email}</div>
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
        <div className="flex gap-1">
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

  const [formData, setFormData] = useState({
    staffName: "",
    registerNumber: "",
    department: "",
    role: "Staff",
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
      name: "password",
      label: "Password",
      placeholder: "Enter password",
      mandatory: true,
    },
  ];

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <div className="p-4 md:p-8 bg-[#0b1220] min-h-screen text-white overflow-x-hidden">

      <div className="flex flex-col gap-6">

        {/* Upload + Manual Entry */}
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

        {/* Header + Search */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

          <h2 className="text-lg md:text-xl font-semibold">
            Existing Staff Directory
          </h2>

          <div className="w-full sm:w-[320px]">
            <InputField
              placeholder="Search by name, ID or department.."
              startIcon={<SearchIcon sx={{ color: "#9ca3af" }} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full rounded-lg"
            />
          </div>

        </div>

        {/* Table */}
        <div className="w-full">
          <CommonTable
            columns={columns}
            rows={rows}
            limit={2}
            searchText={searchText}
          />
        </div>

      </div>
    </div>
  );
};

export default StudentsEntry;