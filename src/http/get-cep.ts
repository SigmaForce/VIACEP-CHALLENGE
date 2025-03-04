import { ICepCache } from "@/types/cep-cache";
import { ICepResult } from "@/types/cep-result";
import axios from "axios";

const CACHE_KEY = "cached-ceps";

type CepResult = {
  data: ICepResult | null;
  error: string | null;
};

export const getCep = async (cep: string): Promise<CepResult> => {
  const cachedData: ICepCache = JSON.parse(
    localStorage.getItem(CACHE_KEY) || "{}"
  );

  if (cachedData[cep]) {
    return { data: cachedData[cep], error: null };
  }

  try {
    const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    if (res.data.erro == "true") {
      return { data: res.data, error: "CEP não encontrado" };
    }
    const updatedCache = { ...cachedData, [cep]: res.data };
    localStorage.setItem(CACHE_KEY, JSON.stringify(updatedCache));
    return { data: res.data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: "Ocorreu um erro inesperado" };
  }
};
