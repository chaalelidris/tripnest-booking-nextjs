import { toast } from "react-hot-toast";

export interface ImgType {
  src: string;
}

export const imagesUpload = async (images: File[]) => {
  const promise = toast.promise(
    Promise.all(
      images.map(async (item) => {
        const formData = new FormData();

        formData.append('file', item);
        formData.append('upload_preset', 'airbnb');
        formData.append('cloud_name', 'mamsheikh');

        const res = await fetch(
          'https://api.cloudinary.com/v1_1/mamsheikh/upload',
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
