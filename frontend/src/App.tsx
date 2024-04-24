import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "./components/layouts/Layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import RestaurantDetail from "./pages/RestaurantDetail";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path="/search/:city" element={<SearchPage />} />
        <Route path="/detail/:restaurantId" element={<RestaurantDetail />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/user-profile" element={<UserProfilePage />} />
          <Route path="/manage-restaurant" element={<ManageRestaurantPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
