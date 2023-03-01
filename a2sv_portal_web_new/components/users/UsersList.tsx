import React, { useEffect, useState } from "react";
import { TypeOf } from "yup";
import { UserRoleType } from "../../types/user";
import { LoaderSmall } from "../common/Loaders";

import UserItem, { UserProps } from "./UserItem";

type Props = {
  users: UserProps[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
};

const UsersList = ({ users, selected, setSelected }: Props) => {
  let usersData: UserProps[] = [...users];

  usersData.sort((a, b) => {
    return a?.email < b.email ? -1 : a.email > b.email ? 1 : 0;
  });

  let res: { [key: string]: UserProps[] } = {};
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  usersData.reduce((r, e) => {
    let alphabet = e.email[0].toUpperCase();

    if (!r[alphabet]) r[alphabet] = [e];
    else r[alphabet].push(e);

    return r;
  }, res);

  return users.length === 0 ? (
    <div className="w-full flex h-full items-center justify-center min-w-full min-h-full">
      <LoaderSmall />
    </div>
  ) : (
    <div className="">
      {chars.split("").map((letter, index) => {
        return (
          res[letter] && (
            <div key={index} className="my-10 ">
              <p className="font-semibold text-2xl  text-black ">{letter}</p>
              <div className="w-full grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {res[letter].map((user, index) => (
                  <div
                  className="cursor-pointer w-full "
                  onClick={() => setSelected(user.id || "")}
                  key={index}
                  >
                    <UserItem key={user.id} {...user} />
                  </div>
                ))}
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default UsersList;
