
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import CustomerList from './components/CustomerList';
import CustomerFormPage from './components/CustomerFormPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/add-customer" element={<CustomerFormPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
