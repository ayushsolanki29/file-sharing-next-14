"use client"
import React, { useEffect, useState } from 'react'
import UploadForm from './_components/UploadForm'
import { app } from '../../../../firebaseConfig';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from 'react-toastify';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useUser } from '@clerk/nextjs';
import { genrateRandomeString } from '../../../_utils/GenratorRandom';
import { useRouter } from 'next/navigation';

const Upload = () => {
  const { user } = useUser();
  const [fileState, setFileState] = useState(false);
  const [fileDocId, setFileDocId] = useState();
  const [progress, setProgress] = useState(0);
  const [uploadBtn, setUploadBtn] = useState(true);
  const router = useRouter();
  const storage = getStorage(app);
  const db = getFirestore(app);

  const uploadFile = (file) => {
    const metadata = { contentType: file.type };
    const sanitizedFileName = file.name.replace(/\s+/g, '-');
    const spaceRef = ref(storage, "file-upload/" + sanitizedFileName);
    const uploadTask = uploadBytesResumable(spaceRef, file, metadata);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error('Upload failed', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          toast.success("File Uploaded");
          setFileState(true);
          saveInfo(file, downloadURL);
        });
      }
    );
  };

  const saveInfo = async (file, fileUrl) => {
    const docId = genrateRandomeString().toString();
    setFileDocId(docId);
    await setDoc(doc(db, "UploadedFile", docId), {
      fileName: file.name,
      fileUrl,
      fileSize: file.size,
      fileType: file.type,
      userEmail: user.primaryEmailAddress.emailAddress,
      userName: user.fullName,
      password: '',
      id: docId,
      shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}f/${docId}`,
    });
  };

  useEffect(() => {
    if (fileState) {
      const timer = setTimeout(() => {
        setFileState(false);
        router.push('/file-preview/' + fileDocId);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [fileState, fileDocId, router]);

  return (
    <div className='p-5 px-8 md:px-28'>
      <h2 className='text-[20px] text-center m-5'>
        Start <strong className='text-primary'>Uploading</strong> Files and <strong className='text-primary'>Share</strong> it
      </h2>
      <UploadForm uploadBtnClick={(file) => uploadFile(file)} progress={progress} uploadBtn={uploadBtn} />
    </div>
  );
};

export default Upload;
