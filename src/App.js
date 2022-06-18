import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./components/Sidebar/SideBar";
import DashboardPage from "./pages/Dashboard";
import UsersPage from "./pages/Users";
import MessagesPage from "./pages/Messages";
import FileManagerPage from "./pages/FileManager";
import AnalyticsPage from "./pages/Analytic";
import OrderPage from "./pages/Order";
import SavedPage from "./pages/Saved";
import SettingPage from "./pages/Setting";
import NotfoundPage from "./pages/NotfoundPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <SideBar>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/file-manager" element={<FileManagerPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/settings" element={<SettingPage />} />
            <Route path="*" element={<NotfoundPage />} />
          </Routes>
        </SideBar>
      </BrowserRouter>
    </>
  );
}
export default App;
