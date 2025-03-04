"use client";
import { ICepResult } from "@/types/cep-result";
import { createContext, useState } from "react";

type CepContextProviderProps = {
  children: React.ReactNode;
};

type CepContext = {
  savedCEP: ICepResult[];
  saveCep: (cep: ICepResult) => void;
};

export const CepContext = createContext<CepContext | null>(null);

export const CepContextProvider = ({ children }: CepContextProviderProps) => {
  const [savedCEP, setSavedCEP] = useState<ICepResult[]>([]);

  const saveCep = (cep: ICepResult) => {
    setSavedCEP((prev) => {
      const isAlreadySaved = prev.some((item) => item.cep === cep.cep);
      return isAlreadySaved ? prev : [...prev, cep];
    });
  };

  return (
    <CepContext.Provider value={{ savedCEP, saveCep }}>
      {children}
    </CepContext.Provider>
  );
};
