import React, { useState } from "react";

const FileItem = ({ file }) => {
  const [password, setPassword] = useState("");

  // Determine if the download button should be disabled
  const isDownloadDisabled = file?.password
    ? password.trim() !== file.password
    : false;

  const handleDownload = () => {
    if (file?.fileUrl) {
      const link = document.createElement('a');
      link.href = file.fileUrl;
      link.setAttribute('download', file.fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm text-center">
        <div className="mb-4">
          <img src="/logo.svg" alt="Logo" className="mx-auto mb-4" />
          <h2 className="text-xl font-semibold">
            <span className="text-primary">File Share </span> Shared the file
          </h2>
          <p className="text-gray-600">Find File details below</p>
        </div>
        <div className="mb-6">
          <img
            src={file?.fileType.startsWith("image/") ? file.fileUrl : "/file.png"}
            alt="File Icon"
            className="mx-auto mb-4 w-16 h-16"
          />
          <p className="text-lg font-medium">
            {file?.fileName} <br />
             {file?.fileType} 
             <br />
            {(file?.fileSize / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
        {file?.password && (
          <div className="mb-6">
            <input
              type="password"
              placeholder="Enter password to access"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
          </div>
        )}
        <button
          onClick={handleDownload}
          disabled={isDownloadDisabled}
          className={`w-full py-2 px-4 rounded ${
            isDownloadDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Download
        </button>
        <p className="text-gray-500 text-sm mt-4">
          *Terms and Conditions apply
        </p>
      </div>
    </div>
  );
};

export default FileItem;
