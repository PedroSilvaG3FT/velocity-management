import { Outlet } from "react-router-dom";
import VideoBG from "@/assets/video/hero-video.mp4";

export default function AuthenticationLayout() {
  return (
    <section className="w-full grid h-screen lg:grid-cols-2">
      <figure className="mobile:hidden tablet:hidden">
        <video
          loop
          muted
          autoPlay
          width="1920"
          className="h-screen w-full object-cover object-right dark:brightness-[0.5] dark:grayscale"
        >
          <source src={VideoBG} type="video/mp4" />
        </video>
      </figure>

      <article className="flex items-center justify-center py-12">
        <main className="mx-auto grid w-[350px] gap-6 ">
          <Outlet />
        </main>
      </article>
    </section>
  );
}
