import { useForm } from "react-hook-form";

import Button from "../ui/button";

import Input from "../ui/input";
import Error from "../ui/error";
import FormRow from "../ui/formRow";
import { StyledLoginForm as StyledSignupForem } from "./logInForm";
import { signup } from "../services/apiAuth";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import PageContentContainer from "./StyledPageContentContainer";
import SpinnerMini from "./spinnerMini";

function SignupForm() {
  const { register, handleSubmit, getValues, formState } = useForm();
  const errors = formState.errors;

  console.log(errors);
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signup({ email, password, fullName }),
    onSuccess: () => {
      toast.success("Your Account is created successfully");
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      toast.error("Email or Password are incorrect");
      console.error(err);
    },
  });

  const navigate = useNavigate();
  function onSubmit(data) {
    const { email, password, fullName } = data;
    if (!email || !password || !fullName) return;
    mutate(
      { email, password, fullName },
      {
        // onSettled: () => {
        //   navigate("login");
        // },
      }
    );
  }

  return (
    <PageContentContainer>
      {isError ? <Error message={error.message} /> : null}
      <StyledSignupForem onSubmit={handleSubmit(onSubmit)}>
        <FormRow
          labelWidth="150px"
          label="Full Name"
          error={errors?.fullName?.message}
        >
          <Input
            type="text"
            id="fullName"
            // This makes this form better for password managers
            autoComplete="username"
            disabled={isPending}
            {...register("fullName", {
              required: "this feild is required",
            })}
          />
          {/* {errors.fullName && <p>{errors.fullName.message}</p>} */}
        </FormRow>
        <FormRow
          labelWidth="150px"
          label="Email address"
          error={errors?.email?.message}
        >
          <Input
            type="email"
            id="email"
            // This makes this form better for password managers
            autoComplete="username"
            disabled={isPending}
            {...register("email", {
              required: "this feild is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email format",
              },
            })}
          />
        </FormRow>
        <FormRow
          labelWidth="150px"
          label="Password"
          error={errors?.password?.message}
        >
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            disabled={isPending}
            {...register("password", {
              required: "this feild is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
          />
        </FormRow>

        <FormRow
          labelWidth="150px"
          label="Confirm Password"
          error={errors?.confirmedPassword?.message}
        >
          <Input
            type="password"
            id="confirmedPassword"
            autoComplete="confirmed-password"
            disabled={isPending}
            {...register("confirmedPassword", {
              required: "this feild is required",
              validate: (value) =>
                getValues().password === value || "Passwords do not match",
            })}
          />
        </FormRow>
        <FormRow labelWidth="150px">
          <Button size="large">
            {/* <SpinnerMini /> */}
            {!isPending ? (
              "Create"
            ) : (
              <SpinnerMini $color="var(--color-grey-50)" />
            )}
          </Button>
        </FormRow>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1.3rem",
          }}
        >
          Already have an account ?
          <Link to="/login">
            <span
              style={{
                color: "var(--color-brand-300)",
                textDecoration: "underline",
                display: "inline-block",
                marginLeft: "1rem",
              }}
            >
              Log in
            </span>
          </Link>
        </div>
      </StyledSignupForem>
    </PageContentContainer>
  );
}

export default SignupForm;
