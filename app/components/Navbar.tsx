"use client";

import logo from "@/public/images/logo.svg";
import homeLight from "@/public/images/navbar/homeLight.svg";
import homeDark from "@/public/images/navbar/homeDark.svg";
import portfolioLight from "@/public/images/navbar/portfolioLight.svg";
import portfolioDark from "@/public/images/navbar/portfolioDark.svg";
import search from "@/public/images/navbar/search.svg";
import currency from "@/public/images/navbar/currency.svg";
import chevronDown from "@/public/images/navbar/chevron-down.svg";
import sun from "@/public/images/navbar/sun.svg";
import moon from "@/public/images/navbar/moon.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const [toggleTheme, setToggleTheme] = useState("dark");
  const path = usePathname();

  const handleThemeClick = () => {
    setToggleTheme(toggleTheme === "dark" ? "" : "dark");
  };

  return (
    <nav className="text-white flex justify-center">
      <div className="flex items-center justify-between py-3 max-w-[1296px] w-full">
        <div className="flex gap-3">
          <img src={logo.src} alt="Crypto App logo" />
          <p className="text-xl font-bold">Loroipsm</p>
        </div>
        <div className="flex gap-6">
          <Link href={"/"}>
            <div className="flex gap-3 px-4 py-2">
              <img
                src={
                  path === "/" || path === "/currency-converter"
                    ? homeLight.src
                    : homeDark.src
                }
                alt="Home icon"
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
              <img
                src={
                  path === "/portfolio" ? portfolioLight.src : portfolioDark.src
                }
                alt="Portfolio icon"
              />
              <p
                className={`${path === "/portfolio" ? "" : "text-[#FFFFFF80]"}`}
              >
                Portfolio
              </p>
            </div>
          </Link>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center relative">
            <img src={search.src} alt="" className="absolute left-3" />
            <input
              type="text"
              placeholder="Search..."
              className="px-10 py-2 bg-[#191926] w-[396px] rounded-md"
            />
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-[#191926] rounded-md"
          >
            <img src={currency.src} alt="" />
            <p>USD</p>
            <img src={chevronDown.src} alt="" />
          </button>
          <button
            type="button"
            className="flex items-center px-4 py-2 bg-[#191926] rounded-md"
            onClick={handleThemeClick}
          >
            <img
              src={toggleTheme === "dark" ? sun.src : moon.src}
              alt="Theme changer"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
