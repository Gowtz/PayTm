import { SetStateAction, useEffect, useState } from "react";
import Header from "../Components/Header";
import InputBox from "../Components/InputBox";
import { useAuth } from "../Utils/UserContext";
import { Navigate } from "react-router-dom";
import Heading from "../Components/Heading";
import axios from "axios";
import URL from "../Utils/URL";
import Users from '../Components/Users'
import SubHeading from "../Components/SubHeading";

export default function Dashboard() {
  const { user } = useAuth();
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState<any>([]);
  const [balance, setBalance] = useState("");
  useEffect(() => {
    const getuser = async () => {
      await axios
        .get(`${URL}/api/v1/user/getusers?filter=${filter}`, {
          withCredentials: true,
        })
        .then((data) => setUsers([...data.data.users]));
    };
    getuser();
  }, [filter]);
  useEffect(() => {
    const getBalance = async () => {
      await axios
        .get(`${URL}/api/v1/account/balance`, {
          withCredentials: true,
        })
        .then((data) => setBalance(data.data.balance));
    };
    getBalance();
  }, [balance]);

  return (
    <>
      {user?.error && <Navigate to="/" replace={true} />}
      {user?.id && (
        <>
          <Header />
          <div className="container px-10">
            <h1 className="text-7xl mt-10">Hello {user?.name} </h1>
            <SubHeading>Yout Balance is <b>{balance}</b></SubHeading>
          </div>

          <div className="search__bar px-10 mt-10">
            <Heading>Search</Heading>
            <InputBox
              onChange={(e: { target: { value: SetStateAction<string> } }) => {
                setFilter(e.target.value);
              }}
              lable={""}
              data={"Gopal"}
              type={"text"}
            />
          </div>

         <Users users={users}/>
        </>
      )}
    </>
  );
}
