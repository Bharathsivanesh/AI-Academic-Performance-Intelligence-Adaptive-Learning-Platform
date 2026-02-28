"use client";

import InputField from "./Inputfields";
import { Button } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
export default function DynamicFormCard({
  title = "Manual Entry",
  fields = [],
  buttonText = "Submit",
  onSubmit,
   formData,
  handleChange,
}) {
  return (
    <div className="bg-gradient-to-br from-[#111827] to-[#0f172a] 
                    p-6 rounded-2xl border border-white/5 w-full">

      <div className="flex items-center gap-2 mb-6 text-white font-medium">
        <PersonAddIcon className="text-blue-500" />
        {title}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field, index) => (
  <InputField
    key={index}
    name={field.name}
    type={field.type}
    label={field.label}
    placeholder={field.placeholder}
    mandatory={field.mandatory}
    value={formData[field.name]}
    disabled={field.disabled}
    onChange={(e) =>
      handleChange(field.name, e.target.value)
    }
    className={field.fullWidth ? "md:col-span-2" : ""}
  />
))}

        <div className="md:col-span-2 flex justify-end">
      <Button
  variant="contained"
  onClick={onSubmit}
  startIcon={<AddCircleIcon />}
  sx={{
    backgroundColor: "#2563eb",
    textTransform: "none",
    fontWeight: 500,
    borderRadius: "10px",
    padding: "8px 20px",
    "&:hover": {
      backgroundColor: "#1d4ed8",
    },
  }}
>
  {buttonText}
</Button>
        </div>
      </div>
    </div>
  );
}