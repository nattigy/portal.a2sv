import React from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between w-10/12">
      <img className="w-[7vw]" src="/images/A2SV-logo.svg" alt="" />
      <button
        onClick={() => router.push("/auth")}
        className="rounded-lg bg-white text-xs font-Poppins font-semibold text-primary px-7 py-3"
      >
        Sign In
      </button>
    </div>
  );
};
export default Navbar;
