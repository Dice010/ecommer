import { mockUsers } from "@/lib/mock-data/Users/mockUsers";
import { Customer, Staff } from "@/types/Users";
import { useState } from "react";

export function useAuthState() {
  const [user, setUser] = useState<null | Customer | Staff>(null);
  const ERR = new Error(
    "người dùng chưa tồn tại trên hệ thống hoặc sai tên tài khoản, mật khẩu",
  );

  function isExist(userName: string): boolean {
    return userName in mockUsers;
  }

  function isPasswordCorrect(input: string, data: string): boolean {
    return JSON.stringify(input.split("")) === JSON.stringify(data.split(""));
  }

  function Login(userName: string, password: string) {
    if (!isExist(userName)) throw ERR;

    if (!isPasswordCorrect(password, mockUsers[userName].password)) throw ERR;

    setUser(mockUsers[userName]);
  }

  function Logout() {
    setUser(null);
  }

  // function isPasswordValid(newPass: string): boolean {
  //   const maxlength: number = 20;
  //   const minlength: number = 8;
  //   const regex = new RegExp(
  //     `^(?=\\S+$)(?=\\S*[a-z])(?=\\S*[A-Z])(?=\\S*\\d)(?=\\S*[@&%$])[a-zA-Z\\d@&%$]{${minlength},${maxlength}}$`,
  //   );

  //   return regex.test(newPass);
  // }

  // function isPhonenumberValid(phonenumber: number): boolean {
  //   const strPN = phonenumber.toString();
  //   const regex = /^[0|00840|+84]\d{9}/;

  //   return regex.test(strPN);
  // }

  // function isMailValid(mail: string) {
  //   const regex = /^.*@[email | gmail]\.com/;

  //   return regex.test(mail);
  // }

  return { user, Login, Logout };
}
