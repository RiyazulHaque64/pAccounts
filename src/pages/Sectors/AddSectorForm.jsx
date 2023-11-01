import { useContext, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { IoMdRefresh } from "react-icons/io";
import { HiMiniXMark } from "react-icons/hi2";
import { TbLoader } from "react-icons/tb";
import { useAddSectorMutation } from "../../redux/features/sectors/sectorsApi";
import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";

const AddSectorForm = ({ justifyCenter, parentSectors }) => {
  const { user } = useContext(AuthContext);
  const [createSector, { isLoading }] = useAddSectorMutation();
  const [addSector, setAddSector] = useState(false);
  const [sectorName, setSectorName] = useState("");
  const [sectorType, setSectorType] = useState("");
  const [parentSector, setParentSector] = useState("");

  const addSectorHandler = (e) => {
    e.preventDefault();
    const sectorPosition = parentSector === "" ? "parent" : parentSector;
    const sectorInfo = {
      user: user?.email,
      sectorName,
      sectorType,
      parent: sectorPosition,
      transaction: 0,
    };
    createSector(sectorInfo).then((data) => {
      if (data.data.insertedId) {
        toast.success("Successfully added a sector!");
        setAddSector(false);
        resetFormHandler();
      }
    });
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
        <form onSubmit={addSectorHandler}>
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
                <option className="text-gray-600" value="">
                  Parent Sector
                </option>
                {parentSectors.map((parentSector) => (
                  <option
                    key={parentSector._id}
                    value={parentSector.sectorName}
                    className="text-gray-600"
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
            disabled={isLoading}
            onClick={() => setAddSector(true)}
          >
            {isLoading ? <TbLoader /> : "Add Sector"}
          </button>
        </div>
      )}
    </>
  );
};

export default AddSectorForm;
