import { useContext, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { IoMdRefresh } from "react-icons/io";
import { HiMiniXMark } from "react-icons/hi2";
import { TbLoader } from "react-icons/tb";
import { AuthContext } from "../../provider/AuthProvider";
import { useAddAccountMutation } from "../../redux/features/accounts/accountsApi";
import toast from "react-hot-toast";

const AddAccountForm = ({ justifyCenter }) => {
  const { user } = useContext(AuthContext);
  const [addAccount, { isLoading }] = useAddAccountMutation();

  const [addForm, setAddForm] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [initialBalance, setInitialBalance] = useState("");

  const addAccountHandler = (e) => {
    e.preventDefault();
    const accountInfo = {
      user: user?.email,
      accountName,
      accountType,
      balance: parseFloat(initialBalance),
    };
    addAccount(accountInfo).then((data) => {
      if (data.data.insertedId) {
        toast.success("Successfully added an account!");
        setAddForm(false);
        resetFormHandler();
      }
    });
  };

  const resetFormHandler = () => {
    setAccountName("");
    setAccountType("");
    setInitialBalance("");
  };

  const cancelAddForm = () => {
    setAddForm(false);
    resetFormHandler();
  };

  return (
    <>
      {addForm ? (
        <form onSubmit={addAccountHandler}>
          <div className="grid grid-cols-12 py-2 px-3 bg-violet-50 rounded mt-6">
            <div className="col-span-6 px-2">
              <input
                className="w-full bg-white py-1 px-2 text-gray-700 rounded outline-none border border-violet-100 focus:border-violet-300"
                type="text"
                placeholder="Type your account name"
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
                <option className="text-gray-700" value="mobile-bank">
                  Mobile Bank
                </option>
                <option className="text-gray-700" value="cash">
                  Cash
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
                onClick={cancelAddForm}
              />
              <IoMdRefresh
                className="w-5 h-5 cursor-pointer duration-200 text-yellow-600 hover:text-yellow-700"
                onClick={resetFormHandler}
              />
              <button
                className="disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <TbLoader className="w-5 h-5 cursor-pointer duration-200 text-violet-600 hover:text-violet-800 animate-spin" />
                ) : (
                  <FiPlus className="w-5 h-5 cursor-pointer duration-200 text-violet-600 hover:text-violet-800" />
                )}
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
            onClick={() => setAddForm(true)}
          >
            Add Account
          </button>
        </div>
      )}
    </>
  );
};

export default AddAccountForm;
