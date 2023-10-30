import { FiAlertTriangle } from "react-icons/fi";
import {
  useGetAccountQuery,
  useUpdateAccountMutation,
} from "../../redux/features/accounts/accountsApi";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import {
  useGetSectorQuery,
  useUpdateSectorMutation,
} from "../../redux/features/sectors/sectorsApi";
import { useDeleteTransactionMutation } from "../../redux/features/transactions/transactionsApi";
import toast from "react-hot-toast";
import { TbLoader } from "react-icons/tb";

const TransactionDeleteConfirmation = ({ cancelConfirmation, transaction }) => {
  const { user } = useContext(AuthContext);
  const { _id, account, transactionSector, amount } = transaction;
  const { data: accountData } = useGetAccountQuery({
    user: user?.email,
    accName: account,
  });
  const { data: sector } = useGetSectorQuery({
    email: user?.email,
    sectorName: transactionSector,
  });
  const [deleteTransaction, { isLoading }] = useDeleteTransactionMutation();
  const [updateSector] = useUpdateSectorMutation();
  const [updateAccount] = useUpdateAccountMutation();

  const deleteAccountHandler = (id) => {
    deleteTransaction(id).then((data) => {
      if (data.data.deletedCount > 0) {
        const updatedSector = { transaction: sector?.transaction - amount };
        updateSector({ id: sector?._id, updatedInfo: updatedSector });
        if (sector?.sectorType === "income") {
          const updatedAccount = { balance: accountData?.balance - amount };
          updateAccount({ accountId: accountData?._id, data: updatedAccount });
        }
        if (sector?.sectorType === "expense") {
          const updatedAccount = { balance: accountData?.balance + amount };
          updateAccount({
            accountId: accountData?._id,
            data: updatedAccount,
          });
        }
        toast.success("Successfully deleted the transaction!");
      }
    });
  };
  return (
    <div
      className="w-full h-screen flex items-start justify-center mt-5 rounded-lg p-4 fixed top-0 right-0 left-0 bottom-0"
      onClick={cancelConfirmation}
    >
      <div className="p-6 flex flex-col items-center justify-center rounded border border-gray-300 bg-white z-50">
        <FiAlertTriangle className="w-12 h-12 text-yellow-500" />
        <h2 className="text-xl my-1">Are you sure?</h2>
        <p>You won&apos;t be able to revert this!</p>
        <div className="mt-4 flex gap-2">
          <button
            className={`text-white font-semibold px-4 py-1 rounded duration-200 bg-violet-500 hover:bg-violet-600 disabled:cursor-not-allowed`}
            onClick={() => deleteAccountHandler(_id)}
            disabled={isLoading}
          >
            {isLoading ? (
              <TbLoader className="animate-spin" />
            ) : (
              "Yes, delete it!"
            )}
          </button>
          <button
            className="text-white font-semibold px-4 py-1 rounded duration-200 bg-red-500 hover:bg-red-600"
            onClick={cancelConfirmation}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDeleteConfirmation;
