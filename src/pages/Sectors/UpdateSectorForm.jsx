import { useState } from "react";
import { TiTick } from "react-icons/ti";
import { IoMdRefresh } from "react-icons/io";
import { HiMiniXMark } from "react-icons/hi2";

const UpdateSectorForm = ({ cancelUpdateForm }) => {
  const [sectorName, setSectorName] = useState("");
  const [sectorType, setSectorType] = useState("");
  const [parentSector, setParentSector] = useState("");

  const addAccountHandler = (e) => {
    e.preventDefault();
    const sectorPosition = parentSector === "" ? "parent" : parentSector;
    const sectorInfo = {
      sectorName,
      sectorType,
      parent: sectorPosition,
      transaction: 0,
    };
    console.log(sectorInfo);
    resetFormHandler();
  };

  const resetFormHandler = () => {
    setSectorName("");
    setSectorType("");
    setParentSector("");
  };

  return (
    <form onSubmit={addAccountHandler}>
      <div className="grid grid-cols-12 py-2 px-3 bg-violet-50 rounded">
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
            onClick={cancelUpdateForm}
          />
          <IoMdRefresh
            className="w-5 h-5 cursor-pointer duration-200 text-yellow-600 hover:text-yellow-700"
            onClick={resetFormHandler}
          />
          <button type="submit">
            <TiTick className="w-5 h-5 cursor-pointer duration-200 text-green-600 hover:text-green-800" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdateSectorForm;
