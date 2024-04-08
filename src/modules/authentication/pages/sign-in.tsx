import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/_shad/components/ui/input";
import { Label } from "@/_shad/components/ui/label";
import { Button } from "@/_shad/components/ui/button";
import { AuthContext } from "@/contexts/auth.context";
import AuthenticationPageNav from "../components/page-nav";

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);

  const handleSubmit = () => {
    signIn().then(() => {
      navigate("/home");
    });
  };

  return (
    <section className="animate__animated animate__fadeIn">
      <AuthenticationPageNav
        title="Login"
        subtitle="Enter your email below to login to your account"
      />

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            required
            id="email"
            type="email"
            placeholder="Insert your e-mail"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            required
            id="password"
            type="password"
            placeholder="**********"
          />
        </div>

        <a
          onClick={() => navigate("/auth/forgot-password")}
          className="ml-auto inline-block text-sm underline"
        >
          Forgot your password?
        </a>

        <Button type="submit" className="w-full">
          Login
        </Button>

        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <a onClick={() => navigate("/auth/sign-up")} className="underline">
            Sign up
          </a>
        </div>
      </form>
    </section>
  );
}
