import { TiTick } from "react-icons/ti";
import { IoMdRefresh } from "react-icons/io";
import { HiMiniXMark } from "react-icons/hi2";
import { useState } from "react";
import { useUpdateBorrowerMutation } from "../../../redux/features/Loan/borrower/borrowerApi";
import toast from "react-hot-toast";
import { TbLoader } from "react-icons/tb";

const UpdateBorrowerForm = ({ cancelUpdateForm, borrower }) => {
  const {
    _id,
    borrowerName: name,
    borrowerReference: reference,
    borrowerNumber: phoneNumber,
  } = borrower;

  const [updateBorrower, { isLoading }] = useUpdateBorrowerMutation();

  const [borrowerName, setBorrwerName] = useState(name);
  const [borrowerReference, setBorrowerReference] = useState(reference);
  const [borrowerNumber, setBorrowerNumber] = useState(phoneNumber);

  const addBorrowerHandler = (e) => {
    e.preventDefault();
    const borrowerInfo = {
      borrowerName,
      borrowerReference,
      borrowerNumber,
    };
    updateBorrower({ id: _id, data: borrowerInfo }).then((data) => {
      if (data.data.modifiedCount > 0) {
        toast.success("Successfully updated the borrower information!");
        cancelUpdateForm();
      } else {
        toast.error("Nothing has been updated");
      }
    });
  };

  const resetFormHandler = () => {
    setBorrwerName(name);
    setBorrowerReference(reference);
    setBorrowerNumber(phoneNumber);
  };

  return (
    <form onSubmit={addBorrowerHandler}>
      <div className="grid grid-cols-12 py-2 px-3 bg-violet-50 rounded">
        <div className="col-span-4 px-2">
          <input
            className="w-full bg-white py-1 px-2 text-gray-700 rounded outline-none border border-violet-100 focus:border-violet-300"
            type="text"
            placeholder="Type borrower name"
            value={borrowerName}
            onChange={(e) => setBorrwerName(e.target.value)}
            required
          />
        </div>
        <div className="col-span-3 px-2">
          <input
            className="w-full bg-white py-1 px-2 text-gray-700 rounded outline-none border border-violet-100 focus:border-violet-300"
            type="text"
            placeholder="Type a reference"
            value={borrowerReference}
            onChange={(e) => setBorrowerReference(e.target.value)}
          />
        </div>
        <div className="col-span-3 px-2">
          <input
            className="w-full bg-white py-1 px-2 text-gray-700 rounded outline-none border border-violet-100 focus:border-violet-300"
            type="number"
            placeholder="Type borrower number"
            value={borrowerNumber}
            onChange={(e) => setBorrowerNumber(e.target.value)}
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
          <button
            type="submit"
            disabled={isLoading}
            className="disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <TbLoader className="w-5 h-5 cursor-pointer duration-200 text-violet-600 animate-spin" />
            ) : (
              <TiTick className="w-5 h-5 cursor-pointer duration-200 text-violet-600 hover:text-violet-800" />
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdateBorrowerForm;
