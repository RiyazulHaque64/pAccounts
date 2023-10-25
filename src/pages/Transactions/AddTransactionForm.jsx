import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { IoMdRefresh } from "react-icons/io";
import { HiMiniXMark } from "react-icons/hi2";
import ReactDatePicker from "react-datepicker";

const AddTransactionForm = () => {
  const [addSector, setAddSector] = useState(false);
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [transactionName, setTransactionName] = useState("");
  const [transactionSector, setTransactionSector] = useState("");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");

  const addTransactionHandler = (e) => {
    e.preventDefault();
    const accountInfo = {
      date: new Date(transactionDate),
      transactionName,
      transactionSector,
      account,
      amount,
    };
    console.log(accountInfo, typeof accountInfo.date);
    setAddSector(false);
    resetFormHandler();
  };

  const resetFormHandler = () => {
    setTransactionDate(new Date());
    setTransactionName("");
    setTransactionSector("");
    setAccount("");
  };

  const cancelAddForm = () => {
    setAddSector(false);
    resetFormHandler();
  };

  const amountFieldHandler = (e) => {
    setAmount(e.target.value);
  };
  return (
    <>
      {addSector ? (
        <form onSubmit={addTransactionHandler}>
          <div className="grid grid-cols-12 gap-1 py-2 px-3 bg-violet-50 rounded mt-6">
            <div className="col-span-2">
              <ReactDatePicker
                className="w-full bg-white py-1 px-2 text-gray-700 rounded outline-none border border-violet-100 focus:border-violet-300"
                selected={transactionDate}
                onChange={(date) => setTransactionDate(date)}
                dateFormat={"dd-MM-yyyy"}
                maxDate={new Date()}
                required
              />
            </div>
            <div className="col-span-3">
              <input
                className="w-full bg-white py-1 px-2 text-gray-700 rounded outline-none border border-violet-100 focus:border-violet-300"
                type="text"
                placeholder="Type your sector name"
                value={transactionName}
                onChange={(e) => setTransactionName(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2">
              <select
                className="w-full py-1 px-2 border border-violet-100 text-gray-600 outline-none appearance-none focus:border-violet-300 rounded"
                placeholder="Select Type"
                value={transactionSector}
                onChange={(e) => setTransactionSector(e.target.value)}
                required
              >
                <option className="text-gray-700" value="">
                  Select Sector
                </option>
                <option className="text-gray-700" value="income">
                  Food
                </option>
                <option className="text-gray-700" value="expense">
                  Education
                </option>
                <option className="text-gray-700" value="taken deposit">
                  Snacks
                </option>
                <option className="text-gray-700" value="given deposit">
                  Wastage
                </option>
              </select>
            </div>
            <div className="col-span-2">
              <select
                className="w-full py-1 px-2 border border-violet-100 text-gray-600 outline-none appearance-none focus:border-violet-300 rounded"
                placeholder="Select Type"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              >
                <option className="text-gray-700" value="">
                  Select Account
                </option>
                <option className="text-gray-700" value="islami bank">
                  Islami Bank
                </option>
                <option className="text-gray-700" value="bkash">
                  bKash
                </option>
                <option className="text-gray-700" value="nogod">
                  Nogod
                </option>
                <option className="text-gray-700" value="cash">
                  Cash
                </option>
              </select>
            </div>
            <div className="col-span-1">
              <input
                className="w-full bg-white py-1 px-2 text-gray-700 rounded outline-none border border-violet-100 focus:border-violet-300"
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={amountFieldHandler}
                required
              />
            </div>
            <div className="col-span-2 text-center flex items-center justify-center gap-3 py-1">
              <HiMiniXMark
                className="w-5 h-5 cursor-pointer duration-200 text-red-500 hover:text-red-700"
                onClick={cancelAddForm}
              />
              <IoMdRefresh
                className="w-5 h-5 cursor-pointer duration-200 text-yellow-600 hover:text-yellow-700"
                onClick={resetFormHandler}
              />
              <button type="submit">
                <FiPlus className="w-5 h-5 cursor-pointer duration-200 text-violet-600 hover:text-violet-800" />
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex justify-end mt-6">
          <button
            className={`bg-violet-100 text-violet-600 font-semibold px-4 py-2 uppercase text-sm rounded duration-200 hover:bg-violet-200 hover:text-violet-700`}
            onClick={() => setAddSector(true)}
          >
            Add Transaction
          </button>
        </div>
      )}
    </>
  );
};

export default AddTransactionForm;
