import { SetStateAction, useState } from "react";
import Button from "../Components/Button";
import Heading from "../Components/Heading";
import InputBox from "../Components/InputBox";
import SubHeading from "../Components/SubHeading";
import { useAuth } from "../Utils/UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import URLS from "../Utils/URL";

export default function Signup() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });

  const handleSubmit = async () => {
    if (name !== "" || email != "" || password != "") {
      await axios
        .post(
          `${URLS}/api/v1/user/signup`,
          {
            name,
            email,
            password,
          },
          {
            withCredentials: true,
          }
        )
        .then((data) => {
          setUser(data.data);
          setEmail("");
          setName("");
          setPassword("");
          setError({ email: "", password: "" })
        })
        .catch((error) =>{ setError(error.response?.data.err);
          console.log(error.response.data)
        });
    }
  };
  if (user?.id) {
    return <Navigate to="/dashboard" replace={true} />;
  }
  if (!user?.id) {
    return (
      <>
        <div className="flex h-screen w-full bg-slate-100 justify-center items-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="w-[400px] py-5 px-5 bg-white rounded mx-5"
          >
            <div className="mb-5">
              <Heading>SignUp </Heading>
              <SubHeading>Get Your new Account</SubHeading>
            </div>
            <div className="my-5">
              <InputBox
                onChange={(e: {
                  target: { value: SetStateAction<string> };
                }) => {
                  setName(e.target.value);
                }}
                lable="Name"
                data="Jhon Chena"
                type="Text"
              />
              <InputBox
                onChange={(e: {
                  target: { value: SetStateAction<string> };
                }) => {
                  setEmail(e.target.value);
                }}
                lable="Email"
                data="example@gmail.com"
                type="email"
                error={error?.email}
              />


              <InputBox
                onChange={(e: {
                  target: { value: SetStateAction<string> };
                }) => {
                  setPassword(e.target.value);
                }}
                lable="Password"
                data="Password"
                type="password"
                error={error?.password}
              />
            </div>


            <Button data={"Signup"} onClick={handleSubmit} />
            <p className="pt-3">
              Already have an account <a href="/signin">Signin</a>
            </p>
          </form>
        </div>
      </>
    );
  }
}
