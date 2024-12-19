import SectionHeading from "../ui/sectionHeading";
import LogInForm from "../ui/logInForm";
import PageContentContainer from "../ui/StyledPageContentContainer";

export default function LogIn() {
  return (
    <PageContentContainer>
      <SectionHeading paragraphContent="Log In to Your Account ...">
        Log in
      </SectionHeading>
      <LogInForm />
    </PageContentContainer>
  );
}
