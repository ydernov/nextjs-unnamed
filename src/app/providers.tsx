"use client";

import { Provider as JotaiProvider } from "jotai";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <JotaiProvider>
      <SessionProvider>{children}</SessionProvider>
    </JotaiProvider>
  );
}
