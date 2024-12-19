import { useNavigate } from "react-router-dom";
import ButtonIconText from "../ui/buttonIconText";
import Error from "../ui/error";
import PageContentContainer from "../ui/StyledPageContentContainer";
import Stack from "../ui/stack";
import { MdHome } from "react-icons/md";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <PageContentContainer justify="center">
      <Error message="An Unexpected error Happened 😥" />
      <Stack direction="horizental" justify="center">
        <ButtonIconText handler={() => navigate("/")}>
          <span>Try Again</span> <MdHome />
        </ButtonIconText>
      </Stack>
    </PageContentContainer>
  );
}
