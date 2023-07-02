"use client"

import Label from "../Label/Label";
import ButtonPrimary from "../buttons/ButtonPrimary";

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";

const AccountPass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch } = useForm<FieldValues>();

  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');

  const validatePasswordMatch = () => {
    return newPassword === confirmPassword;
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      if(!validatePasswordMatch()){
        return toast.error('Passwords do not match');
      }
      // Make an API call to update the password
      const response = await axios.put('/api/update-password', data);
      console.log(response.data); // Handle the response as needed

      // Display success toast message
      toast.success('Password updated successfully!');
    } catch (error: any) {
      console.error(error);

      // Display error toast message
      toast.error(error.response.data.message);
    }
  };




  return (
    <div className="px-6">
      <div className="space-y-6 sm:space-y-8">
        {/* HEADING */}
        <h2 className="text-3xl font-semibold">Update your password</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="max-w-xl space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <div>
              <Input
                label="Current password"
                type="password"
                id="currentPassword"
                register={register}
                errors={errors}
                required />
            </div>
            <div>
              <Input
                label="New password"
                type="password"
                id="newPassword"
                register={register}
                errors={errors}
                required />
            </div>
            <div>
              <Input
                errors={errors}
                label="Confirm password"
                type="password"
                id="confirmPassword"
                register={register}
                required
              />
            </div>
            <div className="pt-2">
              <ButtonPrimary type="submit">Update password</ButtonPrimary>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountPass;
