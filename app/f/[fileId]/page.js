"use client";

import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import { useEffect, useState } from "react";
import FileItem from "./_components/FileItem";
const FileView = ({ params }) => {
  const [file, setFile] = useState();
  const db = getFirestore(app);
  useEffect(() => {
    params.fileId && getFileInfo();
  });
  const getFileInfo = async () => {
    const docRef = doc(db, "UploadedFile", params?.fileId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setFile(docSnap.data());
    } else {
      console.log("no data");
    }
  };
  return (
    <div className="bg-gray-200 h-screen flex justify-center items-center flex-col gap-4">
      <FileItem file={file} />
    </div>
  );
};

export default FileView;
