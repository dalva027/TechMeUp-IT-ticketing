import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TicketDetail from "./pages/TicketDetail";
import NewTicket from "./pages/NewTicket";
import Inbox from "./pages/Inbox";
import MyTickets from "./pages/MyTickets";
import Users from "./pages/Users";
import Groups from "./pages/Groups";
import Devices from "./pages/Devices";
import Networks from "./pages/Networks";
import Reports from "./pages/Reports";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => {
      setCollapsed(!e.matches);
    };
    // Default: expanded on wide screens, collapsed on narrow
    setCollapsed(!mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout sidebarCollapsed={collapsed} onCollapseChange={setCollapsed} />}>  
            <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tickets/new" element={<NewTicket />} />
            <Route path="tickets/:id" element={<TicketDetail />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="tickets" element={<MyTickets />} />
            <Route path="users" element={<Users />} />
            <Route path="groups" element={<Groups />} />
            <Route path="devices" element={<Devices />} />
            <Route path="networks" element={<Networks />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
