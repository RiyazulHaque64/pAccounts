import { useContext, useState } from "react";
import { TiTick } from "react-icons/ti";
import { IoMdRefresh } from "react-icons/io";
import { HiMiniXMark } from "react-icons/hi2";
import {
  useGetParentSectorsQuery,
  useUpdateSectorMutation,
} from "../../redux/features/sectors/sectorsApi";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";

const UpdateSectorForm = ({ cancelUpdateForm, sector }) => {
  const { user } = useContext(AuthContext);
  const { data: parentSectors } = useGetParentSectorsQuery(user?.email);
  const [updateSector] = useUpdateSectorMutation();

  const { _id, sectorName: name, sectorType: type, parent } = sector;
  const [sectorName, setSectorName] = useState(name);
  const [sectorType, setSectorType] = useState(type);
  const [parentSector, setParentSector] = useState(parent);

  const addAccountHandler = (e) => {
    e.preventDefault();
    const sectorPosition = parentSector === "" ? "parent" : parentSector;
    const sectorInfo = {
      sectorName,
      sectorType,
      parent: sectorPosition,
    };
    updateSector({ id: _id, updatedInfo: sectorInfo }).then((data) => {
      if (data.data.modifiedCount > 0) {
        toast.success("Successfully updated the sector!");
        cancelUpdateForm();
        resetFormHandler();
      }
    });
  };

  const resetFormHandler = () => {
    setSectorName(name);
    setSectorType(type);
    setParentSector(parent);
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
              Parent
            </option>
            {parentSectors?.map((parentSector) => (
              <option
                key={parentSector._id}
                value={parentSector.sectorName}
                className="text-gray-700"
              >
                {parentSector.sectorName}
              </option>
            ))}
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
