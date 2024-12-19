import SectionHeading from "../ui/sectionHeading";
import SignupForm from "../ui/signUpForm";
import PageContentContainer from "../ui/StyledPageContentContainer";

export default function SignUp() {
  return (
    <PageContentContainer>
      <SectionHeading paragraphContent="Craete An Account ...">
        Sign Up
      </SectionHeading>
      <SignupForm />
    </PageContentContainer>
  );
}
