import { Routes, Route } from "react-router-dom";
import Dashboard from "./layouts/Main";
import Error404 from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;
