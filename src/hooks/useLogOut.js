import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/apiAuth";
import toast from "react-hot-toast";

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries(["user"]);

      navigate("/user", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { mutate, isPending, isSuccess };
}
