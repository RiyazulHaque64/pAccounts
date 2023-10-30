import TransactionRow from "./TransactionRow";
import AddTransactionForm from "./AddTransactionForm";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useGetTransactionsQuery } from "../../redux/features/transactions/transactionsApi";
import Loader from "../../components/Loader/Loader";
import { useGetAccountsQuery } from "../../redux/features/accounts/accountsApi";

const TransactionsTable = () => {
  const { user } = useContext(AuthContext);
  const {
    data: transactions,
    isLoading,
    isError,
  } = useGetTransactionsQuery(user?.email);
  const { data: accounts } = useGetAccountsQuery(user?.email);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="text-red-500">There was an error!</div>
      ) : transactions.length > 0 ? (
        <div>
          <div className="grid grid-cols-12 gap-3 mb-4">
            {accounts?.map((account) => (
              <div
                key={account._id}
                className={`col-span-3 flex justify-between p-4 rounded ${
                  account.accountType === "bank"
                    ? "bg-green-100"
                    : account.accountType === "cash"
                    ? "bg-violet-100"
                    : account.accountType === "mobile-bank"
                    ? "bg-pink-100"
                    : "bg-gray-100"
                }`}
              >
                <h4
                  className={`text-sm ${
                    account.accountType === "bank"
                      ? "text-green-600"
                      : account.accountType === "cash"
                      ? "text-violet-600"
                      : account.accountType === "mobile-bank"
                      ? "text-pink-600"
                      : "text-gray-600"
                  }`}
                >
                  {account.accountName}
                </h4>
                <span
                  className={`text-sm ${
                    account.accountType === "bank"
                      ? "text-green-600"
                      : account.accountType === "cash"
                      ? "text-violet-600"
                      : account.accountType === "mobile-bank"
                      ? "text-pink-600"
                      : "text-gray-600"
                  }`}
                >
                  {account.balance}
                  <span
                    className={`font-extrabold ${
                      account.accountType === "bank"
                        ? "text-green-600"
                        : account.accountType === "cash"
                        ? "text-violet-600"
                        : account.accountType === "mobile-bank"
                        ? "text-pink-600"
                        : "text-gray-600"
                    }`}
                  >
                    &#2547;
                  </span>
                </span>
              </div>
            ))}
          </div>
          <div>
            <div className="grid grid-cols-12 py-2 px-3 bg-violet-50 rounded">
              <div className="col-span-2 px-2 text-center">
                <span className="text-gray-700 font-semibold">Date</span>
              </div>
              <div className="col-span-3 px-2">
                <span className="text-gray-700 font-semibold">Description</span>
              </div>
              <div className="col-span-2 px-2 text-center">
                <span className="text-gray-700 font-semibold">Sector</span>
              </div>
              <div className="col-span-2 px-2 text-center">
                <span className="text-gray-700 font-semibold">Account</span>
              </div>
              <div className="col-span-1 px-2 text-right">
                <span className="text-gray-700 font-semibold">Amount</span>
              </div>
              <div className="col-span-2 px-2 text-center">
                <span className="text-gray-700 font-semibold">Action</span>
              </div>
            </div>
            {transactions?.map((transaction) => (
              <TransactionRow key={transaction._id} transaction={transaction} />
            ))}

            <AddTransactionForm accounts={accounts} />
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p>No transactions found!</p>
          <AddTransactionForm accounts={accounts} justifyCenter={true} />
        </div>
      )}
    </>
  );
};

export default TransactionsTable;
