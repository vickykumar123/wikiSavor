import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Layout from "./components/layouts/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<span>Home</span>} />
          <Route path="/user-profile" element={<span>User profile</span>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
