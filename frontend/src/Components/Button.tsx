export default function Button({onClick,data}:{onClick:any,data:string}) {
  return (
  <button onClick={onClick} type="submit" className="border rounded-lg px-5 w-full text-white bg-gray-900 hover:bg-gray-950 py-2 text-sm md:text-xl focus:ring-4 focus:ring-gray-300" >{data}</button>
  )
}
