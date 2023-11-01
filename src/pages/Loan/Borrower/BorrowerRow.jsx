import { RiDeleteBin5Line } from "react-icons/ri";
import { IoCallOutline } from "react-icons/io5";
import { BiSolidEdit } from "react-icons/bi";
import { useState } from "react";
import UpdateBorrowerForm from "./UpdateBorrowerForm";
import ConfirmationPage from "../../ConfirmationPage/ConfirmationPage";
import { useDeleteBorrowerMutation } from "../../../redux/features/Loan/borrower/borrowerApi";

const BorrowerRow = ({ borrower }) => {
  const { _id, borrowerName, borrowerReference, borrowerNumber, loanAmount } =
    borrower;

  const deleteBorrower = useDeleteBorrowerMutation();

  const [updateBorrower, setUpdateBorrower] = useState(false);
  const [showConfirmBox, setShowConfirmBox] = useState(false);

  const cancelUpdateForm = () => {
    setUpdateBorrower(false);
  };

  const cancelConfirmation = () => {
    setShowConfirmBox(false);
  };

  return (
    <>
      {updateBorrower ? (
        <UpdateBorrowerForm
          cancelUpdateForm={cancelUpdateForm}
          borrower={borrower}
        />
      ) : (
        <div className="grid grid-cols-12 py-2 px-3 border-b border-violet-50">
          <div className="col-span-3 px-2">
            <span className="text-gray-800">{borrowerName}</span>
          </div>
          <div className="col-span-3 px-2">
            <span className="text-gray-800">{borrowerReference}</span>
          </div>
          <div className="col-span-2 px-2 text-center">
            <span className="text-gray-800">{borrowerNumber}</span>
          </div>
          <div className="col-span-2 px-2 text-center">
            <span className="text-gray-800">{loanAmount.toFixed(2)}</span>
            <span className="font-extrabold text-gray-700">&#2547;</span>
          </div>
          <div className="col-span-2 px-2 text-center flex items-center justify-center gap-3 py-1">
            <IoCallOutline
              className="w-5 h-5 cursor-pointer duration-200 text-emerald-600 hover:text-emerald-800"
              title="Call the borrower"
            />
            <BiSolidEdit
              className="w-5 h-5 cursor-pointer duration-200 text-violet-600 hover:text-violet-800"
              title="Edit This Borrower"
              onClick={() => setUpdateBorrower(true)}
            />
            <RiDeleteBin5Line
              className="w-5 h-5 cursor-pointer duration-200 text-red-500 hover:text-red-700"
              title="Delete This Borrower"
              onClick={() => setShowConfirmBox(true)}
            />
          </div>
        </div>
      )}
      {showConfirmBox && (
        <ConfirmationPage
          cancelConfirmation={cancelConfirmation}
          id={_id}
          deletedFunc={deleteBorrower}
        />
      )}
    </>
  );
};

export default BorrowerRow;
