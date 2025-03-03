import { Button } from "@/components/Button";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

export default function Home() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-dvh">
      <div className="space-y-3 max-w-2xl">
        <h1 className="text-4xl leading-normal">
          🔍 Descubra Tudo Sobre Seu CEP em Segundos!
        </h1>
        <span className="text-lg">
          Digite seu CEP e tenha acesso imediato a informações detalhadas sobre
          sua localização.
        </span>

        <div className="flex gap-2 w-full mt-4">
          <input type="text" placeholder="Digite um CEP" className="w-full" />

          <Button className="flex gap-2 ">
            <MagnifyingGlass size={20} weight="bold" />
            Buscar
          </Button>
        </div>
      </div>
    </div>
  );
}
