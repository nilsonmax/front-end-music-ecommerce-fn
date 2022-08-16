import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51LVhuNGZCoUhdempeuLZScU9BSjym86ji19YjkpFBaBMuACGX5anJToeQpMH4ksNFSyeGshaX83d9AVMXnShe0KY00xHD6MAe6"
);

export default function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()
  useEffect(()=>{
    const token = window.localStorage.getItem("dataUser");
    if(token){ 
        navigate("/")
        return 
    }
  },[])

  const { error, paymentMethod } = async function handleSubmit(event) {
    event.preventDefault();

    await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
  };

  return (
    <Elements stripe={stripePromise}>
      <div class="leading-loose">
        <form class="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
          <p class="text-gray-800 font-medium">Customer information</p>
          <div class="">
            <label class="block text-sm text-gray-00" for="cus_name">
              Name
            </label>
            <input
              class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
              id="cus_name"
              name="cus_name"
              type="text"
              required=""
              placeholder="Your Name"
              aria-label="Name"
            />
          </div>
          <div class="mt-2">
            <label class="block text-sm text-gray-600" for="cus_email">
              Email
            </label>
            <input
              class="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
              id="cus_email"
              name="cus_email"
              type="text"
              required=""
              placeholder="Your Email"
              aria-label="Email"
            />
          </div>
          <div class="mt-2">
            <label class=" block text-sm text-gray-600" for="cus_email">
              Address
            </label>
            <input
              class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
              id="cus_email"
              name="cus_email"
              type="text"
              required=""
              placeholder="Street"
              aria-label="Email"
            />
          </div>
          <div class="mt-2">
            <label class=" text-sm block text-gray-600" for="cus_email">
              City
            </label>
            <input
              class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
              id="cus_email"
              name="cus_email"
              type="text"
              required=""
              placeholder="City"
              aria-label="Email"
            />
          </div>
          <div class="inline-block mt-2 w-1/2 pr-1">
            <label class=" block text-sm text-gray-600" for="cus_email">
              Country
            </label>
            <input
              class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
              id="cus_email"
              name="cus_email"
              type="text"
              required=""
              placeholder="Country"
              aria-label="Email"
            />
          </div>
          <div class="inline-block mt-2 -mx-1 pl-1 w-1/2">
            <label class=" block text-sm text-gray-600" for="cus_email">
              Zip
            </label>
            <input
              class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
              id="cus_email"
              name="cus_email"
              type="text"
              required=""
              placeholder="Zip"
              aria-label="Email"
            />
          </div>
          <p class="mt-4 text-gray-800 font-medium">Payment information</p>
          <div class="">
            <label class="block text-sm text-gray-600" for="cus_name">
              Card
            </label>
            <CardElement class="w-full px-5 py-4 text-gray-700 bg-gray-200 rounded" />
          </div>
          <div class="mt-4">
            <button
              class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
              type="submit"
            >
              $3.00
            </button>
          </div>
        </form>
      </div>
    </Elements>
  );
}
