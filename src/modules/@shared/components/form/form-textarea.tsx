import {
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/_shad/components/ui/form";
import { Control } from "react-hook-form";
import { Textarea, TextareaProps } from "@/_shad/components/ui/textarea";

interface IAppFormTextareaProps extends TextareaProps {
  name: string;
  label: string;
  control: Control<any>;
}
export default function AppFormTextarea(props: IAppFormTextareaProps) {
  return (
    <FormField
      name={props.name}
      control={props.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <Textarea {...props} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
