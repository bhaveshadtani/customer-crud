
import "./App.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import CustomerList from './components/CustomerList';
import CustomerFormPage from './components/CustomerFormPage';
import ProtectedRoute from './components/ProtectedRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/add-customer" element={<CustomerFormPage />} />
            <Route path="/edit-customer/:id" element={<CustomerFormPage />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
