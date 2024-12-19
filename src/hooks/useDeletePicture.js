import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteImage as deleteImageApi } from "../services/apiPictures";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useDeletePicture() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending: isDeleting, mutate: deletePicture } = useMutation({
    mutationFn: (id) => deleteImageApi(id),
    onSuccess: () => {
      toast.success("Image Successfully Deleted");
      queryClient.invalidateQueries({
        gueryKey: ["images", "picture"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {
      navigate("/admin/dashboard");
    },
  });
  return { isDeleting, deletePicture };
}
