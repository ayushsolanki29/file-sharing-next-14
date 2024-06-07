import React from "react";
const ProgressBar = ({ progress  }) => {
  return (
    <div className="progress-bar-container bg-gray-400 w-full h-4 mt-3 rounded-full overflow-hidden">
    <div
      className="progress-bar-inner p-1 bg-primary h-full text-[10px] flex items-center justify-center text-white"
      style={{ width: `${progress}%` }}
    >
      {`${Number(progress).toFixed(0)}%`}
     
    </div>
  </div>
  
  );
};

export default ProgressBar;
