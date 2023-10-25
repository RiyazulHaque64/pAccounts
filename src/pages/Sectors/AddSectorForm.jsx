import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { IoMdRefresh } from "react-icons/io";
import { HiMiniXMark } from "react-icons/hi2";

const AddSectorForm = () => {
  const [addSector, setAddSector] = useState(false);
  const [sectorName, setSectorName] = useState("");
  const [sectorType, setSectorType] = useState("");
  const [parentSector, setParentSector] = useState("");

  const addAccountHandler = (e) => {
    e.preventDefault();
    const sectorPosition = parentSector === "" ? "parent" : parentSector;
    const accountInfo = {
      sectorName,
      sectorType,
      parent: sectorPosition,
      transaction: 0,
    };
    console.log(accountInfo);
    setAddSector(false);
    resetFormHandler();
  };

  const resetFormHandler = () => {
    setSectorName("");
    setSectorType("");
    setParentSector("");
  };

  const cancelAddForm = () => {
    setAddSector(false);
    resetFormHandler();
  };

  return (
    <>
      {addSector ? (
        <form onSubmit={addAccountHandler}>
          <div className="grid grid-cols-12 py-2 px-3 bg-violet-50 rounded mt-6">
            <div className="col-span-6 px-2">
              <input
                className="w-full bg-white py-1 px-2 text-gray-700 rounded outline-none border border-violet-100 focus:border-violet-300"
                type="text"
                placeholder="Type your sector name"
                value={sectorName}
                onChange={(e) => setSectorName(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 px-2">
              <select
                className="w-full py-1 px-2 border border-violet-100 text-gray-600 outline-none appearance-none focus:border-violet-300 rounded"
                placeholder="Select Type"
                value={parentSector}
                onChange={(e) => setParentSector(e.target.value)}
              >
                <option className="text-gray-700" value="">
                  Select Parent Sector
                </option>
                <option className="text-gray-700" value="education">
                  Education
                </option>
                <option className="text-gray-700" value="food">
                  Food
                </option>
                <option className="text-gray-700" value="cosmetics">
                  Cosmetics
                </option>
                <option className="text-gray-700" value="family">
                  Family
                </option>
                <option className="text-gray-700" value="wastage">
                  Wastage
                </option>
              </select>
            </div>
            <div className="col-span-2 px-2">
              <select
                className="w-full py-1 px-2 border border-violet-100 text-gray-600 outline-none appearance-none focus:border-violet-300 rounded"
                placeholder="Select Type"
                value={sectorType}
                onChange={(e) => setSectorType(e.target.value)}
                required
              >
                <option className="text-gray-700" value="">
                  Select Sector Type
                </option>
                <option className="text-gray-700" value="income">
                  Income
                </option>
                <option className="text-gray-700" value="expense">
                  Expense
                </option>
                <option className="text-gray-700" value="taken deposit">
                  Taken Deposit
                </option>
                <option className="text-gray-700" value="given deposit">
                  Given Deposit
                </option>
                <option className="text-gray-700" value="given loan">
                  Given Loan
                </option>
                <option className="text-gray-700" value="taken loan">
                  Taken Loan
                </option>
              </select>
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
        <div className="flex justify-end mt-6">
          <button
            className={`bg-violet-100 text-violet-600 font-semibold px-4 py-2 uppercase text-sm rounded duration-200 hover:bg-violet-200 hover:text-violet-700`}
            onClick={() => setAddSector(true)}
          >
            Add Sector
          </button>
        </div>
      )}
    </>
  );
};

export default AddSectorForm;
