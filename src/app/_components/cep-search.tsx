"use client";
import { ICepResult } from "@/types/cep-result";
import { useState } from "react";
import { CepCard } from "./cep-card";
import { FindZipCodeForm } from "./find-zip-code-form";

export const CepSearch = () => {
  const [data, setData] = useState<ICepResult | undefined>();
  return (
    <div className="flex lg:flex-row flex-col items-center lg:justify-between w-full gap-16">
      <div className="space-y-2 lg:max-w-3xl w-full">
        <h1 className="lg:text-4xl text-2xl leading-normal">
          🔍 Descubra Tudo Sobre Seu CEP em Segundos!
        </h1>
        <span className="lg:text-lg text-base">
          Digite seu CEP e tenha acesso imediato a informações detalhadas sobre
          sua localização.
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
  );
};
