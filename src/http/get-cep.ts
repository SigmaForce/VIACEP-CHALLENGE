import axios from "axios";

export const getCep = async (cep: string) => {
  try {
    const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (res.status === 400) {
      throw new Error("CEP Inválido");
    }
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
