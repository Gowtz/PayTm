import { useState ,SetStateAction} from "react";
import axios from "axios";
import Button from "../Components/Button";
import Heading from "../Components/Heading";
import InputBox from "../Components/InputBox";
import { useAuth } from "../Utils/UserContext";
import { Navigate } from "react-router-dom";
import URLS from "../Utils/URL";


export default function SignIn() {
    const { user, setUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError]=useState({ email: "", password: "" })
    const handleSubmit = async () => {
  
        if ( email != "" || password != "") {
          await axios
            .post(
                `${URLS}/api/v1/user/signin`,
              {  
                email,
                password,
              },
              {
                withCredentials: true,
              }
            )
            .then((data) => {setUser(data.data);
                if(data.data){
              setEmail("");
              setPassword("")
                }
              console.log(data);
              
            }).catch(error => {setError(error.response?.data.err)
              console.log(error.response.data.err)
            }
            );
        }
      };
      if(user?.id){
        return <Navigate to="/dashboard" replace={true} />
      }
      if(!user?.id){
  return (
    <>
      <div className="flex h-screen w-full bg-slate-100 justify-center items-center">
        <form onSubmit={e=>e.preventDefault()} className="w-[400px] py-5 px-5 bg-white rounded mx-5">
          <div className="mb-5">
            <Heading>SignIn to you Account</Heading>
          </div>
          <div className="my-5">

          <InputBox onChange={(e: { target: { value: SetStateAction<string>; }; })=>{setEmail(e.target.value)}} lable="Email" data="example@gmail.com" type="email" error={error?.email}/>
          <InputBox onChange={(e: { target: { value: SetStateAction<string>; }; })=>{setPassword(e.target.value)}} lable="Password" data="Password" type="password" error={error?.password}/>
          </div>
          <Button onClick={handleSubmit} data={"SignIn"} />
          <p className="pt-3">Dont Have An Account? <a href="/signup">Signup</a></p>
        </form>
      </div>
    </>
  );
}
}