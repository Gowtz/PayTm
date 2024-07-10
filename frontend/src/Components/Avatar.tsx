import { node } from "../Utils/Types";

export default function Avatar({children}:node) {
  return (
    <div className=" bg-slate-300 w-16 h-16 p-5 flex justify-center items-center rounded-full">
        <div className="text-4xl">{(children as String).toUpperCase()}</div>
    </div>
  )
}
