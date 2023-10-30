import { RiDeleteBin5Line, RiParentLine } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import { useState } from "react";
import UpdateSectorForm from "./UpdateSectorForm";
import ConfirmationPage from "../ConfirmationPage/ConfirmationPage";
import { useDeleteSectorMutation } from "../../redux/features/sectors/sectorsApi";

const SectorRow = ({ sector }) => {
  const deleteSector = useDeleteSectorMutation();
  const { _id, sectorName, sectorType, parent, transaction } = sector;
  const [updateSector, setUpdateSector] = useState(false);
  const [showConfirmBox, setShowConfirmBox] = useState(false);

  const cancelUpdateForm = () => {
    setUpdateSector(false);
  };

  const cancelConfirmation = () => {
    setShowConfirmBox(false);
  };
  return (
    <>
      {updateSector ? (
        <UpdateSectorForm sector={sector} cancelUpdateForm={cancelUpdateForm} />
      ) : (
        <div className="grid grid-cols-12 py-2 px-3 border-b border-violet-50">
          <div className="col-span-4 px-2">
            <span className="text-gray-800">{sectorName}</span>
          </div>
          <div className="col-span-2 px-2 text-center">
            <span className="text-gray-800">{parent}</span>
          </div>
          <div className="col-span-2 px-2 text-center">
            <span
              className={`font-semibold py-1 px-3 rounded ${
                sectorType === "income"
                  ? "bg-green-100 text-green-600"
                  : sectorType === "expense"
                  ? "bg-orange-100 text-orange-600"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {sectorType}
            </span>
          </div>
          <div className="col-span-2 px-2 text-right">
            <span className="text-gray-700">
              {transaction}
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
              onClick={() => setShowConfirmBox(true)}
            />
          </div>
        </div>
      )}
      {showConfirmBox && (
        <ConfirmationPage
          cancelConfirmation={cancelConfirmation}
          id={_id}
          deletedFunc={deleteSector}
        />
      )}
    </>
  );
};

export default SectorRow;
