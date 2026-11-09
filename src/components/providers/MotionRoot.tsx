"use client";

import { SiteMenu } from "@/components/SiteMenu";
import { CustomCursor } from "@/components/providers/CustomCursor";
import { MenuProvider } from "@/components/providers/MenuProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export function MotionRoot({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MenuProvider>
        <SmoothScroll>
          {children}
          <SiteMenu />
          <CustomCursor />
        </SmoothScroll>
      </MenuProvider>
    </ThemeProvider>
  );
}
