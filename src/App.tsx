import "./App.scss";
import AdminPage from "./pages/Admin/Admin.page";
import HomePage from "./pages/Home/Home.page";
import Layout, { Content } from "antd/lib/layout/layout";
import Navbar from "./components/Navbar/Navbar.component";
import { AuthProvider } from "./context/auth.context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FoodProvider } from "./context/food.context";
import ReportsPage from "./pages/Reports/Reports.page";

function App() {
  return (
    <Router>
      <AuthProvider>
        <FoodProvider>
          <Layout className="cal-layout layout">
            <Navbar />
            <Content className="cal-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/reports" element={<ReportsPage />} />
              </Routes>
            </Content>
          </Layout>
        </FoodProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
