import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
const StudentAvatar: React.FC<{ url: string }> = ({ url }: { url: string }) => {
  return (
    <img
      className="w-8 h-8 rounded-full object-cover border-solid border-white border-2"
      src="https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
      alt=""
    />
  );
};
export type GroupItemProps = {
  groupName: string;
  groupLocation: string;
  createdAt: string;
  studentsImage: string[];
  totalStudents: number;
  color?: string;
};

const GroupItem = (props: GroupItemProps) => {
  return (
    <div className="w-64 h-32 bg-white rounded-lg">
      <div className="relative w-full h-2/3 rounded-lg">
        <img
          className="absolute w-full h-full object-cover  rounded-t-lg "
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
        <div className="relative h-full w-full bg-[#00000070] rounded-t-lg p-3">
          <div className="flex gap-x-3 items-center">
            <div className="w-12 h-12">
              <svg
                width="50"
                height="48"
                viewBox="0 0 66 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.422852"
                  width="65.5034"
                  height="64"
                  rx="20"
                  fill={props.color}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M27.6916 24.3571C27.6916 22.9363 28.2693 21.5737 29.2976 20.5691C30.3258 19.5644 31.7204 19 33.1746 19C34.6288 19 36.0234 19.5644 37.0516 20.5691C38.0799 21.5737 38.6575 22.9363 38.6575 24.3571C38.6575 25.7779 38.0799 27.1405 37.0516 28.1451C36.0234 29.1498 34.6288 29.7142 33.1746 29.7142C31.7204 29.7142 30.3258 29.1498 29.2976 28.1451C28.2693 27.1405 27.6916 25.7779 27.6916 24.3571ZM38.6575 28.6428C38.6575 27.5062 39.1197 26.4161 39.9423 25.6123C40.7649 24.8086 41.8805 24.3571 43.0439 24.3571C44.2072 24.3571 45.3229 24.8086 46.1455 25.6123C46.9681 26.4161 47.4302 27.5062 47.4302 28.6428C47.4302 29.7794 46.9681 30.8695 46.1455 31.6732C45.3229 32.4769 44.2072 32.9285 43.0439 32.9285C41.8805 32.9285 40.7649 32.4769 39.9423 31.6732C39.1197 30.8695 38.6575 29.7794 38.6575 28.6428ZM18.9189 28.6428C18.9189 27.5062 19.3811 26.4161 20.2037 25.6123C21.0263 24.8086 22.142 24.3571 23.3053 24.3571C24.4686 24.3571 25.5843 24.8086 26.4069 25.6123C27.2295 26.4161 27.6916 27.5062 27.6916 28.6428C27.6916 29.7794 27.2295 30.8695 26.4069 31.6732C25.5843 32.4769 24.4686 32.9285 23.3053 32.9285C22.142 32.9285 21.0263 32.4769 20.2037 31.6732C19.3811 30.8695 18.9189 29.7794 18.9189 28.6428ZM24.8551 36.3099C25.747 34.9442 26.9768 33.8203 28.4309 33.042C29.8851 32.2637 31.5166 31.8561 33.1746 31.857C34.5633 31.8558 35.9367 32.1412 37.2048 32.6944C38.4728 33.2477 39.607 34.0564 40.533 35.0675C41.4591 36.0787 42.1561 37.2696 42.5784 38.5622C43.0008 39.8548 43.139 41.22 42.9839 42.5684C42.965 42.7359 42.9058 42.8967 42.8113 43.0377C42.7168 43.1787 42.5896 43.2959 42.44 43.3798C39.6204 44.9606 36.4254 45.7901 33.1746 45.7855C29.9237 45.7905 26.7286 44.9609 23.9092 43.3798C23.7596 43.2959 23.6323 43.1787 23.5378 43.0377C23.4433 42.8967 23.3842 42.7359 23.3652 42.5684C23.1197 40.3779 23.6452 38.171 24.8551 36.3113V36.3099Z"
                  fill="white"
                />
                <path
                  d="M23.0597 35.0769C21.6177 37.2517 20.9458 39.8287 21.1472 42.4126C20.2692 42.2825 19.4057 42.0721 18.5681 41.784L18.3999 41.7269C18.2499 41.6748 18.1185 41.5814 18.0217 41.4579C17.9249 41.3345 17.8669 41.1862 17.8546 41.0311L17.8399 40.8583C17.7809 40.1411 17.8703 39.4196 18.1028 38.7369C18.3354 38.0543 18.7063 37.4243 19.1934 36.8848C19.6806 36.3452 20.274 35.907 20.9383 35.5964C21.6025 35.2858 22.324 35.1091 23.0597 35.0769ZM45.202 42.4126C45.4034 39.8287 44.7315 37.2517 43.2895 35.0769C44.0252 35.1091 44.7467 35.2858 45.411 35.5964C46.0752 35.907 46.6686 36.3452 47.1558 36.8848C47.6429 37.4243 48.0139 38.0543 48.2464 38.7369C48.4789 39.4196 48.5684 40.1411 48.5093 40.8583L48.4947 41.0311C48.4821 41.186 48.4239 41.3339 48.3271 41.4571C48.2303 41.5803 48.0991 41.6735 47.9493 41.7254L47.7812 41.7826C46.9521 42.0683 46.091 42.2811 45.202 42.4126Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <p className="font-semibold text-[#fff] text-sm">
                {props.groupName}
              </p>
              <p className="text-[#fff] font-medium text-xs">
                {props.groupLocation}
              </p>
            </div>
          </div>
          <div className="flex felx-col justify-end mt-2 gap-x-1 items-center">
            <AiOutlineClockCircle color="white" size={12} />
            <p className="text-white text-[10px]">{props.createdAt}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center px-2  h-1/3">
        <div className="flex relative flex-row -space-x-2 items-center ">
          {props.studentsImage.map((item, index) => (
            <StudentAvatar url={item} key={index} />
          ))}
          <div className="w-8 h-8 rounded-full bg-[#D9D9D9] text-[#000] border-solid border-white border-2 text-[10px] font-semibold flex items-center justify-center">
            {`+${props.totalStudents}`}
          </div>
        </div>
        <p className="text-[#5956E9] text-xs font-semibold">View Details</p>
      </div>
    </div>
  );
};

export default GroupItem;
