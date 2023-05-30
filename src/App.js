import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import GetRoutes from "./components/routes";

function App() {
  return (
    <AuthProvider>
      <Router>
        <GetRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
