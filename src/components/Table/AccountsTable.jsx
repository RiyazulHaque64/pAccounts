import { RiDeleteBin5Line } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import AddAccountForm from "../Form/AddAccountForm";
import AccountRow from "../AccountRow/AccountRow";

const AccountsTable = () => {
  return (
    <div>
      <div className="mb-4">
        <h2>Accounts Table summery</h2>
      </div>
      <div>
        <div className="grid grid-cols-12 py-2 px-3 bg-violet-50 rounded">
          <div className="col-span-6 px-2">
            <span className="text-gray-700 font-semibold">Name</span>
          </div>
          <div className="col-span-2 px-2 text-center">
            <span className="text-gray-700 font-semibold">Type</span>
          </div>
          <div className="col-span-2 px-2 text-right">
            <span className="text-gray-700 font-semibold">Balance</span>
          </div>
          <div className="col-span-2 px-2 text-center">
            <span className="text-gray-700 font-semibold">Action</span>
          </div>
        </div>
        <div className="grid grid-cols-12 py-2 px-3 border-b border-violet-50">
          <div className="col-span-6 px-2">
            <span className="text-gray-800">Islami Bank Bangladesh ltd.</span>
          </div>
          <div className="col-span-2 px-2 text-center">
            <span className="bg-green-100 text-green-600 font-semibold py-1 px-3 rounded">
              Bank
            </span>
          </div>
          <div className="col-span-2 px-2 text-right">
            <span className="text-gray-800">
              18370{" "}
              <span className="font-extrabold text-gray-600">&#2547;</span>
            </span>
          </div>
          <div className="col-span-2 px-2 text-center flex items-center justify-center gap-3 py-1">
            <BiSolidEdit className="w-5 h-5 cursor-pointer duration-200 text-violet-600 hover:text-violet-800" />
            <RiDeleteBin5Line className="w-5 h-5 cursor-pointer duration-200 text-red-500 hover:text-red-700" />
          </div>
        </div>
        <AccountRow />
        <div className="grid grid-cols-12 py-2 px-3 border-b border-violet-50">
          <div className="col-span-6 px-2">
            <span className="text-gray-800">bKash</span>
          </div>
          <div className="col-span-2 px-2 text-center">
            <span className="bg-pink-100 text-pink-600 font-semibold py-1 px-3 rounded">
              Mobile Banking
            </span>
          </div>
          <div className="col-span-2 px-2 text-right">
            <span className="text-gray-800">
              18370{" "}
              <span className="font-extrabold text-gray-600">&#2547;</span>
            </span>
          </div>
          <div className="col-span-2 px-2 text-center flex items-center justify-center gap-3 py-1">
            <BiSolidEdit className="w-5 h-5 cursor-pointer duration-200 text-violet-600 hover:text-violet-800" />
            <RiDeleteBin5Line className="w-5 h-5 cursor-pointer duration-200 text-red-500 hover:text-red-700" />
          </div>
        </div>
        <AddAccountForm />
      </div>
    </div>
  );
};

export default AccountsTable;
