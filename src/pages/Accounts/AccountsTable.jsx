import { RiDeleteBin5Line } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import AddAccountForm from "./AddAccountForm";
import AccountRow from "./AccountRow";

const AccountsTable = () => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-3 mb-4">
        <div className="col-span-3 flex justify-between bg-green-100 p-4 rounded">
          <h4 className="text-green-600">Bank Balance</h4>
          <span className="text-green-600">
            120000
            <span className="font-extrabold text-green-600">&#2547;</span>
          </span>
        </div>
        <div className="col-span-3 flex justify-between bg-pink-50 p-4 rounded">
          <h4 className="text-pink-600">Mobile Banking Balance</h4>
          <span className="text-pink-600">
            120000
            <span className="font-extrabold text-pink-600">&#2547;</span>
          </span>
        </div>
        <div className="col-span-3 flex justify-between bg-violet-100 p-4 rounded">
          <h4 className="text-violet-600">Cash Balance</h4>
          <span className="text-violet-600">
            120000
            <span className="font-extrabold text-violet-600">&#2547;</span>
          </span>
        </div>
        <div className="col-span-3 flex justify-between bg-yellow-50 p-4 rounded">
          <h4 className="text-yellow-600">Loan Balance</h4>
          <span className="text-yellow-600">
            120000
            <span className="font-extrabold text-yellow-600">&#2547;</span>
          </span>
        </div>
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
