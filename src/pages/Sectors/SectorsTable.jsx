import SectorRow from "./SectorRow";
import AddSectorForm from "./AddSectorForm";
import { useGetSectorsQuery } from "../../redux/features/sectors/sectorsApi";
import Loader from "../../components/Loader/Loader";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const SectorsTable = () => {
  const { user } = useContext(AuthContext);
  const { data: sectors, isLoading, isError } = useGetSectorsQuery(user?.email);
  const parentSectors = sectors?.filter((sector) => sector.parent === "parent");

  const balanceCalculator = (sectorsData, sectorType) => {
    const balance = sectorsData
      .filter((sector) => sector.sectorType === sectorType)
      .reduce((prevValue, sector) => prevValue + sector.transaction, 0);
    return balance.toFixed(2);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="text-red-500">There was an error!</div>
      ) : sectors.length > 0 ? (
        <div>
          <div className="grid grid-cols-12 gap-3 mb-4">
            <div className="col-span-6 flex justify-between bg-green-100 p-4 rounded">
              <h4 className="text-green-600">Total Income</h4>
              <span className="text-green-600">
                {balanceCalculator(sectors, "income")}
                <span className="font-extrabold text-green-600">&#2547;</span>
              </span>
            </div>
            <div className="col-span-6 flex justify-between bg-orange-100 p-4 rounded">
              <h4 className="text-orange-600">Total Expense</h4>
              <span className="text-orange-600">
                {balanceCalculator(sectors, "expense")}
                <span className="font-extrabold text-orange-600">&#2547;</span>
              </span>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-12 py-2 px-3 bg-violet-50 rounded">
              <div className="col-span-4 px-2">
                <span className="text-gray-700 font-semibold">Name</span>
              </div>
              <div className="col-span-2 px-2 text-center">
                <span className="text-gray-700 font-semibold">Parent</span>
              </div>
              <div className="col-span-2 px-2 text-center">
                <span className="text-gray-700 font-semibold">Type</span>
              </div>
              <div className="col-span-2 px-2 text-right">
                <span className="text-gray-700 font-semibold">Transaction</span>
              </div>
              <div className="col-span-2 px-2 text-center">
                <span className="text-gray-700 font-semibold">Action</span>
              </div>
            </div>
            {sectors.map((sector) => (
              <SectorRow key={sector._id} sector={sector} />
            ))}
            <AddSectorForm parentSectors={parentSectors} />
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p>No sectors found! Please,</p>
          <AddSectorForm justifyCenter={true} parentSectors={[]} />
        </div>
      )}
    </>
  );
};

export default SectorsTable;
