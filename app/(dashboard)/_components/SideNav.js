"use client"
import { File, Shield, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const SideNav = () => {
  const menuList = [
    {
      id: 1,
      name: "Upload",
      icon: Upload,
      path: "/upload",
    },
    {
      id: 2,
      name: "Files",
      icon: File,
      path: "/files",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: Shield,
      path: "/upgrade",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="shadow-sm border-r h-full">
      <div className="p-5 border-b">
        <Image src={"/logo.svg"} width={80} height={70} alt="logo" />
      </div>
      {menuList.map((item, index) => (
        <Link href={item.path} onClick={()=>setActiveIndex(index)} key={index} className={`flex gap-2 p-4 px-6 hover:bg-gray-200 w-full text-gray-500 ${activeIndex == index ? 'bg-blue-100 text-primary':null}`}>
           <item.icon/>
          <h2>{item.name}</h2>
        </Link>
      ))}
    </div>
  );
};

export default SideNav;
