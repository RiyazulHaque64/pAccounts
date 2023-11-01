import { FiPlus } from "react-icons/fi";
import { IoMdRefresh } from "react-icons/io";
import { HiMiniXMark } from "react-icons/hi2";
import ReactDatePicker from "react-datepicker";
import { useContext, useState } from "react";
import {
  useGetBorrowersQuery,
  useUpdateBorrowerMutation,
} from "../../../redux/features/Loan/borrower/borrowerApi";
import { AuthContext } from "../../../provider/AuthProvider";
import ErrorTooltip from "../../../components/ToolTip/ErrorTooltip";
import toast from "react-hot-toast";
import { useUpdateAccountMutation } from "../../../redux/features/accounts/accountsApi";
import { useAddLoanTransactionMutation } from "../../../redux/features/Loan/LoanTransaction/LoanTransactionApi";

const AddLoanTransactionForm = ({ justifyCenter, accounts }) => {
  const { user } = useContext(AuthContext);
  const { data: borrowers } = useGetBorrowersQuery(user?.email);

  const [updateAccount] = useUpdateAccountMutation();
  const [updateBorrower] = useUpdateBorrowerMutation();
  const [postLoanTransaction] = useAddLoanTransactionMutation();

  const [addLoanTransaction, setAddLoanTransaction] = useState(false);
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [borrowerName, setBorrowerName] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");
  const [balanceError, setBalanceError] = useState("");

  const addLoanTransactionFunc = (transactionInfo) => {
    postLoanTransaction(transactionInfo).then((data) => {
      if (data.data.insertedId) {
        toast.success("Successfully added a transaction");
        setAddLoanTransaction(false);
        resetFormHandler();
        const selectedBorrower = borrowers?.find(
          (borrower) => borrower.borrowerName === borrowerName
        );
        const selectedAccount = accounts?.find(
          (acc) => acc.accountName === account
        );

        if (
          transactionType === "Taken Loan" ||
          transactionType === "Return Loan"
        ) {
          const updatedBalance = {
            balance: selectedAccount?.balance + parseFloat(amount),
          };
          const loanAmountBalance = {
            loanAmount: selectedBorrower?.loanAmount - parseFloat(amount),
          };
          updateBorrower({
            id: selectedBorrower?._id,
            data: loanAmountBalance,
          });
          updateAccount({
            accountId: selectedAccount?._id,
            data: updatedBalance,
          });
        }
        if (
          transactionType === "Given Loan" ||
          transactionType === "Pay Loan"
        ) {
          const updatedBalance = {
            balance: selectedAccount?.balance - parseFloat(amount),
          };
          const loanAmountBalance = {
            loanAmount: selectedBorrower?.loanAmount + parseFloat(amount),
          };
          updateBorrower({
            id: selectedBorrower?._id,
            data: loanAmountBalance,
          });
          updateAccount({
            accountId: selectedAccount?._id,
            data: updatedBalance,
          });
        }
      }
    });
  };

  const addLoanTransactionHandler = (e) => {
    e.preventDefault();
    const transactionInfo = {
      user: user?.email,
      date: new Date(transactionDate),
      borrowerName,
      transactionType,
      account,
      amount: parseFloat(amount),
    };
    const selectedAccount = accounts?.find(
      (acc) => acc.accountName === account
    );

    if (transactionType === "Given Loan" || transactionType === "Pay Loan") {
      if (selectedAccount.balance > parseFloat(amount)) {
        addLoanTransactionFunc(transactionInfo);
      } else {
        toast.error("Insufficient balance! Please, select another account");
      }
    }
    if (transactionType === "Taken Loan" || transactionType === "Return Loan") {
      addLoanTransactionFunc(transactionInfo);
    }
  };

  const resetFormHandler = () => {
    setTransactionDate(new Date());
    setBorrowerName("");
    setTransactionType("");
    setAccount("");
    setAmount("");
  };

  const cancelAddForm = () => {
    setAddLoanTransaction(false);
    resetFormHandler();
  };

  const transactionAmountHandler = (e) => {
    setAmount(e.target.value);
    const selectedAccount = accounts.find((acc) => acc.accountName === account);

    if (transactionType === "Given Loan" || transactionType === "Pay Loan") {
      if (selectedAccount) {
        setBalanceError("");
        if (selectedAccount.balance < parseFloat(e.target.value)) {
          setBalanceError("Insufficient Balance!");
        } else {
          setBalanceError("");
          setAmount(e.target.value);
        }
      } else {
        setBalanceError("Please, select an account!");
      }
    } else if (
      transactionType === "Taken Loan" ||
      transactionType === "Return Loan"
    ) {
      setBalanceError("");
      setAmount(e.target.value);
    } else {
      setBalanceError("Please, select a transaction type first!");
    }
  };

  return (
    <>
      {addLoanTransaction ? (
        <form onSubmit={addLoanTransactionHandler}>
          <div className="grid grid-cols-12 gap-2 py-2 px-3 bg-violet-50 rounded mt-6">
            <div className="col-span-1">
              <ReactDatePicker
                className="bg-white py-1 px-2 text-gray-700 rounded outline-none border border-violet-100 focus:border-violet-300 w-full"
                selected={transactionDate}
                onChange={(date) => setTransactionDate(date)}
                dateFormat={"dd-MM-yyyy"}
                maxDate={new Date()}
                required
              />
            </div>
            <div className="col-span-3">
              <select
                className="w-full py-1 px-2 border border-violet-100 text-gray-600 outline-none appearance-none focus:border-violet-300 rounded"
                placeholder="Select Type"
                value={borrowerName}
                onChange={(e) => setBorrowerName(e.target.value)}
                required
              >
                <option className="text-gray-700" value="">
                  Select Name
                </option>
                {borrowers?.map((borrower) => (
                  <option key={borrower._id} value={borrower.borrowerName}>
                    {borrower.borrowerName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <select
                className="w-full py-1 px-2 border border-violet-100 text-gray-600 outline-none appearance-none focus:border-violet-300 rounded"
                placeholder="Select Type"
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
                required
              >
                <option className="text-gray-700" value="">
                  Transaction Type
                </option>
                <option className="text-gray-700" value="Taken Loan">
                  Taken Loan
                </option>
                <option className="text-gray-700" value="Given Loan">
                  Given Loan
                </option>
                <option className="text-gray-700" value="Pay Loan">
                  Pay Loan
                </option>
                <option className="text-gray-700" value="Return Loan">
                  Return Loan
                </option>
              </select>
            </div>
            <div className="col-span-2">
              <select
                className="w-full py-1 px-2 border border-violet-100 text-gray-600 outline-none appearance-none focus:border-violet-300 rounded"
                placeholder="Select Type"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                required
              >
                <option className="text-gray-700" value="">
                  Select Account
                </option>
                {accounts?.map((account) => (
                  <option key={account._id} value={account.accountName}>
                    {account.accountName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2 relative">
              <input
                className="w-full bg-white py-1 px-2 text-gray-700 rounded outline-none border border-violet-100 focus:border-violet-300"
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={transactionAmountHandler}
                required
              />
              {balanceError.length > 0 && amount.length > 0 && (
                <ErrorTooltip error={balanceError} />
              )}
            </div>
            <div className="col-span-2 px-2 text-center flex items-center justify-center gap-3 py-1">
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
        <div
          className={`flex ${
            justifyCenter ? "justify-center" : "justify-end"
          } mt-6`}
        >
          <button
            className={`bg-violet-100 text-violet-600 font-semibold px-4 py-2 uppercase text-sm rounded duration-200 hover:bg-violet-200 hover:text-violet-700`}
            onClick={() => setAddLoanTransaction(true)}
          >
            Add Transaction
          </button>
        </div>
      )}
    </>
  );
};

export default AddLoanTransactionForm;
