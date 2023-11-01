import { Link } from "react-router-dom";
import { PiNotepadBold } from "react-icons/pi";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { MdAccountBalance } from "react-icons/md";
import { PiChartPieSlice } from "react-icons/pi";
import { TfiMenuAlt } from "react-icons/tfi";
import { TbUserExclamation } from "react-icons/tb";
import TechnicalContact from "./TechnicalContact";
import { useState } from "react";

const Sidebar = () => {
  const [loanSubMenu, setLoanSubMenu] = useState(false);

  return (
    <div className="h-[calc(100vh-40px)] w-full bg-violet-600 rounded-lg">
      <div className="h-full flex flex-col items-center">
        <div className="w-full h-20 flex justify-center items-center">
          <Link to="/">
            <h2 className="text-2xl text-white">
              <span className="text-white font-bold">p</span>Accounts
            </h2>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="py-6">
            <ul className="space-y-2">
              <div>
                <Link to="/summery">
                  <li className="flex items-center gap-2 py-2 px-6 rounded duration-200 hover:bg-white group cursor-pointer">
                    <PiNotepadBold className="w-6 h-6 text-gray-100 duration-200 group-hover:text-violet-600" />
                    <span className="text-lg text-gray-100 duration-200 group-hover:text-violet-600">
                      Summery
                    </span>
                  </li>
                </Link>
              </div>
              <div>
                <Link to="/transactions">
                  <li className="flex items-center gap-2 py-2 px-6 rounded duration-200 hover:bg-white group cursor-pointer">
                    <HiArrowsRightLeft className="w-6 h-6 text-gray-100 duration-200 group-hover:text-violet-600" />
                    <span className="text-lg text-gray-100 duration-200 group-hover:text-violet-600">
                      Transactions
                    </span>
                  </li>
                </Link>
              </div>
              <div>
                <Link to="/accounts">
                  <li className="flex items-center gap-2 py-2 px-6 rounded duration-200 hover:bg-white group cursor-pointer">
                    <MdAccountBalance className="w-6 h-6 text-gray-100 duration-200 group-hover:text-violet-600" />
                    <span className="text-lg text-gray-100 duration-200 group-hover:text-violet-600">
                      Accounts
                    </span>
                  </li>
                </Link>
              </div>
              <div>
                <Link to="/sectors">
                  <li className="flex items-center gap-2 py-2 px-6 rounded duration-200 hover:bg-white group cursor-pointer">
                    <PiChartPieSlice className="w-6 h-6 text-gray-100 duration-200 group-hover:text-violet-600" />
                    <span className="text-lg text-gray-100 duration-200 group-hover:text-violet-600">
                      Sectors
                    </span>
                  </li>
                </Link>
              </div>
              <div className="relative">
                <Link to="/loan-transactions">
                  <li
                    className="flex items-center gap-2 py-2 px-6 rounded duration-200 hover:bg-white group cursor-pointer"
                    onClick={() => setLoanSubMenu(!loanSubMenu)}
                  >
                    <TfiMenuAlt className="w-6 h-6 text-gray-100 duration-200 group-hover:text-violet-600" />
                    <span className="text-lg text-gray-100 duration-200 group-hover:text-violet-600">
                      Loan
                    </span>
                  </li>
                </Link>
                {loanSubMenu && (
                  <div className="absolute left-6">
                    <Link to="/borrowers">
                      <li className="flex items-center gap-2 py-2 px-6 rounded duration-200 hover:bg-white group cursor-pointer">
                        <TbUserExclamation className="w-6 h-6 text-gray-100 duration-200 group-hover:text-violet-600" />
                        <span className="text-lg text-gray-100 duration-200 group-hover:text-violet-600">
                          Borrower
                        </span>
                      </li>
                    </Link>
                  </div>
                )}
              </div>
            </ul>
          </nav>
        </div>
        <div className="p-8">
          <TechnicalContact />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
