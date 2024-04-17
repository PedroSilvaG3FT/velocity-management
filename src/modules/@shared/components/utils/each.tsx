import { ReactNode, Children } from "react";

interface IEachProps<T> {
  render: (item: T, index: number) => ReactNode;
  data: T[];
}

export default function Each<T>({ render, data }: IEachProps<T>): ReactNode {
  return Children.toArray(data.map((item, index) => render(item, index)));
}
