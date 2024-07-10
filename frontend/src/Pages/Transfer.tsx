import { SetStateAction, useState } from "react";
import Heading from "../Components/Heading";
import InputBox from "../Components/InputBox";
import Button from "../Components/Button";
import axios from "axios";
import URLS from "../Utils/URL";
import { useNavigate, useSearchParams } from "react-router-dom";
export default function Transfer() {
  const navigate = useNavigate();
  const [error,setError]= useState("")
  const [amount, setAmount] = useState<number>(0);
  const [search_params] = useSearchParams();
  const to = search_params.get("id");
  const Name = search_params.get("name");
  const transferMoney = async () => {
    if (amount > 1) {
      await axios
        .post(
          `${URLS}/api/v1/account/transaction`,
          {
            amount,
            to,
          },
          {
            withCredentials: true,
          }
        )
        .then((data) => {navigate("/dashboard")
          console.log(data)
          setError("");
        }).catch(err=>setError(err?.response.data.msg))
    }
  };
  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="card ">
          <Heading>Send Money to {Name}</Heading>
          <InputBox
            onChange={(e: {
              target: { value: SetStateAction<Number | undefined> };
            }) => {
                        {/* @ts-ignore */}
              setAmount(e.target.value);
            }}
            lable={""}
            data={"$69"}
            type={"number"}
          />
          {/* @ts-ignore */}
          <p className="py-1 text-red-600">{error}</p>
          <Button onClick={() => transferMoney()} data="Send Now" />
        </div>
      </div>
    </>
  );
}
