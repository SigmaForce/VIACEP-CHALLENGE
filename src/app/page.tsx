import { CepSearch } from "./_components/cep-search";
import { ListSavedCeps } from "./_components/list-saved-ceps";

export default function Home() {
  return (
    <div className="container flex flex-col justify-center mx-auto min-h-dvh gap-8 py-8 px-7 lg:px-0">
      <CepSearch />
      <ListSavedCeps />
    </div>
  );
}
