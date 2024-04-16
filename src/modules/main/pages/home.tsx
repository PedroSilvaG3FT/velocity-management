import { Button } from "@/_shad/components/ui/button";
import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/_shad/components/ui/card";
import { Progress } from "@/_shad/components/ui/progress";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormContainer } from "@/_shad/components/ui/form";
import AppFormInput from "@/modules/@shared/components/form/form-input";
import AppFormSwitch from "@/modules/@shared/components/form/form-switch";
import AppFormSelect from "@/modules/@shared/components/form/form-select";
import AppFormCheckbox from "@/modules/@shared/components/form/form-checkbox";
import AppFormTextarea from "@/modules/@shared/components/form/form-textarea";
import AppFormRadioGroup from "@/modules/@shared/components/form/form-radio-group";
import AppFormDatepicker from "@/modules/@shared/components/form/form-datepicker";
import { IFormOption } from "@/modules/@shared/components/_interfaces/form-option.interface";

const formSchema = z.object({
  input: z.string(),
  select: z.number(),
  switch: z.boolean(),
  textarea: z.string(),
  combobox: z.string(),
  datepicker: z.date(),
  checkbox: z.boolean(),
  radioGroup: z.string(),
  datepickerRange: z.object({ to: z.date(), from: z.date() }),
});

export default function Home() {
  const defaultOptions: IFormOption[] = [
    { label: `Option 1`, value: "1" },
    { label: `Option 2`, value: "2" },
    { label: `Option 3`, value: "3" },
    { label: `Option 4`, value: "4" },
    { label: `Option 5`, value: "5" },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
      select: 0,
      textarea: "",
      combobox: "",
      radioGroup: "",
      switch: false,
      checkbox: false,
      datepickerRange: {},
      datepicker: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Values :: ", values);
  }

  return (
    <section>
      <h3 className="mb-4">Dahsboard</h3>

      <section className="grid grid-cols-2 gap-8 mb-8">
        <FormContainer {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <button type="submit">Submit</button>
            <AppFormInput
              name="input"
              label="Input example"
              control={form.control}
              placeholder="Input example"
            />

            <AppFormDatepicker
              name="datepicker"
              control={form.control}
              label="Datepicker example"
            />

            <AppFormDatepicker
              mode="range"
              name="datepickerRange"
              control={form.control}
              label="Datepicker Range example"
            />

            <AppFormTextarea
              name="textarea"
              label="Textarea"
              control={form.control}
              placeholder="Textarea example"
            />

            <AppFormSelect
              name="select"
              label="Select"
              control={form.control}
              options={defaultOptions}
              placeholder="Select example"
            />

            <AppFormCheckbox
              name="checkbox"
              control={form.control}
              label="Checkbox example"
            />

            <AppFormSwitch
              name="switch"
              control={form.control}
              label="Switch example"
            />

            <AppFormRadioGroup
              name="radioGroup"
              control={form.control}
              options={defaultOptions}
              label="Radio Group example"
            />
          </form>
        </FormContainer>
      </section>

      <section className="w-full grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
          <CardHeader className="pb-3">
            <CardTitle>Your Orders</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Introducing Our Dynamic Orders Dashboard for Seamless Management
              and Insightful Analysis.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>Create New Order</Button>
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription>This Week</CardDescription>
            <CardTitle className="text-4xl">$1,329</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +25% from last week
            </div>
          </CardContent>
          <CardFooter>
            <Progress value={25} aria-label="25% increase" />
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-2">
          <CardHeader className="pb-2">
            <CardDescription>This Month</CardDescription>
            <CardTitle className="text-4xl">$5,329</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +10% from last month
            </div>
          </CardContent>
          <CardFooter>
            <Progress value={12} aria-label="12% increase" />
          </CardFooter>
        </Card>
      </section>
    </section>
  );
}
