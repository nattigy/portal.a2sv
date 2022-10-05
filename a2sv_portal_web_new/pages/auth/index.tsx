import type { NextPage } from "next";
import Image from "next/image";
import LoginForm from "../../components/auth/LoginForm";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <div className="h-screen bg-no-repeat bg-center bg-cover flex flex-col items-center pt-6 bg-login-pattern">
        <div
          onClick={() => router.push("/")}
          className="flex justify-between w-10/12 cursor-pointer"
        >
          <img className="w-[7vw]" src="/images/A2SV-logo.svg" alt="" />
        </div>

        <div className="flex justify-between items-center h-[85vh] px-3 w-10/12">
          <div className="hidden md:flex md:flex-col text-[#434343]">
            <p className="leading-snug text-4xl md:text-5xl font-bold ">
              Sign In to
            </p>
            <p className="leading-snug text-4xl md:text-5xl font-bold ">
              A2SV Portal{" "}
            </p>
            <p className="leading-snug text-sm md:text-md font-normal text-[#8A8A8A]">
              Simple education tracking and
            </p>
            <p className="text-sm md:text-md font-normal text-[#8A8A8A]">
              students managment tool for A2SVians.
            </p>
          </div>
          <div className="hidden md:flex">
            <img
              src="/images/login-person.svg"
              className="h-[80vh] w-[30vw]"
              alt=""
            />
          </div>
          <div className="w-full lg:w-4/12">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
