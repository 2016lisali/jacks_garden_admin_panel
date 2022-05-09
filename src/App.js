import {
  BackToTopBtn, Customers, CustomerForm, CustomerUpdateForm, Footer, Home, Login,
  Orders, OrderDetails, ProductForm, ProductUpdateForm, Products, Sidebar, Topbar
} from "./components/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import "./app.scss";

function App() {
  const user = useSelector(state => state.currentUser)
  return (
    <div className="App bg-light">
      <BrowserRouter>
        {user && <Topbar />}
        <Container fluid="xxl" className=" d-flex px-0">
          {user && <Sidebar display="none" />}
          <div className="d-flex flex-column flex-grow-1 justify-content-between px-md-4">
            <Routes>
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />}></Route>
              <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
              {user && (
                <>
                  <Route path="/customers" exact element={<Customers />} />
                  <Route path="/customers/create" exact element={<CustomerForm action="create" />} />
                  <Route path="/customers/update" exact element={<CustomerUpdateForm action="update" />} />
                  <Route path="/orders" exact element={<Orders />} />
                  <Route path="/orders/:id" exact element={<OrderDetails />} />
                  <Route path="/products" exact element={<Products />} />
                  <Route path="/products/create" exact element={<ProductForm action="create" />} />
                  <Route path="/products/update" exact element={<ProductUpdateForm action="update" />} />
                </>)
              }
            </Routes>
            <Footer />
          </div>
        </Container>
      </BrowserRouter>
      <BackToTopBtn />
    </div>
  );
}

export default App;
