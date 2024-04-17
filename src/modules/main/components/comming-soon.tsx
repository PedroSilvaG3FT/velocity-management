import {
  Typewriter,
  typewriterBuildWords,
} from "@/modules/@shared/components/aceternity/typewriter";

interface ICommingSoonProps {
  title: string;
  description: string;
}

export default function CommingSoon(props: ICommingSoonProps) {
  const words = typewriterBuildWords(props.title);

  return (
    <article className="w-ful h-screen flex gap-4 flex-col items-center justify-center">
      <Typewriter words={words} />
      <p>{props.description}</p>
    </article>
  );
}
