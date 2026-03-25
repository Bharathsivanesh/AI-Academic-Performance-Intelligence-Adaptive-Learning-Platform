"use client";

import React, { useEffect, useState } from "react";
import UploadCard from "../../components/UploadFile";
import DynamicFormCard from "../../components/DynamicFormCard";
import InputField from "../../components/Inputfields";
import CommonTable from "../../components/Table";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiService } from "../../service/Apicall";

const StudentsEntry = () => {
  const [searchText, setSearchText] = useState("");
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    student_name: "",
    username: "",
    email: "",
    password: "",
    department: "",
    batch: "",
  });

  // ✅ GET API
  const fetchStudents = () => {
    apiService({
      endpoint: "/api/admin/students/",
      method: "GET",
      onSuccess: (res) => setStudents(res),
      onError: (err) => console.error(err),
    });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ POST API
  const handleSubmit = () => {
    const payload = {
    ...formData,
    department: Number(formData.department), // ✅ FIX
    batch: Number(formData.batch),           // ✅ FIX
  };
    apiService({
      endpoint: "/api/admin/student/create/",
      method: "POST",
      payload: payload,
      onSuccess: () => {
        fetchStudents(); // refresh
      },
      onError: (err) => console.error(err),
    });
  };

  // ✅ DELETE API
  const handleDelete = (id) => {
    apiService({
      endpoint: `/api/admin/students/${id}/delete/`,
      method: "DELETE",
      onSuccess: () => {
        fetchStudents(); // refresh
      },
      onError: (err) => console.error(err),
    });
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Table Data Mapping
  const rows = students.map((s) => ({
    id: s.id,
    name: s.student_name,
    email: s.email,
    employeeId: s.username, // student id
    department: `Dept ${s.department}`,
    batch: `Batch ${s.batch}`,
  }));

  const columns = [
    {
      label: "NAME",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar sx={{ width: 36, height: 36, backgroundColor: "#1e3a8a" }}>
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
      label: "STUDENT ID",
    },
    {
      field: "department",
      label: "DEPARTMENT",
    },
    {
      field: "batch",
      label: "BATCH",
    },
    {
      label: "ACTIONS",
      render: (row) => (
        <div className="flex gap-1">
          <IconButton size="small">
            <EditIcon sx={{ color: "#3b82f6" }} />
          </IconButton>
          <IconButton size="small" onClick={() => handleDelete(row.id)}>
            <DeleteIcon sx={{ color: "#ef4444" }} />
          </IconButton>
        </div>
      ),
    },
  ];

  // ✅ Form Fields (UPDATED)
  const staffFields = [
    {
      name: "student_name",
      label: "Student Name",
      placeholder: "Enter full name",
      mandatory: true,
    },
    {
      name: "username",
      label: "Student ID",
      placeholder: "Enter register number",
      mandatory: true,
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter email",
      mandatory: true,
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter password",
      mandatory: true,
    },
    {
      name: "department",
      label: "Department",
      placeholder: "Enter department id",
      mandatory: true,
    },
    {
      name: "batch",
      label: "Batch",
      placeholder: "Enter batch id",
      mandatory: true,
    },
  ];

  return (
    <div className="p-4 md:p-8 bg-[#0b1220] min-h-screen text-white overflow-x-hidden">

      <div className="flex flex-col gap-6">

        {/* Upload + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <UploadCard
            title="Bulk Upload Students"
            description="Drop your CSV file here"
            buttonText="Browse Files"
            onFileSelect={(file) => console.log(file)}
          />

          <div className="lg:col-span-2">
            <DynamicFormCard
              title="Manual Entry"
              fields={staffFields}
              buttonText="Add Student"
              onSubmit={handleSubmit}
              formData={formData}
              handleChange={handleChange}
            />
          </div>

        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

          <h2 className="text-lg md:text-xl font-semibold">
            Existing Student Directory
          </h2>

          <div className="w-full sm:w-[320px]">
            <InputField
              placeholder="Search by name, ID or department.."
              startIcon={<SearchIcon sx={{ color: "#9ca3af" }} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

        </div>

        {/* Table */}
        <CommonTable
          columns={columns}
          rows={rows}
          limit={5}
          searchText={searchText}
        />

      </div>
    </div>
  );
};

export default StudentsEntry;