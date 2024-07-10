export default function InputBox({onChange,lable,data,type,error}:{onChange:any,lable:string,data:string,type:string,error:string}) {
  return (
    <>
  <label className="text-2xl">{lable}</label>
  <input onChange={onChange} className="w-full h-12 text-xl px-3 py-2 my-2 border-2 border-slate-300 rounded-md" type={type} placeholder={data}/>
    <p className="text-red-600 mb-5">{error}</p>
    </>
  )
}
