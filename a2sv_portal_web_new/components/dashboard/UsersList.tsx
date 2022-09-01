import { ifError } from "assert";
import React from "react";
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
const UsersList = () => {
  let curr = "";
  return DUMMY_DATA.length == 0 ? (
    <div>List is empty</div>
  ) : (
    <div className="grid grid-cols-4 gap-4">
      {DUMMY_DATA.map((item) => {
        if (curr != item.fullname.charAt(0).toUpperCase()) {
          curr = item.fullname.charAt(0).toUpperCase();
          return (
            <div key={item.id}>
              <div className="col-span-4">
                <p className="font-medium text-xl text-black">{curr}</p>
              </div>
              <UserItem fullname={item.fullname} role={item.role} />
            </div>
          );
        }
        return (
          <UserItem key={item.id} fullname={item.fullname} role={item.role} />
        );
      })}
    </div>
  );
};

export default UsersList;
