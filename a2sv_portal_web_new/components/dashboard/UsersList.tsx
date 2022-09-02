import React, { useEffect } from "react";
import { TypeOf } from "yup";
import { UserRoleType } from "../../types/user";
import RankItem from "../personal-status/RankItem";
import UserItem, { UserProps } from "./UserItem";

const DUMMY_DATA: UserProps[] = [
  { id: 0, fullname: "baa", role: UserRoleType.STUDENT },
  { id: 1, fullname: "caa", role: UserRoleType.HOA },
  { id: 2, fullname: "zaa", role: UserRoleType.HOE },
  { id: 3, fullname: "aaa", role: UserRoleType.STUDENT },
  { id: 4, fullname: "aaa", role: UserRoleType.STUDENT },
  { id: 5, fullname: "aaa", role: UserRoleType.STUDENT },
  { id: 6, fullname: "aaa", role: UserRoleType.STUDENT },
];
DUMMY_DATA.sort((a, b) => {
  return a.fullname < b.fullname ? -1 : a.fullname > b.fullname ? 1 : 0;
});

let res: { [key: string]: UserProps[] } = {};
let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

DUMMY_DATA.reduce((r, e) => {
  let alphabet = e.fullname[0].toUpperCase();

  if (!r[alphabet]) r[alphabet] = [e];
  else r[alphabet].push(e);

  return r;
}, res);

const UsersList = () => {
  return DUMMY_DATA.length == 0 ? (
    <div>List is empty</div>
  ) : (
    <div>
      {chars.split("").map((letter, index) => {
        return (
          res[letter] && (
            <div key={index}>
              <p className="font-medium text-xl text-black mt-10">{letter}</p>
              <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                {res[letter].map((user) => (
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
