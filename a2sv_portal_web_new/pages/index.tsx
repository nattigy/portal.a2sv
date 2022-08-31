import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/common/Navbar";

const Home: NextPage = () => {
  return (
    <div className="h-screen bg-no-repeat bg-center bg-cover flex flex-col items-center pt-6 bg-hero-pattern">
      <Navbar />

      <div className="flex justify-between items-center h-[85vh] w-10/12">
        <div className="flex-auto text-[#434343]">
          <p className="font-semibold md:text-md text-sm ">
            😎 SIMPLE MANAGMENT TOOL
          </p>
          <p className="leading-snug md:text-6xl text-5xl font-bold ">
            The Best Way
          </p>
          <p className="leading-snug md:text-6xl text-5xl font-bold ">
            to Organize{" "}
          </p>
          <p className="leading-snug md:text-6xl text-5xl font-bold ">
            Your Work{" "}
          </p>
          <p className="leading-snug md:text-md text-sm font-normal text-[#8A8A8A]">
            Simple education tracking and
          </p>
          <p className="md:text-md text-sm font-normal text-[#8A8A8A]">
            students managment tool for A2SVians.
          </p>
        </div>

        <div className="hidden md:flex">
          <img src="/images/hero-image.svg" className="w-[50vw]" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
