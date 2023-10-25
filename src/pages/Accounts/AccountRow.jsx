import { RiDeleteBin5Line } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import { useState } from "react";
import UpdateAccountForm from "./UpdateAccountForm";

const AccountRow = () => {
  const [updateAccount, setUpdateAccount] = useState(false);

  const cancelUpdateForm = () => {
    setUpdateAccount(false);
  };

  return (
    <>
      {updateAccount ? (
        <UpdateAccountForm cancelUpdateForm={cancelUpdateForm} />
      ) : (
        <div className="grid grid-cols-12 py-2 px-3 border-b border-violet-50">
          <div className="col-span-6 px-2">
            <span className="text-gray-800">Wallet</span>
          </div>
          <div className="col-span-2 px-2 text-center">
            <span className="bg-violet-100 text-violet-600 font-semibold py-1 px-3 rounded">
              Cash
            </span>
          </div>
          <div className="col-span-2 px-2 text-right">
            <span className="text-gray-800">
              18370{" "}
              <span className="font-extrabold text-gray-600">&#2547;</span>
            </span>
          </div>
          <div className="col-span-2 px-2 text-center flex items-center justify-center gap-3 py-1">
            <BiSolidEdit
              className="w-5 h-5 cursor-pointer duration-200 text-violet-600 hover:text-violet-800"
              onClick={() => setUpdateAccount(true)}
            />
            <RiDeleteBin5Line className="w-5 h-5 cursor-pointer duration-200 text-red-500 hover:text-red-700" />
          </div>
        </div>
      )}
    </>
  );
};

export default AccountRow;
