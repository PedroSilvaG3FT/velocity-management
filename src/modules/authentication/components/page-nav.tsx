interface IAuthenticationPageNavProps {
  title: string;
  subtitle: string;
}
export default function AuthenticationPageNav(
  props: IAuthenticationPageNavProps
) {
  return (
    <nav className="grid gap-2 text-center mb-8">
      <h1 className="text-3xl font-bold">{props.title}</h1>
      <p className="text-balance text-muted-foreground">{props.subtitle}</p>
    </nav>
  );
}
