import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AuthLayout from "../layout/AuthLayout";
import LoginPage from "../pages/Auth/LoginPage";
import RegistrationPage from "../pages/Auth/RegistrationPage";
import PrivateRoute from "./PrivateRoute";
import AccountsPage from "../pages/Accounts/AccountsPage";
import SectorPage from "../pages/Sectors/SectorPage";
import TransactionsPage from "../pages/Transactions/TransactionsPage";
import EmailVerification from "../pages/Auth/EmailVerification";
import BorrowerPage from "../pages/Loan/Borrower/BorrowerPage";
import ReactPracticeCalendar from "../components/ReactPracticeCalendar";
import LoanTransactionPage from "../pages/Loan/LoanTransaction/LoanTransactionPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <ReactPracticeCalendar />,
      },
      {
        path: "/transactions",
        element: <TransactionsPage />,
      },
      {
        path: "/accounts",
        element: <AccountsPage />,
      },
      {
        path: "/sectors",
        element: <SectorPage />,
      },
      {
        path: "/borrowers",
        element: <BorrowerPage />,
      },
      {
        path: "/loan-transactions",
        element: <LoanTransactionPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth",
        element: <LoginPage />,
      },
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
      {
        path: "/auth/register",
        element: <RegistrationPage />,
      },
      {
        path: "/auth/verify",
        element: <EmailVerification />,
      },
    ],
  },
]);

export default router;
