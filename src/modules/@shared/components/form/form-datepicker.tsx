import { format } from "date-fns";
import { cn } from "@/_shad/lib/utils";
import { Control } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/_shad/components/ui/button";
import { Calendar } from "@/_shad/components/ui/calendar";
import {
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/_shad/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/_shad/components/ui/popover";
interface IAppFormDatePickerProps {
  name: string;
  label: string;
  placeholder?: string;
  control: Control<any>;
  mode?: "single" | "range";
  disabledDates?: (date: Date) => boolean;
}

export default function AppFormDatePicker(props: IAppFormDatePickerProps) {
  const {
    name,
    label,
    control,
    placeholder,
    disabledDates,
    mode = "single",
  } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {mode !== "range" ? (
                    <>
                      {field.value ? (
                        format(field.value, "dd/MM/yyyy")
                      ) : (
                        <span>{placeholder}</span>
                      )}
                    </>
                  ) : (
                    <>
                      {field?.value?.from ? (
                        field?.value.to ? (
                          <>
                            {format(field?.value.from, "dd/MM/yyyy")} -{" "}
                            {format(field?.value.to, "dd/MM/yyyy")}
                          </>
                        ) : (
                          format(field?.value.from, "dd/MM/yyyy")
                        )
                      ) : (
                        <span>{placeholder}</span>
                      )}
                    </>
                  )}

                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode={mode}
                initialFocus
                selected={field.value}
                onSelect={field.onChange}
                disabled={disabledDates}
              />
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
