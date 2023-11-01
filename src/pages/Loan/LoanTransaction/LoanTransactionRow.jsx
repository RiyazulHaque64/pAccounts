import { RiDeleteBin5Line } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import { useState } from "react";
import UpdateLoanTransactionForm from "./UpdateLoanTransactionForm";

const LoanTransactionRow = ({ loanTransaction }) => {
  const {
    date: dateStr,
    borrowerName,
    transactionType,
    account,
    amount,
  } = loanTransaction;
  const date = new Date(dateStr);
  const printDate =
    (date.getDate() < 9 ? "0" + date.getDate() : date.getDate()) +
    "-" +
    (date.getMonth() + 1 < 9
      ? "0" + date.getMonth() + 1
      : date.getMonth() + 1) +
    "-" +
    date.getFullYear();

  const [updateLoanTransaction, setUpdateLoanTransaction] = useState(false);

  const cancelUpdateForm = () => {
    setUpdateLoanTransaction(false);
  };

  return (
    <>
      {updateLoanTransaction ? (
        <UpdateLoanTransactionForm
          cancelUpdateForm={cancelUpdateForm}
          loanTransaction={loanTransaction}
        />
      ) : (
        <div className="grid grid-cols-12 py-2 px-3 border-b border-violet-50">
          <div className="col-span-2 px-2 text-center">
            <span className="text-gray-800">{printDate}</span>
          </div>
          <div className="col-span-2 px-2">
            <span className="text-gray-800">{borrowerName}</span>
          </div>
          <div className="col-span-2 px-2 text-center">
            <span className="text-gray-800">{transactionType}</span>
          </div>
          <div className="col-span-2 px-2 text-center">
            <span className="text-gray-800">{account}</span>
          </div>
          <div className="col-span-2 px-2 text-center">
            <span className="text-gray-800">{amount}</span>
            <span className="font-extrabold text-gray-700">&#2547;</span>
          </div>
          <div className="col-span-2 px-2 text-center flex items-center justify-center gap-3 py-1">
            <BiSolidEdit
              className="w-5 h-5 cursor-pointer duration-200 text-violet-600 hover:text-violet-800"
              title="Edit This Borrower"
            />
            <RiDeleteBin5Line
              className="w-5 h-5 cursor-pointer duration-200 text-red-500 hover:text-red-700"
              title="Delete This Borrower"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LoanTransactionRow;
