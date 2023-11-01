import { FiPlus } from "react-icons/fi";
import { IoMdRefresh } from "react-icons/io";
import { HiMiniXMark } from "react-icons/hi2";
import { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { useAddBorrowerMutation } from "../../../redux/features/Loan/borrower/borrowerApi";
import toast from "react-hot-toast";
import { TbLadder } from "react-icons/tb";

const AddBorrowerForm = ({ justifyCenter }) => {
  const { user } = useContext(AuthContext);

  const [addBorrower, { isLoading }] = useAddBorrowerMutation();

  const [addBorrowerForm, setAddBorrowerForm] = useState(false);
  const [borrowerName, setBorrwerName] = useState("");
  const [borrowerReference, setBorrowerReference] = useState("");
  const [borrowerNumber, setBorrowerNumber] = useState("");

  const addBorrowerHandler = (e) => {
    e.preventDefault();
    const borrowerInfo = {
      user: user?.email,
      borrowerName,
      borrowerReference,
      borrowerNumber,
      loanAmount: 0,
    };
    addBorrower(borrowerInfo).then((data) => {
      if (data.data.insertedId) {
        toast.success("Sucessfully added a borrwer");
        setAddBorrowerForm(false);
        resetFormHandler();
      }
    });
  };

  const resetFormHandler = () => {
    setBorrwerName("");
    setBorrowerReference("");
    setBorrowerNumber("");
  };

  const cancelAddForm = () => {
    setAddBorrowerForm(false);
    resetFormHandler();
  };
  return (
    <>
      {addBorrowerForm ? (
        <form onSubmit={addBorrowerHandler}>
          <div className="grid grid-cols-12 py-2 px-3 bg-violet-50 rounded mt-6">
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
        <div
          className={`flex ${
            justifyCenter ? "justify-center" : "justify-end"
          } mt-6`}
        >
          <button
            className={`bg-violet-100 text-violet-600 font-semibold px-4 py-2 uppercase text-sm rounded duration-200 hover:bg-violet-200 hover:text-violet-700 disabled:cursor-not-allowed`}
            onClick={() => setAddBorrowerForm(true)}
            disabled={isLoading}
          >
            {isLoading ? <TbLadder className="animate-spin" /> : "Add Borrower"}
          </button>
        </div>
      )}
    </>
  );
};

export default AddBorrowerForm;
