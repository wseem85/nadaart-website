import Button from "../ui/button";
import Form from "../ui/form";
import Input from "../ui/input";
import FormRow from "../ui/formRow";

import { Link } from "react-router-dom";

import { useState } from "react";
import useLogIn from "../hooks/useLogIn";
import styled from "styled-components";
import SpinnerMini from "./spinnerMini";
export const StyledLoginForm = styled(Form)`
  padding-top: 4rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
  margin-bottom: 6rem;
  box-shadow: var(--shadow-sm);
  background-color: var(--color-beige-300);
  & input {
    background-color: var(--color-grey-50);
  }
  & button {
    margin-left: auto;
    margin-right: auto;

    margin-top: 0;
    border-radius: 0;
  }
  @media screen and (min-width: 800px) {
    display: flex;
    flex-direction: column;
  }
`;
export default function LogInForm() {
  const [email, setEmail] = useState("engwseem4@gmail.com");
  const [password, setPassword] = useState("qwerty1234");

  const { mutate, isPending } = useLogIn();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    mutate(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <StyledLoginForm onSubmit={handleSubmit}>
      <FormRow labelWidth="110px" label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
      </FormRow>
      <FormRow labelWidth="110px" label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />
      </FormRow>
      <FormRow>
        <Button size="large" disabled={isPending} style={{ minWidth: "10rem" }}>
          {!isPending ? "Log in" : <SpinnerMini $color="#fff" />}
        </Button>
      </FormRow>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1.3rem",
        }}
      >
        Don&apos;t have an account ?
        <Link to="/signup">
          <span
            style={{
              color: "var(--color-brand-300)",
              textDecoration: "underline",
              display: "inline-block",
              marginLeft: "1rem",
            }}
          >
            Create One
          </span>
        </Link>
      </div>
    </StyledLoginForm>
  );
}
