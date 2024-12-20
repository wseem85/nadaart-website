import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadNewPicture } from "../services/apiPictures";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Form from "../ui/form";
import FormRow from "../ui/formRow";
import Input from "../ui/input";
import Textarea from "../ui/textArea";
import FileInput from "../ui/fileInput";
import Button from "../ui/button";
import Select from "../ui/select";
import { useNavigate } from "react-router-dom";
import PageContentContainer from "../ui/StyledPageContentContainer";
import SectionHeading from "../ui/sectionHeading";
import useCurrentUser from "../hooks/useCurrentUser";
import Spinner from "../ui/spinner";
import styled from "styled-components";
import useWindowWidth from "../hooks/useWindowWidth";
import SpinnerMini from "../ui/spinnerMini";
const StyledUploadForm = styled(Form)`
  background-color: var(--color-beige-300);
  row-gap: 1rem;
  margin-bottom: 4rem;
  & input,
  & textarea {
    background-color: var(--color-grey-50);
  }
  & input:disabled,
  & textarea:disabled {
    background-color: var(--color-grey-200);
  }
  & button:disabled {
    opacity: 0.7;
  }
`;
export default function Upload() {
  const navigate = useNavigate();
  const { windowWidth } = useWindowWidth();
  const { isPending: isPendingUser } = useCurrentUser();

  const [selectValue, setSelectValue] = useState("In store");
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createImage } = useMutation({
    mutationFn: (newImage) => uploadNewPicture(newImage),
    onSuccess: () => {
      toast.success("Image Successfully Added");
      queryClient.invalidateQueries({
        gueryKey: ["images"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {},
  });
  const errors = formState.errors;
  function onSubmit(data) {
    console.log(data);
    const { width, height } = data;
    let soldOut;
    const category =
      data.category.at(0).toUpperCase() + data.category.slice(1).toLowerCase();
    // const soldOut = selectValue === "In store" ? true : false;
    if (selectValue === "In store") soldOut = false;
    else soldOut = true;

    const dimenitions = `${width}*${height}`;

    const src = data.src[0];

    createImage(
      { ...data, category, src, dimenitions, soldOut },
      {
        onSuccess: () => {
          reset();
          navigate(-1);
        },
      }
    );
  }
  function onError(error) {
    console.log(error);
  }
  if (isPendingUser) return <Spinner />;
  return (
    <PageContentContainer>
      <SectionHeading>Upload New Products</SectionHeading>
      <StyledUploadForm
        onSubmit={handleSubmit(onSubmit, onError)}
        style={{ maxWidth: "unset" }}
      >
        <FormRow
          label="Title"
          labelWidth="110px"
          error={errors?.title?.message}
        >
          <Input
            type="text"
            id="title"
            {...register("title", {
              required: "this feild is required",
            })}
            disabled={isCreating}
          />
        </FormRow>
        <FormRow
          labelWidth="110px"
          label="Category"
          error={errors?.category?.message}
        >
          <Input
            type="text"
            id="category"
            {...register("category", {
              required: "this feild is required",
            })}
            disabled={isCreating}
          />
        </FormRow>
        <FormRow
          labelWidth="110px"
          label="Price"
          error={errors?.price?.message}
        >
          <Input
            type="number"
            id="price"
            {...register("price", {
              required: "this feild is required",
            })}
            disabled={isCreating}
          />
        </FormRow>
        <FormRow
          labelWidth="110px"
          label="Discount %"
          error={errors?.discount?.message}
        >
          <Input
            type="number"
            id="discount"
            defaultValue={0}
            {...register("discount", {
              required: "this feild is required",
              validate: (value) =>
                value < 99 || "Discount is a Percentage Value of the price ",
            })}
            disabled={isCreating}
          />
        </FormRow>

        <FormRow
          labelWidth="110px"
          label="Width (inches)"
          error={errors?.width?.message}
        >
          <Input
            type="number"
            id="width"
            defaultValue={0}
            {...register("width", {
              required: "this feild is required",
              validate: (value) => {
                return value > 10 || "Width should be at least 10 inches ";
              },
            })}
            disabled={isCreating}
          />
        </FormRow>
        <FormRow
          labelWidth="110px"
          label="Height (inches)"
          error={errors?.height?.message}
        >
          <Input
            type="number"
            id="height"
            {...register("height", {
              required: "this feild is required",
              validate: (value) =>
                value > 10 || "Height should be at least 10 inches ",
            })}
            disabled={isCreating}
          />
        </FormRow>
        <FormRow
          labelWidth="110px"
          label="sold Out"
          error={errors?.soldOut?.message}
        >
          <Select
            id="soldOut"
            {...register("soldOut", {
              // required: "this feild is required",
            })}
            //   dValue={soldOutStr}
            disabled={isCreating}
            onChange={(e) => setSelectValue(e.target.value)}
            options={[
              { label: "In store", value: "In store" },
              { label: "Soldout", value: "Soldout" },
            ]}
          ></Select>
        </FormRow>
        <div style={{ gridColumn: "1 / -1" }}>
          <FormRow
            label="Description"
            labelWidth="110px"
            error={errors?.description?.message}
            style={{ gridTemplateColumns: "unset" }}
          >
            <Textarea
              disabled={isCreating}
              type="text"
              id="description"
              defaultValue=""
              {...register("description", {
                required: "this feild is required",
              })}
            />
          </FormRow>
        </div>
        <FormRow
          labelWidth="110px"
          type="editimageform"
          label="photo"
          error={errors?.src?.message}
        >
          {/* <StyledPictureFeildContainer>
          <label>Picture</label> */}
          <FileInput
            disabled={isCreating}
            id="src"
            accept="image/*"
            {...register("src", {
              required: "You must Load a Picture of your artwork",
            })}
          />
          {/* </StyledPictureFeildContainer> */}
        </FormRow>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "2rem",
            gridColumn: "1 / -1",
          }}
        >
          {/* type is an HTML attribute! */}
          <Button
            variation="outlined"
            disabled={isCreating}
            type="reset"
            //   onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button
            disabled={isCreating}
            $height={windowWidth < 600 ? "unset" : "45px"}
            $width="100px"
          >
            {!isCreating ? "Upload" : <SpinnerMini $color="#fff" />}
          </Button>
        </div>
      </StyledUploadForm>
    </PageContentContainer>
  );
}
