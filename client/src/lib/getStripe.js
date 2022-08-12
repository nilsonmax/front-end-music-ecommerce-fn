import { loadStripe } from "@stripe/stripe-js";


let stripePromise = null;

const getStripe = () => {
  if (!stripePromise) {
    // console.log(process.env.REACT_APP_PUBLIC_STRIPE_PUBLISHABLE_KEY, 'process')
    stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }

  return stripePromise;
};

export default getStripe;