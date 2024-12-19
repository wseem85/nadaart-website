import supabase, { supabaseUrl } from "./supabase";
export async function getPictures() {
  const { data: images, error } = await supabase.from("images").select("*");

  if (error) {
    console.error(error);
    throw new Error("Can not Load Artworks Pictures!");
  }
  return images;
}

export async function getPicturesInCart(ids) {
  const { data, error } = await supabase
    .from("images")
    .select("*")
    .in("id", ids);

  if (error) {
    console.error(error);
    throw new Error("Can not Load Cart Pictures  !");
  }
  return data;
}

export async function getFilteredPictures(filters) {
  let query = supabase.from("images").select("*");
  if (filters.categories) {
    query = query.in("category", filters.categories.split(","));
  }
  if (filters.availability) {
    if (filters.availability === "soldout") {
      query = query.eq("soldOut", true);
    }
    if (filters.availability === "inStore") {
      query = query.eq("soldOut", false);
    }
  }

  if (filters.price) query = query.lte("price", Number(filters.price));
  if (filters.sizes) {
    if (filters.sizes.includes(",")) {
      const splittedSizes = filters.sizes.split(",");
      query = query.in("dimenitions", splittedSizes);
    } else {
      const [width, height] = filters.sizes.split("*");
      query = query.eq("width", Number(width)).eq("height", Number(height));
    }
  }

  const { data: images, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Can not Read Images data");
  }
  return images;
}

export async function getPicture(id) {
  let query = supabase.from("images").select("*").eq("id", id);

  const { data, error } = await query.single();
  if (error) {
    console.error(error.message);
    throw new Error("Can not Read Picture data");
  }
  console.log(data);
  return data;
}

export async function deleteImage(id) {
  const { error } = await supabase.from("images").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Error Deleting Picture");
  }
  return null;
}

export async function uploadNewPicture(newImage) {
  // const hasImagePath = newImage.src?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newImage.title
    .replaceAll("/", "")
    .replaceAll(" ", "")}`;
  const imagePath = `${supabaseUrl}/storage/v1/object/public/originals/${imageName}`;

  let query = supabase.from("images");
  query = query.insert([{ ...newImage, src: imagePath }]);

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Could not Create Picture  ");
  }

  const { error: storageError } = await supabase.storage
    .from("originals")
    .upload(imageName, newImage.src);
  if (storageError) {
    await supabase.from("images").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Could not Upload file");
  }
  return data;
}

export async function editPicture({ newImage, id }) {
  const hasImagePath = newImage.src?.startsWith?.(supabaseUrl);

  const imageName =
    typeof newImage.src === "string"
      ? newImage.src
      : `${Math.random()}-${newImage.title
          .replaceAll("/", "")
          .replaceAll(" ", "")}`;
  const imagePath = hasImagePath
    ? newImage.src
    : `${supabaseUrl}/storage/v1/object/public/originals/${imageName}`;
  console.log(imagePath);
  let query = supabase.from("images");

  query = query.update({ ...newImage, src: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Could not Edit Picture  ");
  }
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("originals")
      .upload(imageName, newImage.src);
    if (storageError) {
      await supabase.from("images").delete().eq("id", data.id);
      console.error(storageError);
      throw new Error("Could not Upload file");
    }
  }
  return data;
}
