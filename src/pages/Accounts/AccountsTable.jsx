import AddAccountForm from "./AddAccountForm";
import AccountRow from "./AccountRow";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useGetAccountsQuery } from "../../redux/features/accounts/accountsApi";
import Loader from "../../components/Loader/Loader";

const AccountsTable = () => {
  const { user } = useContext(AuthContext);
  const { data, isLoading, isError } = useGetAccountsQuery(user?.email);

  const balanceCalculator = (accountsData, accountsType) => {
    const balance = accountsData
      .filter((account) => account.accountType === accountsType)
      .reduce((prevValue, account) => prevValue + account.balance, 0);
    return balance.toFixed(2);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="text-red-500">There was an error!</div>
      ) : data?.length > 0 ? (
        <>
          <div className="grid grid-cols-12 gap-3 mb-4">
            <div className="col-span-4 flex justify-between bg-green-100 p-4 rounded">
              <h4 className="text-green-600">Bank Balance</h4>
              <span className="text-green-600">
                {balanceCalculator(data, "bank")}
                <span className="font-extrabold text-green-600">&#2547;</span>
              </span>
            </div>
            <div className="col-span-4 flex justify-between bg-pink-50 p-4 rounded">
              <h4 className="text-pink-600">Mobile Banking Balance</h4>
              <span className="text-pink-600">
                {balanceCalculator(data, "mobile-bank")}
                <span className="font-extrabold text-pink-600">&#2547;</span>
              </span>
            </div>
            <div className="col-span-4 flex justify-between bg-violet-100 p-4 rounded">
              <h4 className="text-violet-600">Cash Balance</h4>
              <span className="text-violet-600">
                {balanceCalculator(data, "cash")}
                <span className="font-extrabold text-violet-600">&#2547;</span>
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

            {data.map((account) => (
              <AccountRow key={account._id} account={account} />
            ))}

            <AddAccountForm />
          </div>
        </>
      ) : (
        <div className="text-center">
          <p>No accounts found! Please,</p>
          <AddAccountForm justifyCenter={true} />
        </div>
      )}
    </>
  );
};

export default AccountsTable;
