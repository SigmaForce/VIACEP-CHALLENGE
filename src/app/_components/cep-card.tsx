import { Button } from "@/components/Button";
import { useCepContext } from "@/hooks/use-cep-context";

import { ICepResult } from "@/types/cep-result";
import { FloppyDisk, Trash } from "@phosphor-icons/react/dist/ssr";

type CepDetailsProps = {
  data: ICepResult;
};

const CepDetails = ({ data }: CepDetailsProps) => {
  return (
    <div>
      <h3 className="text-lg font-bold">Detalhes do CEP</h3>
      <div className="flex flex-col">
        <CepDetail label="CEP" value={data.cep} />
        {data.logradouro && (
          <CepDetail label="Logradouro" value={data.logradouro} />
        )}
        <CepDetail label="Bairro" value={data.bairro} />
        <CepDetail
          label="Endereço"
          value={`${data.localidade} - ${data.estado} - ${data.uf}`}
        />
        <CepDetail label="Região" value={data.regiao} />
        {data.complemento && (
          <CepDetail label="Complemento" value={data.complemento} />
        )}
      </div>
    </div>
  );
};

const CepDetail = ({ label, value }: { label: string; value: string }) => (
  <p>
    <span className="text-sm font-medium">{label}:</span> {value}
  </p>
);

const SaveCepButton = ({ data }: CepDetailsProps) => {
  const { saveCep } = useCepContext();
  return (
    <footer className="self-end justify-end">
      <Button onClick={() => saveCep(data)}>
        <FloppyDisk className="size-5" />
        Salvar
      </Button>
    </footer>
  );
};

type RemoveCepButtonProps = {
  cep: string;
};

const RemoveCepButton = ({ cep }: RemoveCepButtonProps) => {
  const { removeCep } = useCepContext();
  return (
    <footer className="self-end justify-end">
      <Button
        onClick={() => removeCep(cep)}
        className="bg-red-500 hover:bg-red-600"
      >
        <Trash className="size-5" />
        Remover
      </Button>
    </footer>
  );
};

export const CepCard = {
  Details: CepDetails,
  SaveCep: SaveCepButton,
  RemoveCep: RemoveCepButton,
};
