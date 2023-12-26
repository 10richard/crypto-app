"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavCoinsConverter = () => {
  const path = usePathname();

  return (
    <div className="text-center flex justify-center max-w-[506px] bg-[#191926] mt-14 ml-[72px] p-1 rounded-md">
      <Link href={"/"}>
        <div
          className={`text-lg w-[244px] py-3 rounded-md ${
            path === "/"
              ? "bg-[#3d3d82] border border-[#7878FF]"
              : "bg-[#232337]"
          }`}
        >
          <p>Coins</p>
        </div>
      </Link>
      <Link href={"/currency-converter"}>
        <div
          className={`text-lg w-[244px] py-3 rounded-md ${
            path === "/currency-converter"
              ? "bg-[#3d3d82] border border-[#7878FF]"
              : "bg-[#232337]"
          }`}
        >
          <p>Converter</p>
        </div>
      </Link>
    </div>
  );
};

export default NavCoinsConverter;
