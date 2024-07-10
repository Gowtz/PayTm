import { node } from "../Utils/Types";

export default function Heading({children}:node) {
  return (
  <h1 className="text-3xl font-semibold ">{children}</h1>
  )
}
