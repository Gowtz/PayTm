import { node } from "../Utils/Types";

export default function SubHeading({children}:node) {
  return (
  <h3 className="text-xl py-3">{children}</h3>
  )
}
