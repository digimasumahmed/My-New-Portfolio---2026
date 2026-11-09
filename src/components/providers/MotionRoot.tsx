"use client";

import { SiteMenu } from "@/components/SiteMenu";
import { CustomCursor } from "@/components/providers/CustomCursor";
import { MenuProvider } from "@/components/providers/MenuProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

export function MotionRoot({ children }: { children: React.ReactNode }) {
  return (
    <MenuProvider>
      <SmoothScroll>
        {children}
        <SiteMenu />
        <CustomCursor />
      </SmoothScroll>
    </MenuProvider>
  );
}
