"use client";
import { ICepResult } from "@/types/cep-result";
import axios from "axios";
import { createContext, useState } from "react";

type CepContextProviderProps = {
  children: React.ReactNode;
};

type CepResult = {
  data: ICepResult | null;
  error: string | null;
};

type CepContext = {
  savedCEP: ICepResult[];
  saveCep: (cep: ICepResult) => void;
  fetchCep: (cep: string) => Promise<CepResult>;
  cachedCEP: Record<string, ICepResult>;
};

export const CepContext = createContext<CepContext | null>(null);

export const CepContextProvider = ({ children }: CepContextProviderProps) => {
  const [savedCEP, setSavedCEP] = useState<ICepResult[]>([]);
  const [cachedCEP, setCachedCEP] = useState<Record<string, ICepResult>>({});

  const fetchCep = async (cep: string): Promise<CepResult> => {
    if (cachedCEP[cep]) {
      return { data: cachedCEP[cep], error: null };
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      if (response.data.erro == "true") {
        return { data: null, error: "CEP não encontrado" };
      }

      setCachedCEP((prev) => ({
        ...prev,
        [cep]: response.data as ICepResult,
      }));

      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: "Erro ao buscar o CEP" };
    }
  };

  const saveCep = (cep: ICepResult) => {
    setSavedCEP((prev) => {
      const isAlreadySaved = prev.some((item) => item.cep === cep.cep);
      return isAlreadySaved ? prev : [...prev, cep];
    });
  };

  return (
    <CepContext.Provider value={{ savedCEP, saveCep, cachedCEP, fetchCep }}>
      {children}
    </CepContext.Provider>
  );
};
