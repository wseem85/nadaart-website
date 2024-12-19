import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../services/apiAuth";
import toast from "react-hot-toast";

export default function useLogIn() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/user", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { mutate, isPending };
}
