import { useContext } from "react";
import { useGetBorrowersQuery } from "../../../redux/features/Loan/borrower/borrowerApi";
import AddBorrowerForm from "./AddBorrowerForm";
import BorrowerRow from "./BorrowerRow";
import { AuthContext } from "../../../provider/AuthProvider";
import Loader from "../../../components/Loader/Loader";

const BorrowerTable = () => {
  const { user } = useContext(AuthContext);
  const {
    data: borrowers,
    isLoading,
    isError,
  } = useGetBorrowersQuery(user?.email);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="text-red-500">There was an error!</div>
      ) : borrowers.length > 0 ? (
        <div>
          <div className="grid grid-cols-12 py-2 px-3 bg-violet-50 rounded">
            <div className="col-span-3 px-2">
              <span className="text-gray-700 font-semibold">Name</span>
            </div>
            <div className="col-span-3 px-2">
              <span className="text-gray-700 font-semibold">Reference</span>
            </div>
            <div className="col-span-2 px-2 text-center">
              <span className="text-gray-700 font-semibold">Number</span>
            </div>
            <div className="col-span-2 px-2 text-center">
              <span className="text-gray-700 font-semibold">Loan</span>
            </div>
            <div className="col-span-2 px-2 text-center">
              <span className="text-gray-700 font-semibold">Action</span>
            </div>
          </div>
          {borrowers.map((borrower) => (
            <BorrowerRow key={borrower._id} borrower={borrower} />
          ))}
          <AddBorrowerForm />
        </div>
      ) : (
        <div className="text-center">
          <p>No borrower found!</p>
          <AddBorrowerForm justifyCenter={true} />
        </div>
      )}
    </>
  );
};

export default BorrowerTable;
