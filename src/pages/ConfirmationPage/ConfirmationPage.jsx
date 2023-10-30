import { FiAlertTriangle } from "react-icons/fi";
import toast from "react-hot-toast";
import { TbLoader } from "react-icons/tb";

const ConfirmationPage = ({ cancelConfirmation, id, deletedFunc }) => {
  const [deleteItem, { isLoading }] = deletedFunc;
  const deleteAccountHandler = (id) => {
    deleteItem(id).then((data) => {
      if (data.data.deletedCount > 0) {
        toast.success("Successfully deleted this account!");
        cancelConfirmation();
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
            disabled={isLoading}
            onClick={() => deleteAccountHandler(id)}
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

export default ConfirmationPage;
