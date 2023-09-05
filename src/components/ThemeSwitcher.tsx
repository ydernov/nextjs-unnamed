"use client";

import { ThemeValues, themeAtom } from "@/atoms/theme";
import { useAtom } from "jotai";
import { Moon, Sun, SunMoon } from "lucide-react";
import { FC, ReactNode } from "react";
import { Button } from "./Buttom/Button";
import { Fragment } from "react";
import { Menu } from "@headlessui/react";

const themes: {
  value: ThemeValues;
  icon: ReactNode;
}[] = [
  { value: "light", icon: <Sun /> },
  { value: "dark", icon: <Moon /> },
  { value: "system", icon: <SunMoon /> },
];

function ThemeSwitcher() {
  const [theme, setTheme] = useAtom(themeAtom);
  return (
    <Menu as="div" className="relative px-2">
      {({ open }) => (
        <>
          <Menu.Button
            as={Button}
            variant={open ? "outlined" : "text"}
            className="capitalize"
            icon={themes.find(({ value }) => value === theme)?.icon}
            aria-expanded={open}
          >
            {theme}
          </Menu.Button>

          <Menu.Items
            as="div"
            className="absolute right-2 w-40 filter bg-slate-50/60 px-1 rounded-md shadow-md mt-2 dark:bg-slate-50/10 z-[100]"
            autoFocus
          >
            {themes.map(({ value, icon }) => (
              /* Use the `active` state to conditionally style the active item. */
              <Menu.Item key={value} as={Fragment}>
                {({ active }) => (
                  <Button
                    variant={
                      value === theme
                        ? "contained"
                        : active
                        ? "outlined"
                        : "text"
                    }
                    size={"small"}
                    icon={icon}
                    onClick={() => setTheme(value)}
                    className="capitalize w-full my-1"
                    contentClassName="gap-4"
                  >
                    {value}
                  </Button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </>
      )}
    </Menu>
  );
}

export default ThemeSwitcher;
