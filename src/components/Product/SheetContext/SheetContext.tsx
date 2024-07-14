"use client"
import { createContext, useContext, useRef, ReactNode, MutableRefObject } from 'react';

interface SheetContextType {
  sheetTriggerRef: MutableRefObject<HTMLButtonElement | null>;
}

const SheetContext = createContext<SheetContextType | undefined>(undefined);

export const SheetProvider = ({ children }: { children: ReactNode }) => {
  const sheetTriggerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <SheetContext.Provider value={{ sheetTriggerRef }}>
      {children}
    </SheetContext.Provider>
  );
};

export const useSheet = () => {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error('useSheet must be used within a SheetProvider');
  }
  return context;
};
