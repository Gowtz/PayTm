import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import URL from "./URL";
import type { node } from "./Types";

interface usr {
  id: string;
  name?: string;
  email?: string;
}


const UserContext = createContext<any>(null);


export default function UserContexts({ children }: node) {
  const [user, setUser] = useState<usr | null>(null);
  useEffect(() => {
    const fetch = async() => {
      await axios
        .get(`${URL}/api/v1/user/current`, {
          withCredentials: true,
        })
        .then((data) => setUser(data.data));
    };
    fetch()
  }, []);
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </>
  );
}

export const useAuth = () => useContext(UserContext);
