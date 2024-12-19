import { compareDesc, parseISO } from "date-fns";
import { getPictures } from "../services/apiPictures";
import Landing from "../ui/landing";
import NewArtWorks from "../ui/newArtworks";
import { useQuery } from "@tanstack/react-query";
import About from "../ui/about";

import { useRef } from "react";
import Spinner from "../ui/spinner";
import Error from "../ui/error";
import PageContentContainer from "../ui/StyledPageContentContainer";

export default function HomePage() {
  const drawMeRef = useRef();
  const getInTouchRef = useRef();
  const {
    data: images,
    isPending,
    error,
    isError,
  } = useQuery({
    queryKey: ["images"],
    queryFn: getPictures,
  });
  if (isPending) return <Spinner />;
  //   const pictures = { data };

  const sorted = images?.sort((obj1, obj2) => {
    const date1 = parseISO(obj1.created_at);
    const date2 = parseISO(obj2.created_at);

    // Use compareDesc for ascending order (latest to earliest)
    // Use compareAsc for descending order (earliest to latest)
    return compareDesc(date1, date2);
  });
  const newPictures = sorted?.slice(0, 8);

  return (
    <>
      {isError ? (
        <Error message={error.message}></Error>
      ) : (
        <>
          <Landing
            pictures={images}
            drawMeRef={drawMeRef}
            getInTouchRef={getInTouchRef}
          />
          <PageContentContainer>
            <NewArtWorks newPictures={newPictures} />
            <About drawMeRef={drawMeRef} getInTouchRef={getInTouchRef} />
          </PageContentContainer>
        </>
      )}
    </>
  );
}
