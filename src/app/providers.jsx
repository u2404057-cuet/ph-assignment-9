"use client";

import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";

export function Providers({ children }) {
  return (
    <HeroUIProvider>
      {children}
      <ToastProvider placement="bottom-right" />
    </HeroUIProvider>
  );
}
