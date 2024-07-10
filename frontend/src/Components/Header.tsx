import { useAuth } from "../Utils/UserContext"
import Avatar from "./Avatar"
import Heading from "./Heading"


export default function Header() {
    const {user} = useAuth()
  return (
  <>
  <header className="px-20 border-b-2">
    <nav className="flex justify-between items-center py-7 h-24 w-full">
        <div className="logo"><Heading>Paytm</Heading></div>

        <div className="text-2xl flex  gap-10 items-center">
            Hello! <Avatar>{user.name[0]}</Avatar>
        </div>

    </nav>
  </header>
  </>
  )
}
