"use client";

// import logo from "@/public/images/logo.svg";
// import homeLight from "@/public/images/navbar/homeLight.svg";
// import homeDark from "@/public/images/navbar/homeDark.svg";
// import portfolioLight from "@/public/images/navbar/portfolioLight.svg";
// import portfolioDark from "@/public/images/navbar/portfolioDark.svg";
// import search from "@/public/images/navbar/search.svg";
// import currency from "@/public/images/navbar/currency.svg";
// import chevronDown from "@/public/images/navbar/chevron-down.svg";
// import sun from "@/public/images/navbar/sun.svg";
// import moon from "@/public/images/navbar/moon.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const [toggleTheme, setToggleTheme] = useState("dark-theme");
  const path = usePathname();

  const handleThemeClick = () => {
    setToggleTheme(toggleTheme === "dark-theme" ? "light-theme" : "dark-theme");
  };

  return (
    <nav className="text-white flex items-center justify-between py-3 max-w-[1296px] mx-auto">
      <div className="flex gap-3">
        <Image
          src={"/images/logo.svg"}
          alt="Crypto App Logo"
          width={36}
          height={20}
        />
        <p className="text-xl font-bold">Loroipsm</p>
      </div>
      <div className="flex gap-6">
        <Link href={"/"}>
          <div className="flex gap-3 px-4 py-2">
            <Image
              src={
                path === "/" || path === "/currency-converter"
                  ? `/images/navbar/${toggleTheme}/home-active.svg`
                  : `/images/navbar/${toggleTheme}/home-inactive.svg`
              }
              alt="Home icon"
              width={24}
              height={0}
            />
            <p
              className={`${
                path === "/" || path === "/currency-converter"
                  ? ""
                  : "text-[#FFFFFF80]"
              }`}
            >
              Home
            </p>
          </div>
        </Link>
        <Link href={"/portfolio"}>
          <div className="flex gap-3 px-4 py-2">
            <Image
              src={
                path === "/portfolio"
                  ? `/images/navbar/${toggleTheme}/portfolio-active.svg`
                  : `/images/navbar/${toggleTheme}/portfolio-inactive.svg`
              }
              alt="Portfolio icon"
              width={24}
              height={0}
            />
            <p className={`${path === "/portfolio" ? "" : "text-[#FFFFFF80]"}`}>
              Portfolio
            </p>
          </div>
        </Link>
      </div>
      <div className="flex gap-4">
        <div className="flex items-center relative">
          <Image
            src={`/images/navbar/${toggleTheme}/search.svg`}
            alt="Search icon"
            width={20}
            height={0}
            className="absolute left-3"
          />
          <input
            type="text"
            placeholder="Search..."
            className="px-11 py-3 bg-[#191926] w-[396px] rounded-md"
          />
        </div>
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-3 bg-[#191926] rounded-md"
        >
          <Image
            src={`/images/navbar/${toggleTheme}/currency.svg`}
            alt="Currency icon"
            width={20}
            height={20}
          />
          <p>USD</p>
          <Image
            src={`/images/navbar/${toggleTheme}/chevron-down.svg`}
            alt="Chevron down icon"
            width={12}
            height={12}
          />
        </button>
        <button
          type="button"
          className="flex items-center justify-center w-12 h-12 bg-[#191926] rounded-md"
          onClick={handleThemeClick}
        >
          <Image
            src={`/images/navbar/${toggleTheme}/color-theme.svg`}
            alt="Color theme change icon"
            width={24}
            height={24}
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
