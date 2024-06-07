"use client"
import { app } from "../../../../firebaseConfig";
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FileBarChart } from "lucide-react";

const Files = () => {

  const { user } = useUser();
  const db = getFirestore(app);
  const [files, setFiles] = useState([]);
  const [totalFiles, setTotalFiles] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  useEffect(() => {
    if (user) {
      getFilesInfo();
    }
  }, [user]);

  const getFilesInfo = async () => {
    try {
      const q = query(
        collection(db, "UploadedFile"),
        where("userEmail", "==", user.primaryEmailAddress.emailAddress)
      );
      const querySnapshot = await getDocs(q);
      const filesArray = querySnapshot.docs.map(doc => doc.data());
      setFiles(filesArray);
      const totalFileCount = filesArray.length;
      const totalFileSize = filesArray.reduce((acc, file) => acc + file.fileSize, 0);

      setTotalFiles(totalFileCount);
      setTotalSize(totalFileSize);
    } catch (error) {
      console.error("Error fetching files: ", error);
    }
  };
  const handleDelete = async (fileId) => {
    try {
      await deleteDoc(doc(db, "UploadedFile", fileId));
      setFiles(files.filter(file => file.id !== fileId));
      toast.success("File Deleted!")
    } catch (error) {
      toast.error("Deleting Faild")
    }
  };
  return (
    <div>
      <div className="stats ">
        <article className="rounded-lg border border-gray-100 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Files</p>
              <p className="text-2xl font-medium text-gray-900">{totalFiles}</p>
            </div>

            <span className="rounded-full bg-blue-100 p-3 text-blue-600">
            <FileBarChart />
            </span>
          </div>

          <div className="mt-1 flex gap-1 text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>

            <p className="flex gap-2 text-xs">
              <span className="font-medium">used size :  {(totalSize / 1024 / 1024).toFixed(2)}MB </span>

              <span className="text-gray-500"> Credit Left : 22 </span>
            </p>
          </div>
        </article>

      </div>


      <hr className='mt-2' />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="text-left">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">File Name</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">File Size</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">File Type</th>
              <th colSpan={2} className="px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {files.length > 0 ? (
              files.map((file, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{file.fileName}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ (file.fileSize / (1024*1024)).toFixed(2)} MB</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{file.fileType}</td>
                  <td className="whitespace-nowrap px-4 py-2 flex gap-2">
                    <a
                      href={process.env.NEXT_PUBLIC_BASE_URL + "file-preview/" + file.id}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                  No files found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Files
