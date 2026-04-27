import Home from "./pages/public/Home";
import AdminDashboard from "./pages/admin/Dashboard";

const routes = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
];

export default routes;