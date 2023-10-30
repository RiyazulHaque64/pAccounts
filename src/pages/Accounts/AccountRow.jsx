import { RiDeleteBin5Line } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import { useState } from "react";
import UpdateAccountForm from "./UpdateAccountForm";
import ConfirmationPage from "../ConfirmationPage/ConfirmationPage";
import { useDeleteAccountMutation } from "../../redux/features/accounts/accountsApi";

const AccountRow = ({ account }) => {
  const deleteAccount = useDeleteAccountMutation();
  const { _id, accountName, accountType, balance } = account;
  const [updateAccount, setUpdateAccount] = useState(false);
  const [showConfirmBox, setShowConfirmBox] = useState(false);

  const cancelUpdateForm = () => {
    setUpdateAccount(false);
  };

  const cancelConfirmation = () => {
    setShowConfirmBox(false);
  };

  return (
    <>
      {updateAccount ? (
        <UpdateAccountForm
          cancelUpdateForm={cancelUpdateForm}
          accountInfo={account}
        />
      ) : (
        <div className="grid grid-cols-12 py-2 px-3 border-b border-violet-50">
          <div className="col-span-6 px-2">
            <span className="text-gray-800 capitalize">{accountName}</span>
          </div>
          <div className="col-span-2 px-2 text-center">
            <span
              className={`${
                accountType === "bank"
                  ? "bg-green-100 text-green-600"
                  : accountType === "mobile-bank"
                  ? "bg-pink-100 text-pink-600"
                  : accountType === "cash"
                  ? "bg-violet-100 text-violet-600"
                  : accountType === "loan"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-gray-100 text-gray-700"
              } font-semibold py-1 px-3 rounded`}
            >
              {accountType}
            </span>
          </div>
          <div className="col-span-2 px-2 text-right">
            <span className="text-gray-800">
              {balance}{" "}
              <span className="font-extrabold text-gray-600">&#2547;</span>
            </span>
          </div>
          <div className="col-span-2 px-2 text-center flex items-center justify-center gap-3 py-1">
            <BiSolidEdit
              className="w-5 h-5 cursor-pointer duration-200 text-violet-600 hover:text-violet-800"
              onClick={() => setUpdateAccount(true)}
            />
            <RiDeleteBin5Line
              onClick={() => setShowConfirmBox(true)}
              className="w-5 h-5 cursor-pointer duration-200 text-red-500 hover:text-red-700"
            />
          </div>
        </div>
      )}
      {showConfirmBox && (
        <ConfirmationPage
          cancelConfirmation={cancelConfirmation}
          id={_id}
          deletedFunc={deleteAccount}
        />
      )}
    </>
  );
};

export default AccountRow;
