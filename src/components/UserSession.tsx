"use client";

import { Menu } from "@headlessui/react";
import { LogOut, UserCircle2 } from "lucide-react";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { FC, Fragment, useEffect, useState } from "react";
import { Button } from "./Buttom/Button";

const UserSession: FC = () => {
  const { data } = useSession();

  const [providers, setProviders] =
    useState<Awaited<ReturnType<typeof getProviders>>>(null);

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  return (
    <div>
      {data?.user ? (
        <Menu as="div" className="relative h-10">
          <Menu.Button
            as={Button}
            variant={"text"}
            className="capitalize rounded-full p-1"
            // aria-expanded={open}
          >
            <Image
              src={data.user.image!}
              alt={`${data.user.name!} avatar`}
              width={32}
              height={32}
              className="rounded-full"
            />
          </Menu.Button>

          <Menu.Items
            as="div"
            className="absolute right-0 w-40 filter bg-slate-50/60 px-1 rounded-md shadow-md mt-2 dark:bg-slate-50/10"
          >
            <Menu.Item as={Fragment}>
              <Button
                variant={"text"}
                onClick={() => {
                  signOut();
                }}
                size={"small"}
                className="w-full my-1"
                icon={<LogOut strokeWidth={1} />}
              >
                Sign Out
              </Button>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      ) : (
        <Menu as="div" className="relative">
          {({ open }) => (
            <>
              <Menu.Button
                as={Button}
                variant={open ? "outlined" : "text"}
                className="capitalize"
                icon={<UserCircle2 strokeWidth={0.5} />}
                aria-expanded={open}
              >
                Sign in
              </Menu.Button>

              <Menu.Items
                as="div"
                className="absolute right-2 w-40 filter bg-slate-50/60 px-1 rounded-md shadow-md mt-2 dark:bg-slate-50/10"
              >
                {providers &&
                  Object.values(providers).map((provider) => (
                    <Menu.Item key={provider.id} as={Fragment}>
                      <Button
                        variant={"text"}
                        key={provider.name}
                        onClick={() => {
                          signIn(provider.id);
                        }}
                        size={"small"}
                        className="w-full my-1"
                      >
                        With {provider.name}
                      </Button>
                    </Menu.Item>
                  ))}
                <Button variant={"text"} size={"small"} className="w-full my-1">
                  With something else
                </Button>
              </Menu.Items>
            </>
          )}
        </Menu>
      )}
    </div>
  );
};

export default UserSession;
