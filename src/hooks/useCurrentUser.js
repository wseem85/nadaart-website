import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/apiAuth";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useCurrentUser() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    isPending,
    fetchStatus,
    error,
    isError,
    data: user,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: 0,
  });

  useEffect(
    function () {
      const isAdmin = user?.user_metadata.is_superuser;

      if (
        pathname.includes("admin") &&
        !isAdmin &&
        !isPending &&
        fetchStatus !== "fetching"
      )
        navigate("/login");
    },
    [user, navigate, fetchStatus, isPending, pathname]
  );
  return {
    isPending,
    fetchStatus,
    user,
    error,
    isError,
    isAuthenticated: user?.role === "authenticated",
    isAdmin: user?.user_metadata.is_superuser,
  };
}
