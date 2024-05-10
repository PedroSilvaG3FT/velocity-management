import { useContext } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/_shad/components/ui/card";
import { AuthContext } from "@/contexts/auth.context";
import AuthenticationPageNav from "../components/page-nav";
import Each from "@/modules/@shared/components/utils/each";
import Animate from "@/modules/@shared/components/utils/animate";

import GOLLogo from "@/assets/images/login/gol.svg";
import ItauLogo from "@/assets/images/login/itau.png";
import CBYKLogo from "@/assets/images/login/cbyk.svg";
import CrefisaLogo from "@/assets/images/login/crefisa.png";

export default function SignInMethods() {
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);

  const methods = [
    { title: "GOL", image: GOLLogo },
    { title: "CBYK", image: CBYKLogo },
    { title: "Itaú", image: ItauLogo },
    { title: "Crefisa", image: CrefisaLogo },
  ];

  const handleSelect = () => {
    signIn("email@mock.com", "")
      .then(() => navigate("/"))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Animate animation="fadeIn">
      <section>
        <button onClick={() => navigate("/auth/sign-in")}>
          <ArrowLeft />
        </button>

        <AuthenticationPageNav
          title="Métodos Login"
          subtitle="Selecione o método para acessar o portal"
        />

        <section className="grid gap-2 grid-cols-2">
          <Each
            data={methods}
            render={(item) => (
              <Card
                onClick={handleSelect}
                className="p-4 flex flex-col items-center justify-center cursor-pointer transition-transform duration-500 hover:scale-95"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-8 object-contain"
                />
              </Card>
            )}
          />
        </section>
      </section>
    </Animate>
  );
}
