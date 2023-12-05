import './App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ChakraProvider, CSSReset, Box } from '@chakra-ui/react';
import SignIn from './SignIn';
import Register from './Register';
import Home from './Home';
import DestinationDetail from './DestinationDetail';
import Itinerary from './Itinerary';
import CreateItinerary from './CreateItinerary';
import LoanForm from './LoanForm';
import LoanResult from './LoanResult';
import AddDestination from './AddDestination';
import EditDestination from './EditDestination';

const PrivateRoute = ({ element }) => {
  const token1 = sessionStorage.getItem('token1');
  const token2 = sessionStorage.getItem('token2');

  // Redirect to sign-in if tokens are not present
  if (token1 === '' && token2 === '') {
    return <Navigate to="/" />;
  }

  // Render the protected component if tokens are present
  return element;
};

const AdminRoute = ({ element }) => {
  const token1 = sessionStorage.getItem('token1');
  const token2 = sessionStorage.getItem('token2');
  const username = sessionStorage.getItem('username');
  // Redirect to sign-in if tokens are not present
  if (token1 === '' && token2 === '') {
      return <Navigate to="/" />;
  }

  if (username !== 'Admin123'){
    return <Navigate to="/" />;
  }

  // Render the protected component if tokens are present
  return element;
};

const App = () => {
  return (
    <ChakraProvider>
      <CSSReset />
      <Box textAlign="center" fontSize="xl" bg="D6E8E0" minHeight="100vh">
        <Router>
          <Fragment>
            <Routes>
            <Route
              path="/home"
              element={<PrivateRoute element={<Home />} />}
            />
            <Route
              path="/destination/:id"
              element={<PrivateRoute element={<DestinationDetail />} />}
            />
            <Route
              path="/itinerary"
              element={<PrivateRoute element={<Itinerary />} />}
            />
            <Route
              path="/create-itinerary"
              element={<PrivateRoute element={<CreateItinerary />} />}
            />
            <Route
              path="/loan-form"
              element={<PrivateRoute element={<LoanForm />} />}
            />
            <Route
              path="/loan"
              element={<PrivateRoute element={<LoanResult />} />}
            />
            <Route
              path="/add-destination"
              element={<AdminRoute element={<AddDestination />} />}
            />
            <Route
              path="/edit-destination/:id"
              element={<AdminRoute element={<EditDestination />} />}
            />
            <Route path="/" element={<SignIn />} />
            <Route path="/register" element={<Register />} />

            </Routes>
          </Fragment>
        </Router>
      </Box>
    </ChakraProvider>
    
    
  );
}
export default App;
