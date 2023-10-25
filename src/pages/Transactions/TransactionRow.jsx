import { RiDeleteBin5Line } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import { useState } from "react";
import UpdateTransactionForm from "./UpdateTransactionForm";

const TransactionRow = () => {
  const [updateTransaction, setUpdateTransaction] = useState(false);

  const cancelUpdateForm = () => {
    setUpdateTransaction(false);
  };

  return (
    <>
      {updateTransaction ? (
        <UpdateTransactionForm cancelUpdateForm={cancelUpdateForm} />
      ) : (
        <div className="grid grid-cols-12 py-2 px-3 border-b border-violet-50">
          <div className="col-span-2 px-2 text-center">
            <span className="text-gray-800">16-11-2023</span>
          </div>
          <div className="col-span-3 px-2">
            <span className="text-gray-800">Sallery</span>
          </div>
          <div className="col-span-2 px-2 text-center">
            <span className="text-gray-800">Job</span>
          </div>
          <div className="col-span-2 px-2 text-center">
            <span className="bg-violet-100 text-violet-600 font-semibold py-1 px-3 rounded">
              Islami Bank
            </span>
          </div>
          <div className="col-span-1 px-2 text-right">
            <span className="text-gray-700">
              120000
              <span className="font-extrabold text-gray-700">&#2547;</span>
            </span>
          </div>
          <div className="col-span-2 px-2 text-center flex items-center justify-center gap-3 py-1">
            <BiSolidEdit
              className="w-5 h-5 cursor-pointer duration-200 text-violet-600 hover:text-violet-800"
              title="Edit This Sector"
              onClick={() => setUpdateTransaction(true)}
            />
            <RiDeleteBin5Line
              className="w-5 h-5 cursor-pointer duration-200 text-red-500 hover:text-red-700"
              title="Delete This Sector"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionRow;
