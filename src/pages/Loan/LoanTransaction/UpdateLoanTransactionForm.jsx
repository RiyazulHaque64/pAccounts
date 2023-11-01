import { TiTick } from "react-icons/ti";
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
import {
  useGetAccountsQuery,
  useUpdateAccountMutation,
} from "../../../redux/features/accounts/accountsApi";
import { useAddLoanTransactionMutation } from "../../../redux/features/Loan/LoanTransaction/LoanTransactionApi";

const UpdateLoanTransactionForm = ({ cancelUpdateForm, loanTransaction }) => {
  const {
    date: dateStr,
    borrowerName: name,
    transactionType: type,
    account: acc,
    amount: initialAmount,
  } = loanTransaction;
  const { user } = useContext(AuthContext);
  const { data: borrowers } = useGetBorrowersQuery(user?.email);
  const { data: accounts } = useGetAccountsQuery(user?.email);

  const [updateAccount] = useUpdateAccountMutation();
  const [updateBorrower] = useUpdateBorrowerMutation();
  const [postLoanTransaction] = useAddLoanTransactionMutation();

  const [transactionDate, setTransactionDate] = useState(new Date(dateStr));
  const [borrowerName, setBorrowerName] = useState(name);
  const [transactionType, setTransactionType] = useState(type);
  const [account, setAccount] = useState(acc);
  const [amount, setAmount] = useState(initialAmount);
  const [balanceError, setBalanceError] = useState("");

  const updateLoanTransactionFunc = (transactionInfo) => {
    postLoanTransaction(transactionInfo).then((data) => {
      if (data.data.insertedId) {
        toast.success("Successfully added a transaction");
        cancelUpdateForm();
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

  const updateLoanTransactionHandler = (e) => {
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
        updateLoanTransactionFunc(transactionInfo);
      } else {
        toast.error("Insufficient balance! Please, select another account");
      }
    }
    if (transactionType === "Taken Loan" || transactionType === "Return Loan") {
      updateLoanTransactionFunc(transactionInfo);
    }
  };

  const resetFormHandler = () => {
    setTransactionDate(new Date(dateStr));
    setBorrowerName(name);
    setTransactionType(type);
    setAccount(acc);
    setAmount(initialAmount);
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
    <form onSubmit={updateLoanTransactionHandler}>
      <div className="grid grid-cols-12 gap-2 py-2 px-3 bg-violet-50 rounded">
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
            onClick={cancelUpdateForm}
          />
          <IoMdRefresh
            className="w-5 h-5 cursor-pointer duration-200 text-yellow-600 hover:text-yellow-700"
            onClick={resetFormHandler}
          />
          <button type="submit">
            <TiTick className="w-5 h-5 cursor-pointer duration-200 text-violet-600 hover:text-violet-800" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdateLoanTransactionForm;
