import { useNavigate } from "react-router-dom";
import { Input } from "@/_shad/components/ui/input";
import { Label } from "@/_shad/components/ui/label";
import { Button } from "@/_shad/components/ui/button";
import AuthenticationPageNav from "../components/page-nav";
import Animate from "@/modules/@shared/components/utils/animate";

export default function SignUp() {
  const navigate = useNavigate();

  return (
    <Animate animation="fadeIn">
      <section>
        <AuthenticationPageNav
          title="Sign Up"
          subtitle="Create your credentials below to login to your account"
        />

        <form className="grid gap-4">
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

          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              required
              type="password"
              id="confirm-password"
              placeholder="**********"
            />
          </div>

          <Button type="submit" className="w-full">
            Create account
          </Button>

          <div className="mt-4 text-center text-sm">
            Have an account?{" "}
            <a onClick={() => navigate("/auth/sign-in")} className="underline">
              Sign in
            </a>
          </div>
        </form>
      </section>
    </Animate>
  );
}
