import React, { useEffect } from "react";
import { TypeOf } from "yup";
import { UserRoleType } from "../../types/user";
import { LoaderSmall } from "../common/Loaders";
import RankItem from "../personal-status/RankItem";

import UserItem, { UserProps } from "./UserItem";

const UsersList = ({ users }: { users: UserProps[] }) => {
  let usersData: UserProps[] = [...users]
  usersData.sort((a, b) => {
    return a?.email < b.email ? -1 : a.email > b.email ? 1 : 0;
  });

  let res: { [key: string]: UserProps[] } = {};
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  usersData.reduce((r, e) => {
    console.log(e, " is el")
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
    <div>
      {chars.split("").map((letter, index) => {
        return (
          res[letter] && (
            <div key={index} className="my-10">
              <p className="font-semibold text-2xl  text-black ">{letter}</p>
              <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
                {res[letter].map((user, index) => (
                  <UserItem key={user.id} {...user} />
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
