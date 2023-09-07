import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  title: string;
  url: string;
};

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("title")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue={""} {...(register("title"), { required: true })} />

      <input defaultValue={""} {...register("url", { required: true })} />

      {/* errors will return when field validation fails  */}
      {errors.url && errors.title && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
