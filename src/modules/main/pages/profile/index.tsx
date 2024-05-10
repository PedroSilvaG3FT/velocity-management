import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import authStore from "@/store/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/_shad/components/ui/button";
import { FormContainer } from "@/_shad/components/ui/form";
import AppFormInput from "@/modules/@shared/components/form/form-input";

const formPersonalDataSchema = z.object({
  name: z.string(),
  email: z.string(),
});

const formPasswordSchema = z.object({
  password: z.string(),
  currentPassword: z.string(),
  passwordConfirmation: z.string(),
});

export default function Profile() {
  const _authStore = authStore((state) => state);
  const formPersonalData = useForm<z.infer<typeof formPersonalDataSchema>>({
    resolver: zodResolver(formPersonalDataSchema),
  });

  const formPassword = useForm<z.infer<typeof formPasswordSchema>>({
    resolver: zodResolver(formPasswordSchema),
  });

  function onSubmitPersonalData(
    values: z.infer<typeof formPersonalDataSchema>
  ) {
    console.log("PERSONAL DATA FORM VALUES : ", values);
  }

  function onSubmitPassword(values: z.infer<typeof formPasswordSchema>) {
    console.log("PASSWORD FORM VALUES : ", values);
  }

  useEffect(() => {
    formPersonalData.setValue("name", _authStore.user.name);
    formPersonalData.setValue("email", _authStore.user.email);
  }, []);

  return (
    <section>
      <h2 className="mb-6 text-lg font-bold">Meu Perfil</h2>

      <section className="grid grid-cols-2 mobile:grid-cols-1">
        <FormContainer {...formPersonalData}>
          <form
            onSubmit={formPersonalData.handleSubmit(onSubmitPersonalData)}
            className="space-y-4 px-4 mobile:px-0"
          >
            <h5 className="font-semibold">Dados pessoais</h5>

            <AppFormInput
              name="name"
              label="Nome"
              placeholder="Atualizar nome"
              control={formPersonalData.control}
            />

            <AppFormInput
              readOnly
              disabled
              name="email"
              label="Email"
              placeholder="Insira o seu e-mail"
              control={formPersonalData.control}
            />

            <Button type="submit">Salvar dados pessoais</Button>
          </form>
        </FormContainer>

        <FormContainer {...formPassword}>
          <form
            onSubmit={formPassword.handleSubmit(onSubmitPassword)}
            className="space-y-4 border-l px-4 mobile:px-0 mobile:border-none"
          >
            <h5 className="font-semibold">Atualizar senha</h5>

            <AppFormInput
              type="password"
              label="Senha atual"
              name="currentPassword"
              control={formPassword.control}
              placeholder="Insira senha atual"
            />

            <AppFormInput
              name="password"
              type="password"
              label="Nova Senha"
              control={formPassword.control}
              placeholder="Insira a sua nova senha"
            />

            <AppFormInput
              type="password"
              name="passwordConfirmation"
              label="Confirmar nova senha"
              control={formPassword.control}
              placeholder="Confirme a sua nova senha"
            />

            <Button type="submit">Atualizar senha</Button>
          </form>
        </FormContainer>
      </section>
    </section>
  );
}
