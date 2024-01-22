"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../../contexts/themeContext";
import { MaxWidthContainer } from "../styled/MaxWidthContainer";
import SearchBar from "./SearchBar";
import ThemeSwitcher from "./ThemeSwitcher";
import { useState } from "react";

const Navbar = () => {
  const { currentTheme, toggleTheme } = useTheme();
  const [search, setSearch] = useState("");
  const path = usePathname();

  return (
    <nav className="bg-bkg-navbar">
      <MaxWidthContainer className="flex items-center justify-between py-3">
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
                    ? `/images/navbar/${currentTheme}/home-active.svg`
                    : `/images/navbar/${currentTheme}/home-inactive.svg`
                }
                alt="Home icon"
                width={24}
                height={24}
              />
              <p
                className={`${
                  path === "/" || path === "/currency-converter"
                    ? ""
                    : "text-content-main/50"
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
                    ? `/images/navbar/${currentTheme}/portfolio-active.svg`
                    : `/images/navbar/${currentTheme}/portfolio-inactive.svg`
                }
                alt="Portfolio icon"
                width={24}
                height={24}
              />
              <p
                className={`${
                  path === "/portfolio" ? "" : "text-content-main/50"
                }`}
              >
                Portfolio
              </p>
            </div>
          </Link>
        </div>
        <div className="flex gap-4">
          <SearchBar currentTheme={currentTheme} handleSearch={setSearch} />
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-3 bg-bkg-input/40 rounded-md"
          >
            <Image
              src={`/images/navbar/${currentTheme}/currency.svg`}
              alt="Currency icon"
              width={20}
              height={20}
            />
            <p>USD</p>
            <Image
              src={`/images/navbar/${currentTheme}/chevron-down.svg`}
              alt="Chevron down icon"
              width={12}
              height={12}
            />
          </button>
          <ThemeSwitcher
            currentTheme={currentTheme}
            toggleTheme={toggleTheme}
          />
        </div>
      </MaxWidthContainer>
    </nav>
  );
};

export default Navbar;
