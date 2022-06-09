import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CreateStudent from '../pages/CreateStudent';
import EditStudent from '../pages/EditStudent';
import NotFound from '../pages/NotFound';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => (
  <Router>
    <NavBar />
    <Routes>
      <Route path="/" element={<CreateStudent />} />
      <Route path="/student/:email" element={<EditStudent />} />
      <Route element={<NotFound />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
