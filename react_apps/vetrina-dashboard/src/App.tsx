import { Routes, Route } from "react-router-dom";
import Dashboard from "./layouts/Dashboard";
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
