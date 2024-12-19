import { useNavigate } from "react-router-dom";
import PageContentContainer from "../ui/StyledPageContentContainer";
import Spinner from "../ui/spinner";
import styled from "styled-components";
import Button from "../ui/button";
import Paragraph from "../ui/paragraph";
import useCurrentUser from "../hooks/useCurrentUser";

import Form from "../ui/form";
import FormRow from "../ui/formRow";
import Input from "../ui/input";
import FileInput from "../ui/fileInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateCurrentUser,
  updateCurrentUserPassword,
} from "../services/apiAuth";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import SpinnerMini from "../ui/spinnerMini";
import Stack from "../ui/stack";
import useWindowWidth from "../hooks/useWindowWidth";
import Heading from "../ui/heading";
import SubHeading from "../ui/styledSubHeading";
import SuperUserSection from "../ui/superUserSection";
const StyledHeading = styled.h3`
  color: var(--color-grey-500);
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.2px;

  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 1.5rem;
  gap: 1rem;
  justify-content: space-between;
  @media screen and (min-width: 300px) {
    flex-direction: row;
  }
`;

const StyledUpdateUserInfoForm = styled(Form)`
  background-color: var(--color-beige-300);
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  max-width: unset;
  gap: 2rem;
  & input {
    background-color: var(--color-grey-50);
  }
  & input[type="file"] {
    background-color: transparent;
    box-shadow: none;
    border-bottom: none;
  }
  & button {
    padding: 0.3rem 0.4rem;
  }
  & button[type="submit"] {
    width: 140px;
  }
  & button[type="reset"] {
    width: 70px;
    background-color: var(--color-grey-50);
    border-color: var(--color-grey-300);
    color: var(--color-grey-500);
  }
`;

export default function User() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, fetchStatus, user, isAuthenticated } = useCurrentUser();

  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    formState: formState1,
  } = useForm({ defaultValues: { ...user?.user_metadata } });
  const { errors } = formState;
  const { errors: errors1 } = formState1;

  const { windowWidth } = useWindowWidth();

  const { mutate: updateUser, isPending: isUpdatingUserData } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User account successfully updated");
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });
  const { mutate: updateUserPassword, isPending: isUpdatingUserPassword } =
    useMutation({
      mutationFn: updateCurrentUserPassword,
      onSuccess: ({ user }) => {
        toast.success("User password successfully updated");
        queryClient.setQueryData(["user"], user);
      },
      onError: (err) => {
        console.error(err);
        toast.error(err.message);
      },
    });

  function onSubmit1(data) {
    const { fullName } = data;
    const avatarType = typeof data.avatar === "string";
    const avatar =
      avatarType || data.avatar?.length === 0
        ? user.user_metadata.avatar
        : data.avatar[0];
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {},
      }
    );
  }
  function onSubmit({ password }) {
    updateUserPassword(
      { password },
      {
        onSuccess: () => {
          reset();
          // onCloseModal?.();
        },
      }
    );
  }
  // console.log(user.user_metadata.avatar);
  if (isPending || fetchStatus === "fetching") return <Spinner />;
  if (!user || !isAuthenticated)
    return (
      <PageContentContainer>
        <StyledHeading>You Are Not Signed In!</StyledHeading>
        <Paragraph>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est enim
          dolor quos illum sit totam, praesentium harum vitae, consequuntur quod
          provident. Sint eaque nisi sunt rerum magnam, mollitia accusamus sed.
          Laboriosam pariatur at quis?{" "}
        </Paragraph>
        <SubHeading>
          You Have already an account ?{" "}
          <Button variation="plainlink" onClick={() => navigate("/login")}>
            Log in
          </Button>
        </SubHeading>
        <Paragraph>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est enim
          dolor quos illum sit totam, praesentium harum vitae, consequuntur quod
          provident. Sint eaque nisi sunt rerum magnam, mollitia accusamus sed.
          Laboriosam pariatur at quis?{" "}
        </Paragraph>
        <SubHeading>
          You Do not have an account ?{" "}
          <Button variation="plainlink" onClick={() => navigate("/signup")}>
            {" "}
            Create Account
          </Button>
        </SubHeading>
        <Paragraph>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est enim
          dolor quos illum sit totam, praesentium harum vitae, consequuntur quod
          provident. Sint eaque nisi sunt rerum magnam, mollitia accusamus sed.
          Laboriosam pariatur at quis?{" "}
        </Paragraph>
      </PageContentContainer>
    );

  if (user)
    return (
      <PageContentContainer maxwidth="1000px">
        <StyledHeading>
          Welcome back ,
          <span style={{ color: "var(--color-brand-700)" }}>
            {user.user_metadata.fullName}
          </span>
        </StyledHeading>

        {user.user_metadata.is_superuser ? <SuperUserSection /> : null}
        <Stack minwidth="100%">
          <SubHeading
            color="var(--color-brand-700)"
            textalign="center"
            minwidth="100%"
          >
            Update User Info
          </SubHeading>
          <Stack
            direction={windowWidth <= 800 ? "vertical" : "rowReverse"}
            spacing={windowWidth <= 800 ? "wide" : "extremelyWide"}
            paddingY="1rem"
            paddingX="1rem"
            borderRadius="10px"
            minwidth="100%"
          >
            <div
              style={{
                alignSelf: "stretch",
                bgColor: "transparent",
                minWidth: "30%",
              }}
            >
              <Stack
                direction="vertical"
                spacing={windowWidth < 800 ? "wide" : "extremelyWide"}
                justify="center"
                height="100%"
              >
                <Stack direction="horizental">
                  <span>🟢</span>
                  <Heading as="h4">You Can Change Your User name </Heading>
                </Stack>
                <Stack direction="horizental">
                  <span>🟢</span>
                  <Heading as="h4"> You Can Add or Change Your Avatar</Heading>
                </Stack>
                <Stack direction="horizental">
                  <span>🔴</span>
                  <Heading as="h4">
                    Changing Your Email Address is not allowed
                  </Heading>
                </Stack>
              </Stack>
            </div>
            <StyledUpdateUserInfoForm
              noValidate
              onSubmit={handleSubmit1(onSubmit1)}
            >
              <FormRow labelWidth="110px" label="Email address">
                <Input
                  id="email"
                  type="text"
                  {...register1("email", {
                    disabled: true,
                  })}
                  value={user.email}
                  disabled
                />
              </FormRow>

              <FormRow
                labelWidth="110px"
                label="Full name"
                error={errors1?.fullName?.message}
              >
                <Input
                  type="text"
                  id="fullName"
                  disabled={isUpdatingUserData}
                  {...register1("fullName", {
                    required: "this field is required",
                  })}
                />
              </FormRow>

              <FormRow label="Avatar image">
                <FileInput
                  id="avatar"
                  accept="image/*"
                  // onChange={(e) => setAvatar(e.target.files[0])}
                  disabled={isUpdatingUserData}
                  {...register1("avatar", {})}
                />
              </FormRow>

              <StyledButtonsContainer>
                <Button
                  type="reset"
                  size="medium"
                  variation="outlined"
                  disabled={isUpdatingUserData}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  size="medium"
                  disabled={isUpdatingUserData}
                  style={{ minWidth: "14rem" }}
                >
                  {!isUpdatingUserData ? (
                    "Update Info"
                  ) : (
                    <SpinnerMini $color="var(--color-grey-50)" />
                  )}
                </Button>
              </StyledButtonsContainer>
            </StyledUpdateUserInfoForm>
          </Stack>
        </Stack>
        <div
          style={{
            marginBottom: "2rem",
            marginTop: "2rem",
            height: "1px",
            backgroundColor: "var(--color-grey-300)",
          }}
        />
        <Stack>
          <SubHeading
            color="var(--color-brand-700)"
            textalign="center"
            minwidth="100%"
          >
            Update Your Pasdword
          </SubHeading>
          <Stack
            direction={windowWidth <= 800 ? "vertical" : "rowReverse"}
            spacing={windowWidth <= 800 ? "wide" : "wider"}
            // bgColor="var(--color-beige-300)"
            paddingy="1rem"
            paddingx="1rem"
            borderradius="10px"
            minwidth="100%"
          >
            <div
              style={{
                alignSelf: "stretch",
                bgColor: "transparent",
                minWidth: "30%",
              }}
            >
              <Stack
                direction="vertical"
                spacing={windowWidth < 800 ? "wide" : "extremelyWide"}
                justify="center"
                height="100%"
              >
                <Stack direction="horizental">
                  <span
                    style={{ display: "inline-block", marginRight: "0.5rem" }}
                  >
                    🟢
                  </span>
                  <Heading as="h4">You Can Change Your Passowrd</Heading>
                </Stack>
                <Stack direction="horizental">
                  <span
                    style={{ display: "inline-block", marginRight: "0.5rem" }}
                  >
                    🟢
                  </span>
                  <Heading as="h4">
                    Passowrd Should Be at Least 8 Characters{" "}
                  </Heading>
                </Stack>
                <Stack direction="horizental">
                  <span
                    style={{ display: "inline-block", marginRight: "0.5rem" }}
                  >
                    🟢
                  </span>
                  <Heading as="h4">
                    Password does not need to follow any specfic pattern
                  </Heading>
                </Stack>
              </Stack>
            </div>
            <StyledUpdateUserInfoForm onSubmit={handleSubmit(onSubmit)}>
              <FormRow
                labelWidth="150px"
                label="New password"
                error={errors?.password?.message}
              >
                <Input
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  disabled={isUpdatingUserPassword}
                  {...register("password", {
                    required: "This field is required",
                    minLength: {
                      value: 8,
                      message: "Password needs a minimum of 8 characters",
                    },
                  })}
                />
              </FormRow>

              <FormRow
                labelWidth="150px"
                label="Confirm password"
                error={errors?.passwordConfirm?.message}
              >
                <Input
                  type="password"
                  autoComplete="new-password"
                  id="passwordConfirm"
                  disabled={isUpdatingUserPassword}
                  {...register("passwordConfirm", {
                    required: "This field is required",
                    validate: (value) =>
                      getValues().password === value ||
                      "Passwords need to match",
                  })}
                />
              </FormRow>

              <StyledButtonsContainer>
                <Button onClick={reset} type="reset" variation="outlined">
                  Reset
                </Button>
                <Button
                  disabled={isUpdatingUserPassword}
                  style={{ minWidth: "16rem" }}
                >
                  {isUpdatingUserPassword ? (
                    <SpinnerMini $color="var(--color-grey-50)" />
                  ) : (
                    "Update password"
                  )}
                </Button>
              </StyledButtonsContainer>
            </StyledUpdateUserInfoForm>
          </Stack>
        </Stack>
      </PageContentContainer>
    );
}
