import SectorRow from "./SectorRow";
import AddSectorForm from "./AddSectorForm";

const SectorsTable = () => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-3 mb-4">Header</div>
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
        <SectorRow />
        <SectorRow />
        <AddSectorForm />
      </div>
    </div>
  );
};

export default SectorsTable;
