import Image from "next/image";
import Link from "next/link";
import UserSession from "./UserSession";
import dynamic from "next/dynamic";
import { Button } from "./Buttom/Button";
import { Menu } from "lucide-react";
import { text } from "stream/consumers";

const ThemeSwitcher = dynamic(() => import("../components/ThemeSwitcher"), {
  ssr: false,
});

const Header = () => (
  <header className="flex flex-row justify-between items-center p-4">
    <div className="flex flex-row items-center gap-3">
      <Button icon={<Menu />} variant={"text"} className="p-2 rounded-full" />
      <Link href={"/"}>
        <span className="text-2xl uppercase ">logo</span>
      </Link>
    </div>

    <div className="flex flex-row items-center gap-3">
      <ThemeSwitcher />
      <UserSession />
    </div>
  </header>
);

export default Header;
