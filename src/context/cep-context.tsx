"use client";
import { ICepResult } from "@/types/cep-result";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

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
  removeCep: (cep: string) => void;
  fetchCep: (cep: string) => Promise<CepResult>;
  cachedCEP: Record<string, ICepResult>;
};

const SAVED_CEPS = "savedCeps";

export const CepContext = createContext<CepContext | null>(null);

export const CepContextProvider = ({ children }: CepContextProviderProps) => {
  const [savedCEP, setSavedCEP] = useState<ICepResult[]>([]);
  const [cachedCEP, setCachedCEP] = useState<Record<string, ICepResult>>({});

  useEffect(() => {
    const storedCeps = localStorage.getItem(SAVED_CEPS);
    if (storedCeps) {
      setSavedCEP(JSON.parse(storedCeps));
    }
  }, []);

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
    setSavedCEP((storedCEPS) => {
      const isAlreadySaved = storedCEPS.some((item) => item.cep === cep.cep);
      if (isAlreadySaved) return storedCEPS;

      const newSavedCeps = [...storedCEPS, cep];
      localStorage.setItem(SAVED_CEPS, JSON.stringify(newSavedCeps));
      return newSavedCeps;
    });
  };

  const removeCep = (cep: string) => {
    setSavedCEP((prev) => prev.filter((item) => item.cep !== cep));
  };

  return (
    <CepContext.Provider
      value={{ savedCEP, saveCep, cachedCEP, fetchCep, removeCep }}
    >
      {children}
    </CepContext.Provider>
  );
};
