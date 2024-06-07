import Image from "next/image";
import React from "react";

const FileInfo = ({ file }) => {
    const isImage = file?.fileType.startsWith('image/');
    let imgPath
    if (isImage) {
    imgPath  = file?.fileUrl;
    }else{
        imgPath = "/file.png";
    }
  return (
    <div className="w-1/2 border p-10 text-center rounded-[30px]">
      <Image
        src={imgPath}
        width={200}
        height={150}
        alt="Uploaded file"
        className="m-auto rounded"
      />
      <p className="mt-2">{file?.fileName}</p>
      <p className="text-gray-400">Type : {file?.fileType}</p>
      <p className="text-gray-400">Size : {(file?.fileSize  / 1024 / 1024).toFixed(2) } MB</p>
    </div>
  );
};

export default FileInfo;
