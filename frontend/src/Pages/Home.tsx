import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";

export default function Home() {
  const navigate = useNavigate()
  return (
  <>
  <div className="h-screen w-full flex flex-col justify-center items-center">
<h1 className="text-8xl md:text-[15rem] font-bold">Paytm</h1>
<div className="flex flex-col lg:flex-row gap-10 mt-10 w-full px-16 md:w-1/5">

  <Button onClick={()=>{navigate('/signin')} } data={"Signin"}/>
  <Button onClick={()=>{navigate('/signup')} } data={"Signup"}/>
</div>
  </div>

  </>
  )
}
