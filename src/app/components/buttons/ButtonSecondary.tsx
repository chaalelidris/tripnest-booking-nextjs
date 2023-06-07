
import React from "react";
import Button, { ButtonProps } from "@/app/components/buttons/Button";

export interface ButtonSecondaryProps extends ButtonProps { }

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  className = " ",
  ...args
}) => {
  return (
    <Button
      className={`font-medium border bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-100 ${className}`}
      {...args}
    />
  );
};

export default ButtonSecondary;
