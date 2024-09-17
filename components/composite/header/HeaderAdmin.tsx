// import { useEffect, useState } from "react";
import classNames from "classnames";
// import { useRouter } from "next/router";
// import { routes } from "@/constant/routes";
import UserMenu from "./UserMenu";
import LogoAdmin from "./LogoAdmin";

export default function HeaderAdmin() {
  

  return (
    <header className={classNames("w-full h-16 bg-cover flex items-center justify-between px-10 border-b-[1px]")}>
      <LogoAdmin />

      <div className="grid grid-flow-col items-center space-x-4">
        <UserMenu/>
      </div>
    </header>
  );
}
