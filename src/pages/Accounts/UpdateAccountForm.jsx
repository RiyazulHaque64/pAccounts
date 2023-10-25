import { useState } from "react";
import { TiTick } from "react-icons/ti";
import { IoMdRefresh } from "react-icons/io";
import { HiMiniXMark } from "react-icons/hi2";

const UpdateAccountForm = ({ cancelUpdateForm }) => {
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [initialBalance, setInitialBalance] = useState("");

  const addAccountHandler = (e) => {
    e.preventDefault();
    const accountInfo = {
      accountName,
      accountType,
      initialBalance,
    };
    console.log(accountInfo);
    resetFormHandler();
  };

  const resetFormHandler = () => {
    setAccountName("");
    setAccountType("");
    setInitialBalance("");
  };

  return (
    <form onSubmit={addAccountHandler}>
      <div className="grid grid-cols-12 py-2 px-3 bg-violet-50 rounded">
        <div className="col-span-6 px-2">
          <input
            className="w-full bg-white py-1 px-2 text-gray-700 rounded outline-none border border-violet-100 focus:border-violet-300"
            type="text"
            placeholder="Type your accounts name"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            required
          />
        </div>
        <div className="col-span-2 px-2">
          <select
            className="w-full py-1 px-2 border border-violet-100 text-gray-600 outline-none appearance-none focus:border-violet-300 rounded"
            placeholder="Select Type"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            required
          >
            <option className="text-gray-700" value="">
              Select Account Type
            </option>
            <option className="text-gray-700" value="bank">
              Bank
            </option>
            <option className="text-gray-700" value="mobile bank">
              Mobile Bank
            </option>
            <option className="text-gray-700" value="cash">
              Cash
            </option>
            <option className="text-gray-700" value="loan">
              Loan
            </option>
          </select>
        </div>
        <div className="col-span-2 px-2">
          <input
            className="w-full bg-white py-1 px-2 text-gray-700 rounded outline-none border border-violet-100 focus:border-violet-300"
            type="number"
            placeholder="Initial Balance"
            value={initialBalance}
            onChange={(e) => setInitialBalance(e.target.value)}
            required
          />
        </div>
        <div className="col-span-2 px-2 text-center flex items-center justify-center gap-3 py-1">
          <HiMiniXMark
            className="w-5 h-5 cursor-pointer duration-200 text-red-500 hover:text-red-700"
            onClick={cancelUpdateForm}
          />
          <IoMdRefresh
            className="w-5 h-5 cursor-pointer duration-200 text-yellow-600 hover:text-yellow-700"
            onClick={resetFormHandler}
          />
          <button type="submit">
            <TiTick className="w-5 h-5 cursor-pointer duration-200 text-green-600 hover:text-green-800" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdateAccountForm;
