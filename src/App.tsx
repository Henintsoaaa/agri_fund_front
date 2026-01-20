import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/login" element={<AuthPage />} />
        <Route
          path="/reset-password"
          element={<div>Reset Password Page</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
