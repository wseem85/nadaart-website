import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getFilteredPictures } from "../services/apiPictures";
import { compareDesc, parseISO } from "date-fns";

export function useFilteredPictures() {
  const [searchParams] = useSearchParams();
  const filters = {};
  for (const [key, value] of searchParams) filters[key] = value;

  const {
    isPending,
    data: images,
    error,
    isError,
  } = useQuery({
    queryKey: ["images", filters],
    queryFn: () => getFilteredPictures(filters),
  });
  const filteredSortedImages = images?.sort((obj1, obj2) => {
    const date1 = parseISO(obj1.created_at);
    const date2 = parseISO(obj2.created_at);

    // Use compareDesc for ascending order (latest to earliest)
    // Use compareAsc for descending order (earliest to latest)
    return compareDesc(date1, date2);
  });

  return { isPending, error, isError, filteredSortedImages };
}
