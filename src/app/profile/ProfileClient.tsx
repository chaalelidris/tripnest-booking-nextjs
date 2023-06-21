'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useCallback, useRef, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form';

import { SafeListing, SafeUser } from "@/types";


import Image from "next/image";
import Avatar from "@/app/components/Avatar";
import Input from "@/app/components/inputs/Input";
import TextArea from "@/app/components/inputs/TextArea";



interface ProfileClientProps {
  currentUser?: SafeUser | null,
}

const ProfileClient: React.FC<ProfileClientProps> = ({
  currentUser,
}) => {
  const [isUpdating, setisUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      id: currentUser?.id,
      age: currentUser?.age,
      phonenumber: currentUser?.phonenumber,
      bio: currentUser?.bio,
      address: currentUser?.address
    }
  });



  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    try {
      axios.put(`/api/profile`, data)
        .then((response) => {
          toast.success('Profile Updated!');
          router.refresh();
          console.log(response.status);
        })
        .catch((err) => {
          toast.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        })

    } catch (error) {
      console.log(error);

    }
  }


  return (
    /* grid */
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* First column / Avatar */}
      <div className="sm:col-span-1 mx-4 ">
        {/* Avatar Section */}
        <div className="sticky top-28">
          <h3 className="text-xl font-semibold text-center mb-8 ">
            Photo
          </h3>
          <div className="flex items-center justify-center mb-4 ">
            <div className="w-52 h-52 rounded-full overflow-hidden cursor-pointer hover:shadow-md relative">
              {currentUser?.image ?
                <Image src={currentUser?.image} width={58} height={58} alt="Profile image" className="w-full h-full object-cover" />
                :
                <Image src="/images/placeholder.jpg" width={58} height={58} alt="Profile image" className="w-full h-full object-cover" />
              }
            </div>
          </div>
        </div>
      </div>
      {/* Second column / update profile */}
      <div className="col-span-2 mx-4">
        <h2 className="text-3xl font-bold mb-4 mt-4 ">Account Information</h2>
        {isUpdating ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="border border-gray-300 rounded-xl p-4 mb-4 hover:shadow-lg hover:bg-gray-50">
              {/* َAge */}
              <div className="mb-4">
                <Input
                  id="age"
                  label="Age"
                  type="number"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                />
                {errors.age && <span className="text-red-500">errors.age</span>}
              </div>

              {/* Biography */}
              <div className="mb-4">
                <TextArea
                  id="bio"
                  label="Biography"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                />
                {errors.bio && <span className="text-red-500">errors.biography</span>}

              </div>

              <hr className="my-4" />

              {/* Phone Number */}
              <div className="mb-4">
                <Input
                  id="phonenumber"
                  label="Phone number"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                />
                {errors.phonenumber && <span className="text-red-500">errors.phonenumber</span>}
              </div>

              {/* Address */}
              <div className="mb-4">
                <Input
                  id="address"
                  label="Address"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                />
                {errors.address && <span className="text-red-500">Adress is required</span>}
              </div>
            </div>


            <div className="border border-gray-300 rounded-xl p-4 mb-4 hover:shadow-lg hover:bg-gray-50">
              {/* Social Media Links */}
              <div className="mb-4">
                <label htmlFor="facebook" className="block mb-1 font-medium">
                  Facebook
                </label>
                <input
                  id="facebook"
                  type="text"
                  {...register("facebook")}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="instagram" className="block mb-1 font-medium">
                  Instagram
                </label>
                <input
                  id="instagram"
                  type="text"
                  {...register("instagram")}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            {/* ... Other social media fields (Twitter, Instagram, etc.) ... */}
            {/* Add more fields for other account information (e.g., email, phone number, etc.) */}
            <div className="flex justify-end">
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className=" px-4 
                            py-2 
                            text-white 
                            bg-blue-500 
                            rounded-lg 
                            hover:bg-blue-600"
              >
                Update Account
              </button>
            </div>
          </form>
        ) : (
          <div className="border border-gray-300 rounded-xl p-4 mb-4 hover:shadow-lg hover:bg-gray-50">
            <p className="mb-4 flex gap-2"><Avatar src={currentUser?.image} size={100} />{currentUser?.email}</p>
            <p className="mb-4">{currentUser?.name}</p>
            {/* Display other account information here */}
            <div className="flex justify-end">
              <button
                onClick={() => setisUpdating(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Right section */}

    </div>

  );
}

export default ProfileClient;