"use client";
import { Button } from "@/components/Button";
import { InputField, InputIcon, InputRoot } from "@/components/Input";
import { useCepContext } from "@/hooks/use-cep-context";
import { ICepResult } from "@/types/cep-result";
import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlass, MapPin } from "@phosphor-icons/react/dist/ssr";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  zipCode: z
    .string()
    .regex(
      /^\d{5}-?\d{3}$/,
      "CEP inválido. Use o formato 12345-678 ou 12345678."
    )
    .transform((cep) => cep.replace(/\D/g, "")),
});

type FormSchema = z.infer<typeof formSchema>;

type FindZipCodeFormProps = {
  setData: React.Dispatch<React.SetStateAction<ICepResult | undefined>>;
};

export const FindZipCodeForm = ({ setData }: FindZipCodeFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const { fetchCep } = useCepContext();

  const onSubmit = async ({ zipCode }: FormSchema) => {
    const cepDetails = await fetchCep(zipCode);

    if (cepDetails.error)
      setError("zipCode", {
        type: "manual",
        message: cepDetails.error,
      });
    if (cepDetails.error == null && cepDetails.data) setData(cepDetails.data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex lg:flex-row flex-col gap-2 w-full mt-4"
      >
        <div className="flex-1">
          <label htmlFor="zipCode">CEP</label>
          <InputRoot error={!!errors.zipCode}>
            <InputIcon>
              <MapPin className="size-5" />
            </InputIcon>

            <InputField placeholder="Digite um Cep" {...register("zipCode")} />
          </InputRoot>
        </div>
        <Button type="submit" className="lg:self-end" disabled={isSubmitting}>
          <MagnifyingGlass className="size-5" weight="bold" />
          {isSubmitting ? "Buscando..." : "Buscar"}
        </Button>
      </form>
      {errors?.zipCode && (
        <p className="text-red-500 text-xs font-semibold">
          {errors.zipCode.message}
        </p>
      )}
    </>
  );
};
