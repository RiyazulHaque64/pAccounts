import TransactionRow from "./TransactionRow";
import AddTransactionForm from "./AddTransactionForm";

const TransactionsTable = () => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-3 mb-4">Header</div>
      <div>
        <div className="grid grid-cols-12 py-2 px-3 bg-violet-50 rounded">
          <div className="col-span-2 px-2 text-center">
            <span className="text-gray-700 font-semibold">Date</span>
          </div>
          <div className="col-span-3 px-2">
            <span className="text-gray-700 font-semibold">Description</span>
          </div>
          <div className="col-span-2 px-2 text-center">
            <span className="text-gray-700 font-semibold">Sector</span>
          </div>
          <div className="col-span-2 px-2 text-center">
            <span className="text-gray-700 font-semibold">Account</span>
          </div>
          <div className="col-span-1 px-2 text-right">
            <span className="text-gray-700 font-semibold">Amount</span>
          </div>
          <div className="col-span-2 px-2 text-center">
            <span className="text-gray-700 font-semibold">Action</span>
          </div>
        </div>
        <TransactionRow />
        <TransactionRow />
        <AddTransactionForm />
      </div>
    </div>
  );
};

export default TransactionsTable;
