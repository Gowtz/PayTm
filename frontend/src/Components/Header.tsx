import { useNavigate } from "react-router-dom"
import { useAuth } from "../Utils/UserContext"
import Avatar from "./Avatar"
import Button from "./Button"
import Heading from "./Heading"
import axios from 'axios'
import URLS from "../Utils/URL"


export default function Header() {

    const {user,setUser} = useAuth()
    const navigate = useNavigate() 
    const logout = async()=>{
      await axios.post(`${URLS}/api/v1/user/logout`,{},{
        withCredentials:true
      }).then(()=>{navigate('/'),setUser("")})
    }
  return (
  <>
  <header className="px-7 md:px-20 border-b-2">
    <nav className="flex justify-between items-center py-7 h-24 w-full">
        <div className="logo"><Heading>Paytm</Heading></div>

        <div className="text-2xl flex  gap-5 items-center">




           <Avatar>{user.name[0]}</Avatar>
           <Button onClick={()=>{logout() }} data="Logout"/>




            
        </div>

    </nav>
  </header>
  </>
  )
}
