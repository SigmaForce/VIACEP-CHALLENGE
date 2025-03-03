"use client";
import { Button } from "@/components/Button";
import { InputField, InputIcon, InputRoot } from "@/components/Input";
import { getCep } from "@/http/get-cep";
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

export const FindZipCodeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async ({ zipCode }: FormSchema) => {
    const cepDetails = await getCep(zipCode);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-2 w-full mt-4"
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
        <Button type="submit" className="flex gap-2 self-end">
          <MagnifyingGlass className="size-5" weight="bold" />
          Buscar
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
