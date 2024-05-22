
import { ReactNode } from "react";
import Sidebar from "@/Components/SideBar/SideBar";

export default function LayoutUser({ children }: { children: ReactNode }) {

  return (

    <div className="flex xl:flex-row flex-col-reverse h-screen">
        <Sidebar/>
      <div className="p-6 pb-20 lg:h-screen overflow-auto">

        {children}
      </div>
    </div>
  );
}
