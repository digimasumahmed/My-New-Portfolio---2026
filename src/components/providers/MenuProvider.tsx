"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type MenuContextValue = {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
};

const MenuContext = createContext<MenuContextValue | null>(null);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = useCallback(() => setIsOpen(true), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((open) => !open), []);

  const value = useMemo(
    () => ({ isOpen, openMenu, closeMenu, toggleMenu }),
    [isOpen, openMenu, closeMenu, toggleMenu],
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) {
    throw new Error("useMenu must be used within MenuProvider");
  }
  return ctx;
}
