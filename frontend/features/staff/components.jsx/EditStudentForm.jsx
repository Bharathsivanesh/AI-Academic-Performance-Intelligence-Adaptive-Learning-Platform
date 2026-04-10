"use client";

import { Button } from "@mui/material";
import { apiService } from "../../../service/Apicall";
import InputField from "../../../components/Inputfields";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { showToast } from "../../../components/Notification";

export default function EditStudentForm({ data, setData, onSuccess }) {
  const [batches, setBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  // ✅ Fetch batches (no loader)
  useEffect(() => {
    apiService({
      endpoint: "/api/staff/batches/",
      method: "GET",
      onSuccess: (res) => {
        const formatted = res.map((b) => ({
          label: b.batch_name,
          value: b.id,
        }));
        setBatches(formatted);
      },
      onError: (err) => console.error(err),
    });
  }, []);

  // ✅ Update
  const handleUpdate = () => {
    if (!data?.id) {
      showToast("Missing student ID!", "error");
      return;
    }

    setLoadingMessage("Saving Student Changes...");
    apiService({
      endpoint: `/api/admin/students/${data.id}/update/`,
      method: "PATCH",
      setLoading: setIsLoading,
      payload: {
        student_name: data.student_name,
        username: data.username,
        email: data.email,
        batch: Number(data.batch),
      },
      onSuccess: () => {
        showToast("Student updated successfully!", "success");
        onSuccess && onSuccess();
      },
      onError: (err) => {
        console.error(err);
        showToast("Failed to update student!", "error");
      },
    });
  };

  return (
    <div className="flex flex-col gap-5 max-w-xl">
      {/* ✅ Loader */}
      <Loader isLoading={isLoading} message={loadingMessage} />

      <h2 className="text-lg font-semibold text-white">Student Details</h2>

      <div className="grid grid-cols-1 gap-4">
        <InputField
          label="Student Name"
          value={data?.student_name || ""}
          onChange={(e) =>
            setData((prev) => ({ ...prev, student_name: e.target.value }))
          }
        />

        <InputField
          label="Student ID"
          value={data?.username || ""}
          onChange={(e) =>
            setData((prev) => ({ ...prev, username: e.target.value }))
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
          type="select"
          label="Batch"
          value={data?.batch || ""}
          onChange={(e) =>
            setData((prev) => ({ ...prev, batch: e.target.value }))
          }
          options={batches}
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-4">
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
