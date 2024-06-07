import { Copy } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import GlobalApi from "../../../../../_utils/GlobalApi";
import { useUser } from "@clerk/nextjs";

const FileForm = ({ file, onPasswordSave }) => {
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { user } = useUser();
  const shortUrl = file?.shortUrl; // Example URL
  const SendEmail = () => {
    const data = {
      emailTosend: email,
      userName: user?.fullName,
      fileName: file.fileName,
      fileSize: (file.fileSize  / 1024 / 1024).toFixed(2) + "MB",
      fileType: file.fileType,
      shortUrl: file.shortUrl,
    };
    GlobalApi.SendEmail(data)
      .then((resp) => {
        console.log(resp);
        alert("Email sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Failed to send email.");
      });
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("copied!");
  };
  return (
    <div className="w-1/2 pl-10">
      <div className="mb-4">
        <label className="block">Short Url</label>
        <div className="flex items-center">
          <input
            type="text"
            value={shortUrl}
            readOnly
            className="border border-gray-300 rounded p-2 flex-1"
          />
          <button
            onClick={handleCopy}
            className="ml-2 p-2 bg-gray-400 text-white rounded"
          >
            <Copy xlinkTitle="click to copy" />
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block">
          <input
            type="checkbox"
            checked={isPasswordEnabled}
            onChange={() => setIsPasswordEnabled(!isPasswordEnabled)}
            className="mr-2"
          />
          Enable Password?
        </label>
        {isPasswordEnabled && (
          <div className="flex items-center">
            <input
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
            />
            <button
              onClick={() => onPasswordSave(password)}
              disabled={password?.length < 3}
              className="ml-2 p-2 bg-primary text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        )}
      </div>
      <div className="border p-4 rounded-lg">
        <label className="block">Send File to Email</label>
        <input
          type="email"
          value={email}
          placeholder="abc@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
        <button
          disabled={email?.length < 3}
          onClick={() => SendEmail()}
          className="mt-2 p-2 w-full bg-blue-500 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Send Email
        </button>
      </div>
    </div>
  );
};

export default FileForm;
