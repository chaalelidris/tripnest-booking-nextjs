"use client"

import Input from "../Input/Input";
import Label from "../Label/Label";
import ButtonPrimary from "../buttons/ButtonPrimary";


const AccountPass = () => {
  return (
    <div className="px-6 ">
      <div className="space-y-6 sm:space-y-8">
        {/* HEADING */}
        <h2 className="text-3xl font-semibold">Update your password</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className=" max-w-xl space-y-6">
          <div>
            <Label>Current password</Label>
            <Input type="password" className="mt-1.5" />
          </div>
          <div>
            <Label>New password</Label>
            <Input type="password" className="mt-1.5" />
          </div>
          <div>
            <Label>Confirm password</Label>
            <Input type="password" className="mt-1.5" />
          </div>
          <div className="pt-2">
            <ButtonPrimary>Update password</ButtonPrimary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPass;
