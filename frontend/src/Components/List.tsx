import Avatar from "./Avatar";
import Button from "./Button";
import SubHeading from "./SubHeading";

export default function List({ keys, name,sendMoney }: any) {
  return (
    <>
      <li key={keys} className="flex justify-between h-20 w-full items-center">
        <div className="flex  gap-5 md:gap-10 items-center">
          <Avatar>{name[0]}</Avatar>
          <SubHeading>{name}</SubHeading>
        </div>
        <div className="flex  justify-center h-full items-center">
          <Button onClick={() => {sendMoney(keys,name)}} data={"Send Money"} />
        </div>
      </li>
    </>
  );
}
