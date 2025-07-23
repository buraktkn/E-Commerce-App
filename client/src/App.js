import './App.css';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar';
import SignIn from './Pages/Auth/SignIn';
import SignUp from './Pages/Auth/SignUp';
import Products from './Pages/Products';
import ProductDetail from './Pages/ProductDetail';
import Profile from './Pages/Profile';
import ProtectedRoute from './Pages/ProtectedRoute';
import Basket from './Pages/Basket';
import Error404 from './Pages/Error404';

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <div id='content'>
        <Routes>
          <Route path="/" Component={Products}/>
          <Route path="/product/:product_id" Component={ProductDetail}/>
          <Route path="/signin" Component={SignIn}/>
          <Route path="/signup" Component={SignUp}/>
          <Route path="/basket" Component={Basket}/>
          <Route path="*" Component={Error404}/>
          <Route element={<ProtectedRoute />}>
           <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
        </div>
      </div>
    </Router>
  );}

export default App;
