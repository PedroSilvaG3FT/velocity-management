import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/_shad/components/ui/button";
import { AuthContext } from "@/contexts/auth.context";
import AuthenticationPageNav from "../components/page-nav";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormContainer } from "@/_shad/components/ui/form";
import AppFormInput from "@/modules/@shared/components/form/form-input";
import Animate from "@/modules/@shared/components/utils/animate";

const formSchema = z.object({
  email: z.string().min(1, "Required field"),
  password: z.string().min(1, "Required field"),
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
      .then(() => navigate("/home"))
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
              name="password"
              type="password"
              label="Password"
              control={form.control}
              placeholder="**********"
            />

            <a
              onClick={() => navigate("/auth/forgot-password")}
              className="ml-auto inline-block text-sm underline"
            >
              Esqueceu a senha?
            </a>

            <Button type="submit" className="w-full">
              Entrar
            </Button>

            <div className="mt-4 text-center text-sm">
              Não possui conta?{" "}
              <a
                onClick={() => navigate("/auth/sign-up")}
                className="underline"
              >
                Criar agora
              </a>
            </div>
          </form>
        </FormContainer>
      </section>
    </Animate>
  );
}
