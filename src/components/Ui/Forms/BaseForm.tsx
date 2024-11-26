import React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";

type TFormConfig<T extends FieldValues = FieldValues> = Omit<
  UseFormProps<T>,
  "resolver" | "defaultValues"
> & {
  resolver?: UseFormProps<T>["resolver"];
  defaultValues?: UseFormProps<T>["defaultValues"];
};

type TFormProps<T extends FieldValues = FieldValues> = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<T>;
} & TFormConfig<T>;

const BaseForm = <T extends FieldValues>({
  children,
  onSubmit,
  resolver,
  defaultValues,
  ...rest
}: TFormProps<T>) => {
  const formConfig: UseFormProps<T> = {
    resolver,
    defaultValues,
    ...rest,
  };

  const methods: UseFormReturn<T> = useForm<T>(formConfig);
  const { handleSubmit, reset } = methods;

  const submit: SubmitHandler<T> = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default BaseForm;
