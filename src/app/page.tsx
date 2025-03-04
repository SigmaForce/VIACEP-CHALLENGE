"use client";
import { useCepContext } from "@/hooks/use-cep-context";
import { ICepResult } from "@/types/cep-result";
import { useState } from "react";
import { CepCard } from "./_components/cep-card";
import { FindZipCodeForm } from "./_components/find-zip-code-form";

export default function Home() {
  const [data, setData] = useState<ICepResult | undefined>();
  const { savedCEP } = useCepContext();
  return (
    <div className="container flex flex-col justify-center mx-auto min-h-dvh gap-8 py-8 px-7 lg:px-0">
      <div className="flex lg:flex-row flex-col items-center lg:justify-between w-full gap-16">
        <div className="space-y-2 lg:max-w-3xl w-full">
          <h1 className="lg:text-4xl text-2xl leading-normal">
            🔍 Descubra Tudo Sobre Seu CEP em Segundos!
          </h1>
          <span className="lg:text-lg text-base">
            Digite seu CEP e tenha acesso imediato a informações detalhadas
            sobre sua localização.
          </span>
          <FindZipCodeForm setData={setData} />
        </div>

        {data && (
          <div className="border rounded-md border-gray-600 bg-gray-800 px-4 py-6 space-y-3 flex flex-col justify-between lg:flex-1 w-full min-w-xs">
            <main className="space-y-4">
              <CepCard.Details data={data} />
            </main>

            <CepCard.SaveCep data={data} />
          </div>
        )}
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Lista de Ceps Salvos</h2>
        {savedCEP.length == 0 ? (
          <span className="text-xl font-medium">
            Nenhum CEP salvo no momento. Faça uma busca e salve os endereços
            para visualizá-los aqui.
          </span>
        ) : (
          <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
            {savedCEP.map((cep) => (
              <div
                key={cep.cep}
                className="border rounded-md border-gray-600 bg-gray-800 px-4 py-6 space-y-3 flex flex-col justify-between w-full min-w-xs"
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
    </div>
  );
}
