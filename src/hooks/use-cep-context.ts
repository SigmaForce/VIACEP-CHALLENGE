import { CepContext } from "@/context/cep-context";
import { useContext } from "react";

export function useCepContext() {
  const context = useContext(CepContext);

  if (!context) {
    throw new Error("useCepContext must be used within a CepContextProvider");
  }

  return context;
}
