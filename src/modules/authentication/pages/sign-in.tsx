import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/_shad/components/ui/button";
import { AuthContext } from "@/contexts/auth.context";
import AuthenticationPageNav from "../components/page-nav";
import Animate from "@/modules/@shared/components/utils/animate";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormContainer } from "@/_shad/components/ui/form";
import AppFormInput from "@/modules/@shared/components/form/form-input";

const formSchema = z.object({
  email: z.string().min(1, "Campo obrigatório"),
  password: z.string().min(1, "Campo obrigatório"),
});

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signIn(values.email, values.password)
      .then(() => navigate("/"))
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Animate animation="fadeIn">
      <section>
        <AuthenticationPageNav
          title="Login"
          subtitle="Insira os seus dados para o acesso"
        />

        <FormContainer {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <AppFormInput
              name="email"
              type="email"
              label="Email"
              control={form.control}
              placeholder="Insira o seu e-mail"
            />

            <AppFormInput
              label="Senha"
              name="password"
              type="password"
              control={form.control}
              placeholder="**********"
            />

            <Button type="submit" className="w-full">
              Entrar
            </Button>

            <div className="mt-4 text-center text-sm">
              <a
                onClick={() => navigate("/auth/sign-in-methods")}
                className="underline cursor-pointer"
              >
                Ver opções de login
              </a>
            </div>
          </form>
        </FormContainer>
      </section>
    </Animate>
  );
}
