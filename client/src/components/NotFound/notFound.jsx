import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12 ">
      <div className="max-w-screen-lg px-4 md:px-8 mx-auto">
        <div className="grid sm:grid-cols-2 gap-8">
          {/* <!-- content - start --> */}
          <div className="flex flex-col justify-center items-center sm:items-start md:py-24 lg:py-32">
            <p className="text-secondary text-sm md:text-base font-semibold uppercase mb-4">
              MusiCommerce
            </p>
            <h1 className="text-gray-800 text-2xl md:text-3xl font-bold text-center sm:text-left mb-2">
              Page not found
            </h1>

            <p className="text-gray-500 md:text-lg text-center sm:text-left mb-8">
              The page you’re looking for doesn’t exist.
            </p>

            <p
              onClick={() => navigate("/")}
              className="inline-block bg-secondary hover:bg-primary focus-visible:ring ring-indigo-300 text-white active:text-secondary text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
              Go home
            </p>
          </div>
          {/* <!-- content - end --> */}

          {/* <!-- image - start --> */}
          <div className="h-80 md:h-auto bg-gray-100 overflow-hidden shadow-lg rounded-lg relative">
            <img
              src="https://www.superprof.com.ar/blog/wp-content/uploads/2018/03/simon-weisser-phs37wg8cqg-unsplash-scaled.jpg"
              loading="lazy"
              alt="Photo by @heydevn"
              className="w-full h-full object-cover object-center absolute inset-0"
            />
          </div>
          {/* <!-- image - end --> */}
        </div>
      </div>
    </div>
  );
}
