import { useContext, useState } from "react";
import { TiTick } from "react-icons/ti";
import { IoMdRefresh } from "react-icons/io";
import { HiMiniXMark } from "react-icons/hi2";
import ReactDatePicker from "react-datepicker";
import {
  useGetSectorsQuery,
  useUpdateSectorMutation,
} from "../../redux/features/sectors/sectorsApi";
import { AuthContext } from "../../provider/AuthProvider";
import {
  useGetAccountsQuery,
  useUpdateAccountMutation,
} from "../../redux/features/accounts/accountsApi";
import { useUpdateTransactionMutation } from "../../redux/features/transactions/transactionsApi";
import toast from "react-hot-toast";

const UpdateTransactionForm = ({ transaction, cancelUpdateForm }) => {
  const { user } = useContext(AuthContext);
  const {
    _id: transactionId,
    date: dateStr,
    transactionName: name,
    transactionSector: sector,
    account: acc,
    amount: initialAmount,
  } = transaction;
  const { data: sectors } = useGetSectorsQuery(user?.email);
  const { data: accounts } = useGetAccountsQuery(user?.email);
  const [updateTransaction, { isLoading }] = useUpdateTransactionMutation();
  const [updateSector] = useUpdateSectorMutation();
  const [updateAccount] = useUpdateAccountMutation();

  const [transactionDate, setTransactionDate] = useState(new Date(dateStr));
  const [transactionName, setTransactionName] = useState(name);
  const [transactionSector, setTransactionSector] = useState(sector);
  const [account, setAccount] = useState(acc);
  const [amount, setAmount] = useState(initialAmount);

  const {
    _id: prevSectorId,
    sectorType: prevSectorType,
    transaction: prevSectorTransaction,
  } = sectors?.find((sec) => sec.sectorName === sector) || {};
  const { _id: prevAccountId, balance: prevBalance } =
    accounts.find((prevAcc) => prevAcc.accountName === acc) || {};
  const {
    _id: selectedSectorId,
    sectorType: selectedSectorType,
    transaction: selectedSectorTransaction,
  } = sectors?.find((sec) => sec.sectorName === transactionSector) || {};
  const { _id: selectedAccountId, balance: selectedAccountBalance } =
    accounts.find((selectedAcc) => selectedAcc.accountName === account) || {};

  const updateTransactionFunc = (id, updatedData) => {
    updateTransaction({
      id: id,
      updatedTransaction: updatedData,
    }).then((data) => {
      if (data.data.modifiedCount > 0) {
        toast.success("Successfully updated the transaction!");
        cancelUpdateForm();
      }
    });
  };

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
      initialAmount === parseFloat(amount)
    ) {
      updateTransaction({
        id: transactionId,
        updatedTransaction: updatedTransaction,
      }).then((data) => {
        console.log(data.data);
        if (data.data.modifiedCount > 0) {
          toast.success("Successfully updated the transaction!");
          cancelUpdateForm();
        } else {
          toast.error("Nothing has been updated!");
          cancelUpdateForm();
        }
      });
    }
    if (
      sector === transactionSector &&
      acc === account &&
      initialAmount !== parseFloat(amount)
    ) {
      updateSector({
        id: prevSectorId,
        updatedInfo: {
          transaction:
            prevSectorTransaction - initialAmount + parseFloat(amount),
        },
      });
      if (prevSectorType === "income") {
        updateAccount({
          accountId: prevAccountId,
          data: { balance: prevBalance - initialAmount + parseFloat(amount) },
        });
      }
      if (prevSectorType === "expense") {
        updateAccount({
          accountId: prevAccountId,
          data: { balance: prevBalance + initialAmount - parseFloat(amount) },
        });
      }
      updateTransactionFunc(transactionId, updatedTransaction);
    }
    if (
      sector !== transactionSector &&
      acc === account &&
      initialAmount === parseFloat(amount)
    ) {
      updateSector({
        id: prevSectorId,
        updatedInfo: { transaction: prevSectorTransaction - initialAmount },
      });
      updateSector({
        id: selectedSectorId,
        updatedInfo: {
          transaction: selectedSectorTransaction + parseFloat(amount),
        },
      });
      updateTransactionFunc(transactionId, updatedTransaction);
    }
    if (
      sector === transactionSector &&
      acc !== account &&
      initialAmount !== parseFloat(amount)
    ) {
      updateSector({
        id: prevSectorId,
        updatedInfo: {
          transaction:
            prevSectorTransaction - initialAmount + parseFloat(amount),
        },
      });
      if (prevSectorType === "income") {
        updateAccount({
          accountId: prevAccountId,
          data: { balance: prevBalance - initialAmount },
        });
        updateAccount({
          accountId: selectedAccountId,
          data: { balance: selectedAccountBalance + parseFloat(amount) },
        });
      }
      if (prevSectorType === "expense") {
        updateAccount({
          accountId: prevAccountId,
          data: { balance: prevBalance + initialAmount },
        });
        updateAccount({
          accountId: selectedAccountId,
          data: { balance: selectedAccountBalance - parseFloat(amount) },
        });
      }
      updateTransactionFunc(transactionId, updatedTransaction);
    }
    if (
      sector === transactionSector &&
      acc !== account &&
      initialAmount === parseFloat(amount)
    ) {
      if (prevSectorType === "income") {
        updateAccount({
          accountId: prevAccountId,
          data: { balance: prevBalance - parseFloat(amount) },
        });
        updateAccount({
          accountId: selectedAccountId,
          data: { balance: selectedAccountBalance + parseFloat(amount) },
        });
      }
      if (prevSectorType === "expense") {
        updateAccount({
          accountId: prevAccountId,
          data: { balance: prevBalance + parseFloat(amount) },
        });
        updateAccount({
          accountId: selectedAccountId,
          data: { balance: selectedAccountBalance - parseFloat(amount) },
        });
      }
      updateTransactionFunc(transactionId, updatedTransaction);
    }
    if (
      sector !== transactionSector &&
      acc !== account &&
      initialAmount === parseFloat(amount)
    ) {
      updateSector({
        id: prevSectorId,
        updatedInfo: {
          transaction: prevSectorTransaction - parseFloat(amount),
        },
      });
      updateSector({
        id: selectedSectorId,
        updatedInfo: {
          transaction: selectedSectorTransaction + parseFloat(amount),
        },
      });
      if (prevSectorType === "income") {
        updateAccount({
          accountId: prevAccountId,
          data: { balance: prevBalance - parseFloat(amount) },
        });
      }
      if (prevSectorType === "expense") {
        updateAccount({
          accountId: prevAccountId,
          data: { balance: prevBalance + parseFloat(amount) },
        });
      }
      if (selectedSectorType === "income") {
        updateAccount({
          accountId: selectedAccountId,
          data: { balance: selectedAccountBalance + parseFloat(amount) },
        });
      }
      if (selectedSectorType === "expense") {
        updateAccount({
          accountId: selectedAccountId,
          data: { balance: selectedAccountBalance - parseFloat(amount) },
        });
      }
      updateTransactionFunc(transactionId, updatedTransaction);
    }
    if (
      sector !== transactionSector &&
      acc !== account &&
      initialAmount !== parseFloat(amount)
    ) {
      updateSector({
        id: prevSectorId,
        updatedInfo: {
          transaction: prevSectorTransaction - initialAmount,
        },
      });
      updateSector({
        id: selectedSectorId,
        updatedInfo: {
          transaction: selectedSectorTransaction + parseFloat(amount),
        },
      });
      if (prevSectorType === "income") {
        updateAccount({
          accountId: prevAccountId,
          data: { balance: prevBalance - initialAmount },
        });
      }
      if (prevSectorType === "expense") {
        updateAccount({
          accountId: prevAccountId,
          data: { balance: prevBalance + initialAmount },
        });
      }
      if (selectedSectorType === "income") {
        updateAccount({
          accountId: selectedAccountId,
          data: { balance: selectedAccountBalance + parseFloat(amount) },
        });
      }
      if (selectedSectorType === "expense") {
        updateAccount({
          accountId: selectedAccountId,
          data: { balance: selectedAccountBalance - parseFloat(amount) },
        });
      }
      updateTransactionFunc(transactionId, updatedTransaction);
    }
    if (
      sector !== transactionSector &&
      acc === account &&
      initialAmount !== parseFloat(amount)
    ) {
      updateSector({
        id: prevSectorId,
        updatedInfo: {
          transaction: prevSectorTransaction - initialAmount,
        },
      });
      updateSector({
        id: selectedSectorId,
        updatedInfo: {
          transaction: selectedSectorTransaction + parseFloat(amount),
        },
      });
      if (prevSectorType === "income") {
        updateAccount({
          accountId: prevAccountId,
          data: { balance: prevBalance - initialAmount },
        });
      }
      if (prevSectorType === "expense") {
        updateAccount({
          accountId: prevAccountId,
          data: { balance: prevBalance + initialAmount },
        });
      }
      if (selectedSectorType === "income") {
        updateAccount({
          accountId: prevAccountId,
          data: { balance: prevBalance + parseFloat(amount) },
        });
      }
      if (selectedSectorType === "expense") {
        updateAccount({
          accountId: prevAccountId,
          data: { balance: prevBalance - parseFloat(amount) },
        });
      }
      updateTransactionFunc(transactionId, updatedTransaction);
    }
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
          <button type="submit" disabled={isLoading}>
            <TiTick className="w-5 h-5 cursor-pointer duration-200 text-green-600 hover:text-green-800" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdateTransactionForm;
