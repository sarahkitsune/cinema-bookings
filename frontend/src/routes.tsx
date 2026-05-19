import Home from "./pages/public/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/admin/Dashboard";
import Login from "./pages/admin/Login";

const routes = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/login",
    element: <Login />
  }
];

export default routes;