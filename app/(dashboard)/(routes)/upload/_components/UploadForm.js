"use client";
import Image from "next/image";
import React, { useState } from "react";
import FilePreview from "./FilePreview";
import ProgressBar from "./ProgressBar";
import { toast } from "react-toastify";

const UploadForm = ({ uploadBtnClick, progress, uploadBtn }) => {
  const [file, setFile] = useState();

  const onFileSelect = (file) => {
    if (file && file.size > 5000000) {
      toast.error("File size is Greater Than 5 MB");
      return;
    }
    console.log(file);

    setFile(file);
  };
  return (
    <div className="text-center">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-primary border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Image src={"/upload.svg"} width={40} height={40} alt="upload" />
            <p className="mb-2 text-lg md:text-2xl text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (Max Size : 5MB )
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(e) => onFileSelect(e.target.files[0])}
          />
        </label>
      </div>
      {file ? (
        <FilePreview file={file} removeFile={() => setFile(null)} />
      ) : null}

      {progress > 0 ? (
        <ProgressBar progress={progress} />
      ) : (
        <button
          disabled={!file}
          onClick={() => {
            uploadBtnClick(file);
            
          }}
          className="p-2 bg-primary text-white w-[30%] rounded-full mt-5 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Upload
        </button>
      )}
    </div>
  );
};

export default UploadForm;
