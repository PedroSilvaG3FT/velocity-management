import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/_shad/components/ui/button";
import { FormContainer } from "@/_shad/components/ui/form";
import Animate from "@/modules/@shared/components/utils/animate";
import AppFormInput from "@/modules/@shared/components/form/form-input";

const formSchema = z.object({
  jwk: z.string(),
  scih: z.string(),
  config: z.string(),
});

export default function Settings() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { jwk: "", scih: "", config: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("CONFIG VALUES : ", values);
  }

  return (
    <section>
      <h2 className="mb-6 text-lg font-bold">Configurações</h2>
      <Animate animation="fadeIn">
        <FormContainer {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-2/4 mobile:w-full tablet:full"
          >
            <AppFormInput
              name="jwk"
              label="JWK"
              control={form.control}
              placeholder="Configuração JWK"
            />

            <AppFormInput
              name="scih"
              label="SCIH"
              control={form.control}
              placeholder="Configuração SCIH"
            />

            <AppFormInput
              name="config"
              label="Config"
              control={form.control}
              placeholder="Configuração config"
            />

            <Button type="submit">Salvar</Button>
          </form>
        </FormContainer>
      </Animate>
    </section>
  );
}
