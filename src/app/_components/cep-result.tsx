import { Button } from "@/components/Button";
import { useCepContext } from "@/hooks/use-cep-context";

import { ICepResult } from "@/types/cep-result";
import { FloppyDisk } from "@phosphor-icons/react/dist/ssr";

type CepResultProps = {
  data: ICepResult;
};

export const CepResults = ({ data }: CepResultProps) => {
  const { saveCep } = useCepContext();

  const handleSaveCep = (data: ICepResult) => {
    saveCep(data);
  };

  return (
    <div className="border rounded-md border-gray-600 bg-gray-800 px-4 py-6 space-y-3">
      <main className="space-y-4">
        <div>
          <h3 className="text-lg font-bold">Detalhes do CEP</h3>
          <div className="flex flex-col">
            <p>
              <span className="text-sm font-medium">CEP:</span> {data.cep}
            </p>

            {data.logradouro && (
              <p>
                <span className="text-sm font-medium">Logradouro:</span>{" "}
                {data.logradouro}
              </p>
            )}

            <p>
              <span className="text-sm font-medium">Bairro:</span> {data.bairro}
            </p>
            <p className="">
              <span className="text-sm font-medium">Endereço:</span>{" "}
              {data.localidade} - {data.estado} - {data.uf}
            </p>
            <p>
              <span className="text-sm font-medium">Região:</span> {data.regiao}
            </p>
            {data.complemento && (
              <p>
                <span className="text-sm font-medium">Complemento:</span>{" "}
                {data.complemento}
              </p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold">Detalhes Adicionais</h3>
          <div className="flex flex-col">
            <p>
              <span className="text-sm font-medium">Código IBGE:</span>{" "}
              {data.ibge}
            </p>
            <p>
              <span className="text-sm font-medium">Siafi:</span> {data.siafi}
            </p>
            {data.gia && <p>Gia: {data.gia}</p>}
            <p>
              <span className="text-sm font-medium">DDD:</span> {data.ddd}
            </p>
          </div>
        </div>
      </main>
      <footer>
        <Button onClick={() => handleSaveCep(data)}>
          <FloppyDisk className="size-5" />
          Salvar
        </Button>
      </footer>
    </div>
  );
};
