import { useContext, useState } from "react";
import { TiTick } from "react-icons/ti";
import { IoMdRefresh } from "react-icons/io";
import { HiMiniXMark } from "react-icons/hi2";
import ReactDatePicker from "react-datepicker";
import { useGetSectorsQuery } from "../../redux/features/sectors/sectorsApi";
import { AuthContext } from "../../provider/AuthProvider";
import { useGetAccountsQuery } from "../../redux/features/accounts/accountsApi";

const UpdateTransactionForm = ({ transaction, cancelUpdateForm }) => {
  const { user } = useContext(AuthContext);
  const {
    date: dateStr,
    transactionName: name,
    transactionSector: sector,
    account: acc,
    amount: initialAmount,
  } = transaction;
  const { data: sectors } = useGetSectorsQuery(user?.email);
  const { data: accounts } = useGetAccountsQuery(user?.email);
  console.log(accounts);

  const [transactionDate, setTransactionDate] = useState(new Date(dateStr));
  const [transactionName, setTransactionName] = useState(name);
  const [transactionSector, setTransactionSector] = useState(sector);
  const [account, setAccount] = useState(acc);
  const [amount, setAmount] = useState(initialAmount);

  const updateTransactionHandler = (e) => {
    e.preventDefault();
    const updatedTransaction = {
      date: transactionDate,
      transactionName,
      transactionSector,
      account,
      amount: parseFloat(amount),
    };
    if (
      sector === transactionSector &&
      acc === account &&
      initialAmount === amount
    ) {
      // sector api call kora lagebena
      // account api call kora lagbena
    }
    if (
      sector === transactionSector &&
      acc === account &&
      initialAmount !== amount
    ) {
      // sector ber korte hobe & ager amount minus kore notun amoun add korte hobe
      // account ber korte hobe & sector type er upor depend kore ager amount minus kore notun notun amount add korte hobe or ager amount add kore notun amount minus korte hobe
    }
    if (
      sector !== transactionSector &&
      acc === account &&
      initialAmount === amount
    ) {
      // ager sector ber korte hobe & amount minus korte hobe
      // notun sector ber kore sekhane amount add korte hobe
    }
    if (
      sector === transactionSector &&
      acc !== account &&
      initialAmount !== amount
    ) {
      // sector ber korte hobe & ager amount minus kore notun amount add korte hobe
      // sector type er upor depend kore ager account calculation korte hobe
      // sector type er upor depend kore notun account calculation korte hobe
    }
    if (
      sector === transactionSector &&
      acc !== account &&
      initialAmount === amount
    ) {
      // sector ber korte hobe then sector type er upor depend kore old account calculation korte hobe & new account calculation korte hobe
    }
    if (
      sector !== transactionSector &&
      acc !== account &&
      initialAmount === amount
    ) {
      // old sector ber kore sekhane amount minus korte hobe
      // old sector type er upor depand kore old account calculation korte hobe
      // new sector e amount add korte hobe
      // new sector er upor depand kore new account e amount calculation korte hobe
    }
    resetFormHandler();
  };

  const resetFormHandler = () => {
    setTransactionDate(new Date(dateStr));
    setTransactionName(name);
    setTransactionSector(sector);
    setAccount(acc);
    setAmount(initialAmount);
  };

  return (
    <form onSubmit={updateTransactionHandler}>
      <div className="grid grid-cols-12 py-2 px-3 bg-violet-50 rounded">
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
            {sectors?.map((sector) => (
              <option
                className="text-gray-700"
                key={sector._id}
                value={sector.sectorName}
              >
                {sector.sectorName}
              </option>
            ))}
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
            {accounts?.map((acc) => (
              <option
                className="text-gray-700 capitalize"
                key={acc._id}
                value={acc.accountName}
              >
                {acc.accountName}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-1">
          <input
            className="w-full bg-white py-1 px-2 text-gray-700 rounded outline-none border border-violet-100 focus:border-violet-300"
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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

export default UpdateTransactionForm;
