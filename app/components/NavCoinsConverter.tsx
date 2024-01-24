"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MaxWidthContainer } from "./styled/MaxWidthContainer";

const NavCoinsConverter = () => {
  const path = usePathname();

  return (
    <MaxWidthContainer>
      <div className="text-center flex justify-center max-w-[506px] mt-14 p-1 rounded-md bg-bkg-subnav">
        <Link href={"/"}>
          <div
            className={`text-lg w-[244px] py-3 rounded-md ${
              path === "/"
                ? "text-white bg-active-btn/50 border border-[#7878FF]"
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
                ? "text-white bg-active-btn/50 border border-[#7878FF]"
                : "bg-inactive-btn"
            }`}
          >
            <p>Converter</p>
          </div>
        </Link>
      </div>
    </MaxWidthContainer>
  );
};

export default NavCoinsConverter;
