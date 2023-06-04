'use client';

import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Dialog, Transition } from '@headlessui/react';
import Button from '../Button';

type ModalsProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
};

const Modal: React.FC<ModalsProps> = ({
  isOpen,
  actionLabel,
  onClose,
  onSubmit,
  body,
  disabled,
  footer,
  secondaryAction,
  secondaryActionLabel,
  title,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  // const handleClose = useCallback(() => {
  //   if (disabled) return;

  //   setShowModal(false);
  //   // setTimeout(() => {
  //   //   onClose();
  //   // }, 300);
  // }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-50' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-out duration-500 sm:duration-700'
                enterFrom='translate-y-full'
                enterTo='translate-y-0'
                leave='transform transition ease-in duration-500 sm:duration-700'
                leaveFrom='translate-y-0'
                leaveTo='translate-y-full'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-lg bg-white  text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    {/* HEADER */}
                    <div
                      className='
                  flex
                  items-center
                  p-4
                  rounded-t
                  justify-center
                  relative
                  border-b-[1px]
                  '
                    >
                      <button
                        onClick={onClose}
                        className='
                    p-1
                    border-0
                    hover:opacity-70
                    transtion
                    absolute
                    left-9
                '
                      >
                        <IoMdClose size={18} />
                      </button>
                      <div
                        className='
                    text-lg
                    font-semibold
                '
                      >
                        {title}
                      </div>
                    </div>
                  </Dialog.Title>
                  {/* BODY */}
                  <div className='relative p-6 flex-'>{body}</div>
                  {/* FOOTER */}
                  <div className='flex flex-col gap-2 p-6'>
                    <div className='flex flex-row items-center gap-4  w-full'>
                      {secondaryAction && secondaryActionLabel && (
                        <Button
                          label={secondaryActionLabel}
                          outline
                          disabled={disabled}
                          onClick={handleSecondaryAction}
                        />
                      )}
                      <Button
                        label={actionLabel}
                        disabled={disabled}
                        onClick={handleSubmit}
                      />
                    </div>
                    {footer}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default Modal;
