"use client";

import InputField from "../../../components/Inputfields";
import { Button } from "@mui/material";
import { apiService } from "../../../service/Apicall";


export default function EditStaffForm({ data, setData, onSuccess ,departments}) {

  const handleUpdate = () => {
    if (!data?.id) {
      console.error("Missing staff ID");
      return;
    }

    apiService({
      endpoint: `/api/admin/staff/${data.id}/update/`,
      method: "PATCH",
      payload: {
        staff_name: data.staffName,
        username: data.registerNumber,
        email: data.email,
        department: data.department,
      },
      onSuccess: (res) => {
        console.log("Updated Successfully", res);
        onSuccess && onSuccess(); // close modal + refresh
      },
      onError: (err) => {
        console.error("Update failed", err);
      },
    });
  };

  return (
    <div className="flex overflow-y-hidden flex-col gap-5 max-w-xl">

      <h2 className="text-lg font-semibold text-white">
        Staff Details
      </h2>

      <div className="grid grid-cols-1 gap-4">

        <InputField
          label="Staff Name"
          value={data?.staffName || ""}
          onChange={(e) =>
            setData((prev) => ({ ...prev, staffName: e.target.value }))
          }
        />

        <InputField
          label="Register Number"
          value={data?.registerNumber || ""}
          onChange={(e) =>
            setData((prev) => ({ ...prev, registerNumber: e.target.value }))
          }
        />

        <InputField
          label="Email"
          value={data?.email || ""}
          onChange={(e) =>
            setData((prev) => ({ ...prev, email: e.target.value }))
          }
        />

       <InputField
  label="Department"
  type="select"                         // 🔥 IMPORTANT
  name="department"
  value={data?.department || ""}
  options={departments}                 // 🔥 dynamic options
  placeholder="Select Department"
  onChange={(e) =>
    setData((prev) => ({
      ...prev,
      department: e.target.value,       // 👈 will store ID
    }))
  }
/>
      </div>

      {/* ✅ SAVE BUTTON */}
      <div className="flex justify-end ">
        <Button
          sx={{
            background: "linear-gradient(90deg,#2563eb,#3b82f6)",
            color: "#fff",
            px: 3,
            borderRadius: "10px",
          }}
          onClick={handleUpdate}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}