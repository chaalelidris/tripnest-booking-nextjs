'use client';

import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Dialog, Transition } from '@headlessui/react';
import Button from '@/app/components/Button';

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
  disabled,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  let modalBodyRef = useRef(null)

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);


  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  return (
    <>
      <Transition
        appear
        show={showModal}
        as={Fragment}
      >
        <Dialog
          as='div'
          className='relative z-30'
          onClose={onClose}
          initialFocus={modalBodyRef}
        >

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=' w-full 
                                          max-w-lg 
                                          transform 
                                          overflow-hidden 
                                          rounded-2xl
                                          bg-white  
                                          text-left 
                                          align-middle 
                                          shadow-xl 
                                          transition-all
                                        '
                >
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    {/* HEADER */}
                    <div className='flex
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
                                    left-6
                                  '
                      >
                        <IoMdClose size={18} />
                      </button>
                      <div className='text-lg
                                      font-semibold'
                      >
                        {title}
                      </div>
                    </div>
                  </Dialog.Title>

                  {/* BODY */}
                  <div ref={modalBodyRef} className='relative p-6 flex-'>{body}</div>

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
                        primary
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
