import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import Groups from "./pages/Groups";
import AddExpense from "./pages/AddExpense";
import Balances from "./pages/Balances";
import DashboardNavbar from "./components/DashboardNavbar";
import Home from "./pages/Home";
import CreateGroup from "./pages/CreateGroup";
import AddMember from "./pages/AddMember";
import ViewGroup from "./pages/ViewGroup";
function ProtectedRoute({ children }) {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <DashboardNavbar />
      {children}
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/userdashboard" element={<UserDashboard />} />
      <Route path="/creategroup" element={<CreateGroup />} />
      <Route path="/addmember/:groupId" element={<AddMember />} />
      <Route path="/viewgroup/:groupId" element={<ViewGroup/>}/>
      <Route path="/addexpense/:groupId" element={<AddExpense />} />

      <Route
        path="/groups"
        element={
          <ProtectedRoute>
            <Groups />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-expense"
        element={
          <ProtectedRoute>
            <AddExpense />
          </ProtectedRoute>
        }
      />

      <Route
        path="/balances"
        element={
          <ProtectedRoute>
            <Balances />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
