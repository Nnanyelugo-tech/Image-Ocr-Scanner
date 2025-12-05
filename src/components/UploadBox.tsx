import React, { useState } from "react";

export interface UploadBoxProps {
  onImageSelected: (file: File) => void;
  helper?: string;
}

export function UploadBox({ onImageSelected, helper }: UploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (file) onImageSelected(file);
  };

  // Handle file input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    handleFile(f!);
  };

  // Drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const f = e.dataTransfer.files[0];
    handleFile(f);
  };

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center text-center border-2 rounded-lg p-6
              ${
                isDragging
                  ? "border-dashed border-[#00ffc3] bg-[#012f2c]"
                  : "border-[#054148]"
              }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p className="text-sm text-[#a8ffea] mb-3 wrap-break-words whitespace-normal">
        {helper ?? "Drag & drop an image here or click to select"}
      </p>

      <label className="cursor-pointer px-4 py-2 bg-[#00ffd0] text-black rounded hover:bg-[#00e6b8] transition">
        Choose File
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleChange}
          className="hidden"
        />
      </label>
    </div>
  );
}
