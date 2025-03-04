"use client";
import { useCepContext } from "@/hooks/use-cep-context";
import { CepCard } from "./cep-card";

export const ListSavedCeps = () => {
  const { savedCEP } = useCepContext();
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Lista de Ceps Salvos</h2>
      {savedCEP.length == 0 ? (
        <span className="text-xl font-medium">
          Nenhum CEP salvo no momento. Faça uma busca e salve os endereços para
          visualizá-los aqui.
        </span>
      ) : (
        <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
          {savedCEP.map((cep) => (
            <div
              key={cep.cep}
              className="border rounded-md h-full border-gray-600 bg-gray-800 px-4 py-6 space-y-3 flex flex-col justify-between w-full min-w-xs"
            >
              <main className="space-y-4">
                <CepCard.Details data={cep} />
              </main>
              <footer className="self-end justify-end">
                <CepCard.RemoveCep cep={cep.cep} />
              </footer>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
