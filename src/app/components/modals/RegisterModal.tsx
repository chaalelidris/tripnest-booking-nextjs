"use client"

import { AiFillGithub } from 'react-icons/ai';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm, FieldValues } from 'react-hook-form';
import { signIn } from 'next-auth/react';

import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';

import Modal from '@/app/components/modals/Modal';
import Heading from '@/app/components/Heading';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/Button';
import { toast } from 'react-hot-toast';



type RegisterModalProps = {};

const RegisterModal: React.FC<RegisterModalProps> = () => {
  const [loading, setLoading] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    // Convert email to lowercase
    const lowercaseData = {
      ...data,
      email: data.email.toLowerCase()
    };

    axios
      .post('/api/register', lowercaseData)
      .then(() => {
        toast.success('Thanks registration success🎉');
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const toggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Tripnest" subtitle="Create an account" />
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={loading}
        errors={errors}
        register={register}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={loading}
        errors={errors}
        register={register}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={loading}
        errors={errors}
        register={register}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />

      <Button
        className='transform-gpu hover:scale-95'
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      {/* <Button
        className='transform-gpu hover:scale-95'
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      /> */}
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center gap-2 justify-center">
          <div>Already have an account?</div>
          <button
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={loading}
      loading={loading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
