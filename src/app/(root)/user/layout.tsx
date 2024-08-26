
import { ReactNode } from "react";
import Sidebar from "@/Components/SideBar/SideBar";


export default function LayoutUser({ children }: { children: ReactNode }) {

  return (
    // <div className="flex xl:flex-row flex-col-reverse h-screen justify-between">
    <div className="flex xl:flex-row flex-col-reverse h-svh justify-between">
        <Sidebar/>
      <div className="p-4 w-full lg:h-screen overflow-auto">
        {children}
      </div>
    </div>
  );
}
