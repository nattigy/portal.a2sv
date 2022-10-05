import React from "react";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import authenticatedVar from "../../lib/constants/authenticated";

const Navbar = () => {
  const router = useRouter();
  const authenticated = useReactiveVar(authenticatedVar);
  return (
    <div className="flex justify-between w-10/12">
      <img className="w-[7vw]" src="/images/A2SV-logo.svg" alt="" />
      {!authenticated ? (
        <button
          onClick={() => router.push("/auth")}
          className="rounded-lg bg-white text-xs font-Poppins font-semibold text-primary px-7 py-3"
        >
          Sign In
        </button>
      ) : (
        <button
          onClick={() => router.push("/dashboard")}
          className="rounded-lg bg-white text-xs font-Poppins font-semibold text-primary px-7 py-3"
        >
          Home
        </button>
      )}
    </div>
  );
};
export default Navbar;
