import React, { useEffect } from "react";
import { TypeOf } from "yup";
import { UserRoleType } from "../../types/user";
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


  return usersData.length == 0 ? (
    <div>List is empty</div>
  ) : (
    <div>
      {chars.split("").map((letter, index) => {
        return (
          res[letter] && (
            <div key={index}>
              <p className="font-medium text-xl text-black mt-10">{letter}</p>
              <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
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
