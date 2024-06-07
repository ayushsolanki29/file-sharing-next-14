import { UserButton } from "@clerk/nextjs";
import { AlignJustify } from "lucide-react";
import Image from "next/image";


const Top_header = () => {
  return (
    <div className="flex p-5 border-b items-center justify-between md:justify-end">
      <AlignJustify className="md:hidden" />
      <Image src={"/logo.svg"} width={50} height={30} alt="logo" className="md:hidden"/>
      <UserButton afterSignOutUrl='/'/>
      
    </div>
  );
};

export default Top_header;
