import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StyledCheckout } from "./style";
import { StyledCard } from "../Card/style";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import LoaderButton from "../Loader/loaderButton";

import { getDataClearCar, mailPurchase } from "../../redux/action/cartActions";

function validate(userInfo) {
  let errors = {};

  if (!userInfo.cus_name) {
    errors.cus_name = "Input required";
  } else if (!userInfo.cus_email) {
    errors.cus_email = "Input required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(userInfo.cus_email)
  ) {
    errors.cus_email = "Invalid email address";
  } else if (!userInfo.cus_phone) {
    errors.cus_phone = "Input required";
  } else if (`${userInfo.cus_phone}`.length < 10) {
    errors.cus_phone = "should have 10 digits at least";
  } else if (!userInfo.cus_address) {
    errors.cus_address = "Input required";
  } else if (!userInfo.cus_city) {
    errors.cus_city = "Input required";
  } else if (!userInfo.cus_country) {
    errors.cus_country = "Input required";
  } else if (!userInfo.cus_zip) {
    errors.cus_zip = "Input required";
  }

  return errors;
}

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("dataUser");
    if (token === null) {
      navigate("/");
      return;
    }
  }, []);

  const items = useSelector((state) => state.cart.items);
  console.log("items", items);
  const stripe = useStripe();
  const elements = useElements();
  const goBack = useNavigate();
  const dispatch = useDispatch();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

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

  const [errors, setErrors] = useState({
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
    setErrors(
      validate({
        ...userInfo,
        [e.target.name]: e.target.value,
      })
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setErrors(validate(userInfo));

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement), // Element capture input
    });
    setLoading(true);

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

        let mailInfo = {
          name: userInfo.cus_name,
          email: userInfo.cus_email,
          phone: userInfo.cus_phone,
          address: userInfo.cus_address,
          city: userInfo.cus_city,
          country: userInfo.cus_country,
          zip: userInfo.cus_zip,
          total: total,
          items: items.map((item) => {
            return {
              name: item.name,
              price: item.price,
              count: item.count,
              img: item.img,
            };
          }),
        };
        dispatch(mailPurchase(mailInfo));

        elements.getElement(CardElement).clear();
        setUserInfo({
          cus_name: "",
          cus_email: "",
          cus_phone: "",
          cus_address: "",
          cus_city: "",
          cus_country: "",
          cus_zip: "",
        });

        setTimeout(() => {
          Toast.fire({
            icon: "success",
            title: "We have sent you an email with your order details.",
          }).then((result) => {
            dispatch(getDataClearCar());
            goBack("/");
          });
          // setSubmitting(false);
        }, 400);
      } catch (error) {
        console.log(error);
        setTimeout(() => {
          Toast.fire({
            icon: "error",
            title: error.message,
          });
        }, 400);
        setLoading(false);
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
              value={userInfo.cus_name}
              placeholder="Your Name"
              aria-label="Name"
              onChange={(e) => onChange(e)}
            />
            {errors.cus_name && (
              <p className="text-xs text-red-600">{errors.cus_name}</p>
            )}
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
              value={userInfo.cus_email}
              placeholder="Your Email"
              onChange={(e) => onChange(e)}
              aria-label="Email"
            />
            {errors.cus_email && (
              <p className="text-xs text-red-600">{errors.cus_email}</p>
            )}
          </div>

          <div class="mt-2">
            <label class=" block text-sm text-gray-600" for="cus_email">
              Phone
            </label>
            <input
              class="w-full px-2 py-0 text-gray-700 bg-gray-200 rounded"
              id="cus_phone"
              name="cus_phone"
              type="number"
              value={userInfo.cus_phone}
              placeholder="number phone"
              onChange={(e) => onChange(e)}
              aria-label="Email"
            />
            {errors.cus_phone && (
              <p className="text-xs text-red-600">{errors.cus_phone}</p>
            )}
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
              value={userInfo.cus_address}
              placeholder="Street"
              onChange={(e) => onChange(e)}
              aria-label="Email"
            />
            {errors.cus_address && (
              <p className="text-xs text-red-600">{errors.cus_address}</p>
            )}
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
              value={userInfo.cus_city}
              placeholder="City"
              onChange={(e) => onChange(e)}
              aria-label="Email"
            />
            {errors.cus_city && (
              <p className="text-xs text-red-600">{errors.cus_city}</p>
            )}
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
              value={userInfo.cus_country}
              placeholder="Country"
              onChange={(e) => onChange(e)}
              aria-label="Email"
            />
            {errors.cus_country && (
              <p className="text-xs text-red-600">{errors.cus_country}</p>
            )}
          </div>

          <div class="inline-block mt-2 -mx-1 pl-1 w-1/2">
            <label class="block text-sm text-gray-600" for="cus_email">
              Zip
            </label>
            <input
              class="w-full px-2 py-0 text-gray-700 bg-gray-200 rounded"
              id="cus_email"
              name="cus_zip"
              type="number"
              value={userInfo.cus_zip}
              placeholder="Zip"
              onChange={(e) => onChange(e)}
              aria-label="Email"
            />
            {errors.cus_zip && (
              <p className="text-xs text-red-600">{errors.cus_zip}</p>
            )}
          </div>

          <div class="inline-block mt-2 -mx-1 pl-1 w-1/2">
            <label class="block text-sm text-gray-600">
              Payment information
            </label>
            <CardElement class="w-full px-5  py-0 text-gray-700 bg-gray-200 rounded" />
          </div>

          <div class="mt-4">
            {userInfo.cus_name &&
            userInfo.cus_email &&
            userInfo.cus_phone &&
            userInfo.cus_address &&
            userInfo.cus_city &&
            userInfo.cus_country &&
            userInfo.cus_zip != "" &&
            elements.getElement(CardElement).length != 0 &&
            Object.keys(errors).length === 0 ? (
              <button
                class="px-4  text-white font-light tracking-wider bg-primary  min-w-full rounded-md"
                type="submit"
                onSubmit={handleSubmit}
                disabled={!stripe}
              >
                {loading ? (
                  <LoaderButton />
                ) : (
                  <span className="font-semibold">
                    Pay with Stripe{" $"}
                    {items.reduce((a, b) => a + b.price * b.count, 0)}
                  </span>
                )}
              </button>
            ) : (
              <span className="font-bold text-xl">
                Total: ${items.reduce((a, b) => a + b.price * b.count, 0)}
              </span>
            )}
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
            </StyledCard>
          );
        })}
        <p></p>
      </div>
    </StyledCheckout>
  );
}
