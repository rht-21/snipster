import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "Page Not Found - Snipster",
};

const NotFound = () => {
  return (
    <main className="h-[calc(100dvh-100px)] w-full flex flex-col justify-center items-center">
      {/* <Image
        alt="404"
        src="/images/utility/404.png"
        className="mb-10"
        width={400}
        height={300}
      /> */}
      <h1 className="text-h1 font-bold">Opps! Page Not Found!</h1>
      <p className="my-10 text-body max-w-4xl text-center text-gray-600">
        We&apos;re sorry, the page you were looking for isn&apos;t found here.
        The link you followed may either be broken or no longer exists. Please
        try again, or take a look at our site.
      </p>
      <a href="/" className="primary-button px-4 py-2 rounded-md">
        Go Home
      </a>
    </main>
  );
};

export default NotFound;
