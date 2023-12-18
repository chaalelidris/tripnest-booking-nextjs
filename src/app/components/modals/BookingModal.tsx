"use client";
import axios from "axios";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import useLoginModal from "@/hooks/useLoginModal";
import useBookModal from "@/hooks/useBookModal";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

type BookingModalProps = {
  totalPrice: number;
  dateRange: Range;
  listingId: string;
  listingPrice: number;
  setDateRange: Dispatch<SetStateAction<Range>>;
  initialDateRange: {
    startDate: Date;
    endDate: Date;
    key: string;
  };
};

const BookingModal: React.FC<BookingModalProps> = ({
  totalPrice,
  dateRange,
  listingId,
  listingPrice,
  setDateRange,
  initialDateRange,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const bookingModal = useBookModal();
  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();

  const onCreateReservation = useCallback(async () => {
    setIsLoading(true);

    if (!stripe || !elements) {
      return toast.error("Sorry! We weren't able to connect with Stripe");
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { token: stripeToken, error } = await stripe.createToken(
        cardElement
      );
      if (isLoading) {
        toast.loading("Creating booking...");
      }
      const res = axios
        .post(`/api/reservations`, {
          totalPrice,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          source: stripeToken?.id,
          listingId,
        })
        .then((response) => {
          toast.success("Listing Reserved🎉");
          setDateRange(initialDateRange);
          router.push("/trips");
        })
        .catch((error) => {
          toast.error("Internal error");
          console.log(error.response?.data?.error);
        })
        .finally(() => {
          setIsLoading(false);
          bookingModal.onClose();
        });
    }
  }, [
    isLoading,
    totalPrice,
    dateRange,
    listingId,
    router,
    initialDateRange,
    setDateRange,
    elements,
    stripe,
    bookingModal,
  ]);

  const onCreateReservationNoPayment = useCallback(async () => {
    setIsLoading(true);

    if (isLoading) {
      toast.loading("Creating booking...");
    }
    axios
      .post(`/api/reservations/standard`, {
        listingId,
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      })
      .then(() => {
        toast.success("Listing Reserved🎉");
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch((error) => {
        error.response.request &&
          toast.error(error.response.request.statusText);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
        bookingModal.onClose();
      });
  }, [
    isLoading,
    totalPrice,
    dateRange,
    listingId,
    router,
    initialDateRange,
    setDateRange,
    bookingModal,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        center
        title="Book your Reservation"
        subtitle={`Enter your payment information to book the listing from the dates between 
        ${format(dateRange.startDate!, "PP")} - ${format(
          dateRange.endDate!,
          "PP"
        )}, inclusive.`}
      />
      <hr />

      <div className="flex flex-col gap-4 text-sm">
        <div className="flex items-start">
          <p className="text-gray-700 font-semibold">Nightly rate:</p>
          <p className="ml-auto text-gray-900">
            {listingPrice} DZD *{" "}
            {dateRange.endDate!.getDate() - dateRange.startDate!.getDate()}{" "}
            nights
          </p>
        </div>
        <div className="flex items-start">
          <p className="text-gray-700 font-semibold">Tripnest fee:</p>
          <p className="ml-auto text-gray-900">
            {Math.ceil(totalPrice * 0.05)} DZD
          </p>
        </div>
        <div className="flex items-start">
          <p className="text-gray-700 font-semibold">Total price:</p>
          <p className="ml-auto text-gray-900">
            {totalPrice + Math.ceil(totalPrice * 0.05)} DZD
          </p>
        </div>
      </div>

      <hr />
      <p className="text-semibold text-center">
        Total:{" "}
        <span className="font-medium">
          {totalPrice + Math.ceil(totalPrice * 0.05)} <small>DZD</small>
        </span>{" "}
      </p>
      {/* <CardElement options={{ hidePostalCode: true }} /> */}
    </div>
  );

  const footerContent = (
    <div>
      <p className="text-xs text-center mt-10">
        By clicking <b>Confirm Reservation</b> you agree to the terms and
        conditions.
      </p>
    </div>
  );

  return (
    <Modal
      disabled={!stripe || !elements || isLoading}
      loading={isLoading}
      isOpen={bookingModal.isOpen}
      title="Book you reservation"
      actionLabel="Confirm Reservation"
      onClose={bookingModal.onClose}
      onSubmit={onCreateReservationNoPayment}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default BookingModal;
