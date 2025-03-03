import { FindZipCodeForm } from "./_components/FindZipCodeForm";

export default function Home() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-dvh">
      <div className="space-y-2 max-w-2xl">
        <h1 className="text-4xl leading-normal">
          🔍 Descubra Tudo Sobre Seu CEP em Segundos!
        </h1>
        <span className="text-lg">
          Digite seu CEP e tenha acesso imediato a informações detalhadas sobre
          sua localização.
        </span>
        <FindZipCodeForm />
      </div>
    </div>
  );
}
