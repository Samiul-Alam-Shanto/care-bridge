import axios from "axios";

export const uploadToImgBB = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      formData
    );
    return response.data.data.url;
  } catch (error) {
    console.error("ImgBB Upload Error:", error);
    throw new Error("Failed to upload image");
  }
};
