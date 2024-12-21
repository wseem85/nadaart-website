import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editPicture, getPicture } from "../services/apiPictures";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import PropTypes from "prop-types";
import Form from "../ui/form";
import FormRow from "../ui/formRow";
import Input from "../ui/input";
import Textarea from "../ui/textArea";
import FileInput from "../ui/fileInput";
import Button from "../ui/button";
import Select from "../ui/select";
import { useNavigate, useParams } from "react-router-dom";
import PageContentContainer from "../ui/StyledPageContentContainer";
import Stack from "../ui/stack";
import SectionHeading from "../ui/sectionHeading";
import useCurrentUser from "../hooks/useCurrentUser";
import Spinner from "../ui/spinner";
import useWindowWidth from "../hooks/useWindowWidth";
import SpinnerMini from "../ui/spinnerMini";
import Error from "../ui/error";

function EditPictureForm({ picture }) {
  const { windowWidth } = useWindowWidth();
  const { isPending: isEditing, mutate } = useMutation({
    mutationFn: (newImage, id) => editPicture(newImage, id),
    onSuccess: () => {
      toast.success("Image Successfully Edited");
      queryClient.invalidateQueries({
        gueryKey: ["images"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { register, handleSubmit, formState } = useForm({
    defaultValues: { ...picture },
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const errors = formState.errors;

  function onSubmit(data) {
    console.log(data);
    const { width, height } = data;
    let soldOut = data.soldOut === "Soldout" ? true : false;
    const category =
      data.category.at(0).toUpperCase() + data.category.slice(1).toLowerCase();

    const dimenitions = `${width}*${height}`;

    const srcType = typeof data.src === "string";
    const src = srcType || data.src?.length === 0 ? data.src : data.src[0];

    mutate(
      {
        newImage: { ...data, category, src, dimenitions, soldOut },
        id: picture.id,
      },
      {
        onSuccess: () => {
          navigate(-1);
        },
      }
    );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        maxWidth: "unset",
        backgroundColor: "var(--color-beige-300)",
        rowGap: "1rem",
      }}
    >
      <FormRow label="Title" labelWidth="110px" error={errors?.title?.message}>
        <Input
          type="text"
          id="title"
          {...register("title", {
            required: "this feild is required",
          })}
          disabled={isEditing}
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
          disabled={isEditing}
        />
      </FormRow>

      <FormRow labelWidth="110px" label="Price" error={errors?.price?.message}>
        <Input
          type="number"
          id="price"
          {...register("price", {
            required: "this feild is required",
          })}
          disabled={isEditing}
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
          disabled={isEditing}
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
          })}
          disabled={isEditing}
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
          defaultValue={0}
          {...register("height", {
            required: "this feild is required",
          })}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow
        labelWidth="110px"
        label="Availability"
        error={errors?.soldOut?.message}
      >
        <Select
          dvalue={picture.soldOut ? "Soldout" : "In store"}
          id="soldOut"
          {...register("soldOut", {
            required: "this feild is required",
          })}
          // value={picture.soldOut ? "Soldout" : "In store"}
          disabled={isEditing}
          // value={selectValue}

          options={[
            {
              label: "In store",
              value: "In store",
            },
            {
              label: "Soldout",
              value: "Soldout",
            },
          ]}
        ></Select>
      </FormRow>
      <div style={{ gridColumn: "1 / -1" }}>
        <FormRow
          label="Description"
          labelWidth="110px"
          error={errors?.description?.message}
        >
          <Textarea
            disabled={isEditing}
            type="text"
            id="description"
            placeholder="Write a Description For the Artwork"
            {...register("description", {
              required: "this feild is required",
            })}
          />
        </FormRow>
      </div>
      <FormRow labelWidth="110px" label="Picture" error={errors?.src?.message}>
        {/* <StyledPictureFeildContainer>
          <label>Picture</label> */}
        <FileInput
          id="src"
          accept="image/*"
          {...register("src")}
          disabled={isEditing}
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
        <Button
          disabled={isEditing}
          $height={windowWidth < 600 ? "unset" : "45px"}
          variation="secondary"
          type="button"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button
          $height={windowWidth < 600 ? "unset" : "45px"}
          $width="100px"
          disabled={isEditing}
        >
          {!isEditing ? "Update" : <SpinnerMini $color="#fff" />}
        </Button>
      </div>
    </Form>
  );
}
export default function Edit() {
  const { windowWidth } = useWindowWidth();

  const { id } = useParams();
  const {
    isAdmin,
    error: userError,

    isError: userIsError,

    isPending: isPendingUser,
    fetchStatus: userFetchStatus,
  } = useCurrentUser();
  const {
    data: picture,
    isPending,
    fetchStatus,
    isError,
    error,
  } = useQuery({
    queryKey: ["picture", id],
    queryFn: () => getPicture(id),
    enabled: isAdmin,
  });

  if (
    isPending ||
    isPendingUser ||
    userFetchStatus === "fetching" ||
    fetchStatus === "fetching"
  )
    return <Spinner />;
  if (userIsError)
    return (
      <PageContentContainer>
        <Error message={userError.message} />
      </PageContentContainer>
    );
  return (
    <PageContentContainer>
      <SectionHeading>Edit Picture</SectionHeading>

      {!isError ? (
        <>
          <Stack
            justify="center"
            align="center"
            direction={windowWidth <= 640 ? "vertical" : "horizental"}
          >
            <h4
              style={{
                color: "var(--color-grey-500)",
                lineHeight: "1.5",
                textTransform: "uppercase",
                letterSpacing: "1.3px",
              }}
            >
              {picture.title}
            </h4>
            <img
              src={picture.src}
              style={{
                height: "100px",
                border: "1px solid var(--color-grey-400)",
                padding: "0.3rem",
              }}
            />
          </Stack>
          <EditPictureForm picture={picture} />
        </>
      ) : (
        <Error message={error.message} />
      )}
    </PageContentContainer>
  );
}

EditPictureForm.propTypes = {
  picture: PropTypes.object,
  title: PropTypes.string,
  desc: PropTypes.string,
};
