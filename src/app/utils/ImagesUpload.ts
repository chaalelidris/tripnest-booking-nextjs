import { toast } from "react-hot-toast";

export interface ImgType {
  src: string;
}
const uploadPreset = "tripnest";

export const imagesUpload = async (images: File[]) => {
  const promise = toast.promise(
    Promise.all(
      images.map(async (item) => {
        const formData = new FormData();

        formData.append('file', item);
        formData.append('upload_preset', uploadPreset);
        formData.append('cloud_name', String(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME));

        console.log(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
        
        const res = await fetch(
          'https://api.cloudinary.com/v1_1/dq5tup69v/upload',
          {
            method: 'POST',
            body: formData,
          }
        );

        const data = await res.json();
        return { src: data.secure_url };
      })
    ),
    {
      loading: 'Uploading images...',
      success: 'Images uploaded successfully!',
      error: 'Failed to upload images.',
    }
  );

  const imgArr = await promise;
  return imgArr;
};
