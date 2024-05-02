import { Route, Routes } from "react-router-dom"
import { Login } from "./views/login"
import { Invoices } from "./views/invoices";
import { ProtectedRoute } from "./components/privateRoute";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { checkUserIsAuthenticated } from "./features/user-authentication";
import useAuthCheck from "./hooks/checkAuth";
import { Navigation } from "./components/Navigation";
import { Bills } from "./views/bills";
import { Expenses } from "./views/expenses";
import { Reports } from "./views/reports";

function App() {
  useAuthCheck();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(checkUserIsAuthenticated());
    return () => {
      promise.abort();
    }
  }, []);

  const isAuthenticated = useAppSelector(state => state.userAuthentication.isAuthenticated);

  return (
    <div className="grid grid-flow-col align-middle grid-cols-12 bg-gradient-to-b from-primary-100 to-primary-600 h-screen p-4 overflow-hidden">
      {isAuthenticated && <Navigation />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/invoices" element={
          <ProtectedRoute>
            <Invoices />
          </ProtectedRoute>
        } />
        {/* Catch all routes */}
        <Route path="/bills" element={
          <ProtectedRoute>
            <Bills />
          </ProtectedRoute>
        } />
        <Route path="/expenses" element={
          <ProtectedRoute>
            <Expenses />
          </ProtectedRoute>
        } />
        <Route path="/Reports" element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
