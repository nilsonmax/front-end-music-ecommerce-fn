import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StyledCheckout } from "./style";
import { StyledCard } from "../Card/style";

export default function Checkout() {
  const items = useSelector((state) => state.cart.items);
  console.log("items", items);
  const stripe = useStripe();
  const elements = useElements();

  function formattedMoney(value) {
    value.toLocaleString("es-us", {
      style: "currency",
      currency: "COL",
    });

    let colMoney = formattedMoney.replace("COL", "$");
    colMoney = colMoney.replace(".00", "");
    return colMoney;
  }

  const [userInfo, setUserInfo] = useState({
    cus_name: "",
    cus_email: "",
    cus_phone: "",
    cus_address: "",
    cus_city: "",
    cus_country: "",
    cus_zip: "",
  });

  function onChange(e) {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  }

  console.log("userInfo", userInfo);

  async function handleSubmit(e) {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement), // Element capture input
    });

    const total = items.reduce((a, b) => a + b.price, 0);

    if (!error) {
      console.log("paymentMethod---------", paymentMethod);
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post("http://localhost:4000/payment", {
          id,
          items,
          amount: total,
          token: window.localStorage.getItem("dataUser"),
          userInfo,
        });

        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <StyledCheckout>
      <div class="leading-loose ">
        <form
          onSubmit={handleSubmit}
          class="max-w-xl m-4 p-10 bg-white rounded shadow-xl"
        >
          <h1 className="text-center font-bold text-4xl border-b-2 pb-4">
            Checkout
          </h1>
          <br></br>
          <p class="text-gray-800 font-medium">Customer information</p>
          <div class="">
            <label class="block text-sm text-gray-00" for="cus_name">
              Name
            </label>
            <input
              class="w-full px-5 py-0 text-gray-700 bg-gray-200 rounded"
              id="cus_name"
              name="cus_name"
              type="text"
              required=""
              placeholder="Your Name"
              aria-label="Name"
              onchange={(e) => onChange(e)}
            />
          </div>
          <div class="mt-2">
            <label class="block text-sm text-gray-600" for="cus_email">
              Email
            </label>
            <input
              class="w-full px-5  py-0 text-gray-700 bg-gray-200 rounded"
              id="cus_email"
              name="cus_email"
              type="text"
              required=""
              placeholder="Your Email"
              onchange={(e) => onChange(e)}
              aria-label="Email"
            />
          </div>
          <div class="mt-2">
            <label class=" block text-sm text-gray-600" for="cus_email">
              Phone
            </label>
            <input
              class="w-full px-2 py-0 text-gray-700 bg-gray-200 rounded"
              id="cus_phone"
              name="cus_address"
              type="tel"
              required=""
              placeholder="number phone"
              onchange={(e) => onChange(e)}
              aria-label="Email"
            />
          </div>
          <div class="mt-2">
            <label class=" block text-sm text-gray-600" for="cus_email">
              Address
            </label>
            <input
              class="w-full px-2 py-0 text-gray-700 bg-gray-200 rounded"
              id="cus_email"
              name="cus_address"
              type="text"
              required=""
              placeholder="Street"
              onchange={(e) => onChange(e)}
              aria-label="Email"
            />
          </div>
          <div class="mt-2">
            <label class=" text-sm block text-gray-600" for="cus_email">
              City
            </label>
            <input
              class="w-full px-2 py-0 text-gray-700 bg-gray-200 rounded"
              id="cus_email"
              name="cus_city"
              type="text"
              required=""
              placeholder="City"
              onchange={(e) => onChange(e)}
              aria-label="Email"
            />
          </div>
          <div class="inline-block mt-2 w-1/2 pr-1">
            <label class="block text-sm text-gray-600" for="cus_email">
              Country
            </label>
            <input
              class="w-full px-2 py-0 text-gray-700 bg-gray-200 rounded"
              id="cus_email"
              name="cus_country"
              type="text"
              required=""
              placeholder="Country"
              onchange={(e) => onChange(e)}
              aria-label="Email"
            />
          </div>
          <div class="inline-block mt-2 -mx-1 pl-1 w-1/2">
            <label class="block text-sm text-gray-600" for="cus_email">
              Zip
            </label>
            <input
              class="w-full px-2 py-0 text-gray-700 bg-gray-200 rounded"
              id="cus_email"
              name="cus_zip"
              type="text"
              required=""
              placeholder="Zip"
              onchange={(e) => onChange(e)}
              aria-label="Email"
            />
          </div>
          <p class="mt-4 text-gray-800 font-medium">Payment information</p>
          <div class="">
            <CardElement class="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded" />
          </div>
          <div class="mt-4">
            <h2>Total:</h2>
            <button
              class="px-4 py-1 text-white font-light tracking-wider bg-primary  min-w-full rounded-md"
              type="submit"
              onSubmit={handleSubmit}
              disabled={!stripe}
            >
              {`$${items.reduce((a, b) => a + b.price, 0)}`}
            </button>
          </div>
        </form>
      </div>
      <div class="leading-loose max-w-md max-h-screen box-content m-4 p-10 bg-white rounded shadow-xl">
        <h2 className="text font-bold text-2xl">Resume items:</h2>
        {items.map((item) => {
          return (
            <StyledCard>
              <img src={item.img} alt={item.name} />
              <p>{item.brand}</p>
              <h2>{item.name}</h2>
              <p>{`$${item.price}`}</p>
              <b>{`Status:`}</b> <span>{`${item.status}`}</span>
              <b>{`Type:`}</b> <span>{`${item.category.name}`}</span>
            </StyledCard>
          );
        })}
        <p></p>
      </div>
    </StyledCheckout>
  );
}
