
import { ReactNode } from "react";
import Sidebar from "@/Components/SideBar/SideBar";
import RightSidebar from "@/Components/RightSideBar/RightSideBar";

export default function LayoutUser({ children }: { children: ReactNode }) {

  return (
    <div className="flex xl:flex-row flex-col-reverse h-screen justify-between">
        <Sidebar/>
      <div className="p-4 w-full pb-20 lg:h-screen overflow-auto">
        {children}
      </div>
    </div>
  );
}
