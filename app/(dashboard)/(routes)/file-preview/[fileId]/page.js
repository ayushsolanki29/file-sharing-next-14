"use client";

import { app } from "../../../../../firebaseConfig";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import FileInfo from "./_components/FileInfo";
import FileForm from "./_components/FileForm";
import Link from "next/link";
import { toast } from "react-toastify";

const FilePreview = ({ params }) => {
  const db = getFirestore(app);
  const [file, setFile] = useState();
  useEffect(() => {
    params?.fileId && getFileInfo();
  }, []);

  const getFileInfo = async () => {
    const docRef = doc(db, "UploadedFile", params?.fileId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setFile(docSnap.data());
    } else {
      console.log("no data");
    }
  };
  
  const onPasswordSave = async (password) => {
    const docRef = doc(db, "UploadedFile", params?.fileId);
    await updateDoc(docRef, {
      password: password,
    });

    toast.success("password created!");
  };
  return (
    <div className="p-5 px-8 md:px-28">
      <Link href={"/upload"} className="mb-8">
        <ArrowLeft className="inline" /> Go to Upload
      </Link>
      <br />
      <div className="flex justify-between items-center mt-3">
        <FileInfo file={file} />
        <FileForm
          file={file}
          onPasswordSave={(password) => onPasswordSave(password)}
        />
      </div>
    </div>
  );
};

export default FilePreview;
