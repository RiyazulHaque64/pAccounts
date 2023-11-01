import { useContext, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { IoMdRefresh } from "react-icons/io";
import { HiMiniXMark } from "react-icons/hi2";
import ReactDatePicker from "react-datepicker";
import { useUpdateAccountMutation } from "../../redux/features/accounts/accountsApi";
import { AuthContext } from "../../provider/AuthProvider";
import {
  useGetSectorsQuery,
  useUpdateSectorMutation,
} from "../../redux/features/sectors/sectorsApi";
import { useAddTransactionMutation } from "../../redux/features/transactions/transactionsApi";
import toast from "react-hot-toast";
import AddAccountForm from "../Accounts/AddAccountForm";
import AddSectorForm from "../Sectors/AddSectorForm";
import ErrorTooltip from "../../components/ToolTip/ErrorTooltip";

const AddTransactionForm = ({ accounts, justifyCenter }) => {
  const { user } = useContext(AuthContext);
  const { data: sectors } = useGetSectorsQuery(user?.email);
  const [addTransaction] = useAddTransactionMutation();
  const [updateSector] = useUpdateSectorMutation();
  const [updateAccount] = useUpdateAccountMutation();

  const [addSector, setAddSector] = useState(false);
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [transactionName, setTransactionName] = useState("");
  const [transactionSector, setTransactionSector] = useState("");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [balanceError, setBalanceError] = useState("");

  const addTransactionFunc = (transactionInfo) => {
    addTransaction(transactionInfo).then((data) => {
      if (data.data.insertedId) {
        toast.success("Successfully added a transaction");
        setAddSector(false);
        resetFormHandler();
        const sector = sectors?.find(
          (sector) => sector.sectorName === transactionSector
        );
        const selectedAccount = accounts?.find(
          (acc) => acc.accountName === account
        );
        const updatedSector = {
          transaction: sector.transaction + parseFloat(amount),
        };
        updateSector({ id: sector._id, updatedInfo: updatedSector });
        if (sector?.sectorType === "income") {
          const updatedBalance = {
            balance: selectedAccount?.balance + parseFloat(amount),
          };
          updateAccount({
            accountId: selectedAccount?._id,
            data: updatedBalance,
          });
        }
        if (sector?.sectorType === "expense") {
          const updatedBalance = {
            balance: selectedAccount?.balance - parseFloat(amount),
          };
          updateAccount({
            accountId: selectedAccount?._id,
            data: updatedBalance,
          });
        }
      }
    });
  };

  const addTransactionHandler = (e) => {
    e.preventDefault();
    const transactionInfo = {
      user: user?.email,
      date: new Date(transactionDate),
      transactionName,
      transactionSector,
      account,
      amount: parseFloat(amount),
    };
    const selectedAccount = accounts?.find(
      (acc) => acc.accountName === account
    );
    const selectedSectorType = sectors?.find(
      (sec) => sec.sectorName === transactionSector
    )?.sectorType;

    if (selectedSectorType === "expense") {
      if (selectedAccount.balance > parseFloat(amount)) {
        addTransactionFunc(transactionInfo);
      } else {
        toast.error("Insufficient balance! Please, select another account");
      }
    }
    if (selectedSectorType === "income") {
      addTransactionFunc(transactionInfo);
    }
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

  const transactionAmountHandler = (e) => {
    setAmount(e.target.value);
    const selectedAccount = accounts.find((acc) => acc.accountName === account);
    const selectedSectorType = sectors?.find(
      (sec) => sec.sectorName === transactionSector
    )?.sectorType;

    if (selectedSectorType === "expense") {
      if (selectedAccount) {
        setBalanceError("");
        if (selectedAccount.balance < parseFloat(e.target.value)) {
          setBalanceError("Insufficient Balance!");
        } else {
          setBalanceError("");
          setAmount(e.target.value);
        }
      } else {
        setBalanceError("Please, select an account first!");
      }
    } else if (selectedSectorType === "income") {
      setBalanceError("");
      setAmount(e.target.value);
    } else {
      setBalanceError("Please, select a sector first!");
    }
  };

  return (
    <>
      {addSector ? (
        accounts?.length > 0 ? (
          sectors?.length > 0 ? (
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
                    {sectors?.map((sector) => (
                      <option key={sector._id} value={sector.sectorName}>
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
                <div className="col-span-1 relative">
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
            <div className="w-full flex justify-center my-10">
              <div className="w-full p-6">
                <p>Please, create a sector before adding a transaction</p>
                <AddSectorForm justifyCenter={true} parentSectors={[]} />
              </div>
            </div>
          )
        ) : (
          <div className="w-full flex justify-center my-10">
            <div className="w-full p-6">
              <p>Please, create an account before adding a transaction</p>
              <AddAccountForm justifyCenter={true} />
            </div>
          </div>
        )
      ) : (
        <div
          className={`flex ${
            justifyCenter ? "justify-center" : "justify-end"
          } mt-6`}
        >
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
