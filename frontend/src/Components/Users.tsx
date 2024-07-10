import { useNavigate } from "react-router-dom";
import List from "./List";
export default function Users({users}:any) {
  const navigate = useNavigate();
  const sendMoney=(keys:any,name:string)=>{
    navigate(`/transfer?id=${keys}&name=${name}`)
  }
  return (
  <>
   <div className=" mt-5 px-12 w-full flex justify-center ">
            <ul className="flex flex-col justify-center w-full gap-5">
              {users?.map((ele:any) => ( <List keys={ele.id} name={ele?.name} sendMoney={sendMoney}/>
              ))}
            </ul>
          </div>
  </>
  )
}
