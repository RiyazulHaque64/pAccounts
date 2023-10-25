import { RiDeleteBin5Line, RiParentLine } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import { useState } from "react";
import UpdateSectorForm from "./UpdateSectorForm";

const SectorRow = () => {
  const [updateSector, setUpdateSector] = useState(false);

  const cancelUpdateForm = () => {
    setUpdateSector(false);
  };

  return (
    <>
      {updateSector ? (
        <UpdateSectorForm cancelUpdateForm={cancelUpdateForm} />
      ) : (
        <div className="grid grid-cols-12 py-2 px-3 border-b border-violet-50">
          <div className="col-span-4 px-2">
            <span className="text-gray-800">Dhaka Alia</span>
          </div>
          <div className="col-span-2 px-2 text-center">
            <span className="text-gray-800">Education</span>
          </div>
          <div className="col-span-2 px-2 text-center">
            <span className="bg-violet-100 text-violet-600 font-semibold py-1 px-3 rounded">
              Expense
            </span>
          </div>
          <div className="col-span-2 px-2 text-right">
            <span className="text-gray-700">
              120000
              <span className="font-extrabold text-gray-700">&#2547;</span>
            </span>
          </div>
          <div className="col-span-2 px-2 text-center flex items-center justify-center gap-3 py-1">
            <RiParentLine
              className="w-5 h-5 cursor-pointer duration-200 text-emerald-600 hover:text-emerald-800"
              title="Make Parent Sector"
            />
            <BiSolidEdit
              className="w-5 h-5 cursor-pointer duration-200 text-violet-600 hover:text-violet-800"
              title="Edit This Sector"
              onClick={() => setUpdateSector(true)}
            />
            <RiDeleteBin5Line
              className="w-5 h-5 cursor-pointer duration-200 text-red-500 hover:text-red-700"
              title="Delete This Sector"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SectorRow;
