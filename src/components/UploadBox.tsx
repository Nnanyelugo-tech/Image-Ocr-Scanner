import React, { useState } from "react";

export interface UploadBoxProps {
   // Callback to return selected image to parent
  onImageSelected: (file: File) => void;
  // Optional helper text to display inside the box
  helper?: string;
}

export function UploadBox({ onImageSelected, helper }: UploadBoxProps) {
  // Tracks if a file is being dragged over
  const [isDragging, setIsDragging] = useState(false);

    // Pass the selected file back to the parent
  const handleFile = (file: File) => {
    if (file) onImageSelected(file);
  };

  // When file is selected through the file picker
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    // Process the first selected file
    handleFile(f!);
  };

  // When user drags a file over the upload area
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // When user drags file out of the area
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // When user drops the file into the area
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    // Get dropped file
    const f = e.dataTransfer.files[0];
    // Process the file
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
      // Enable drag-over behavior
      onDragOver={handleDragOver}
      // Remove drag highlight
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p className="text-sm text-[#a8ffea] mb-3 wrap-break-words whitespace-normal">
        {helper ?? "Drag & drop an image here or click to select"}
      </p>

      {/* Hidden file input + styled label for clicking */}
      <label className="cursor-pointer px-4 py-2 bg-[#00ffd0] text-black rounded hover:bg-[#00e6b8] transition">
        Choose File
        <input
          type="file"
          accept="image/*;capture=camera"
          capture="environment"
          onChange={handleChange}
          className="hidden"
        />
      </label>
    </div>
  );
}
