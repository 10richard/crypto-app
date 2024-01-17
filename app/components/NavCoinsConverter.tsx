"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavCoinsConverter = () => {
  const path = usePathname();

  return (
    <div className="max-w-[1296px] mx-auto">
      <div className="text-center flex justify-center max-w-[506px] mt-14 p-1 rounded-md bg-bkg-subnav">
        <Link href={"/"}>
          <div
            className={`text-lg w-[244px] py-3 rounded-md ${
              path === "/"
                ? "bg-active-btn/50 border border-[#7878FF]"
                : "bg-inactive-btn"
            }`}
          >
            <p>Coins</p>
          </div>
        </Link>
        <Link href={"/currency-converter"}>
          <div
            className={`text-lg w-[244px] py-3 rounded-md ${
              path === "/currency-converter"
                ? "bg-active-btn/50 border border-[#7878FF]"
                : "bg-inactive-btn"
            }`}
          >
            <p>Converter</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavCoinsConverter;
