import {
  BackToTopBtn, Customers, CustomerForm, CustomerUpdateForm, Footer, Home, Login,
  Orders, OrderDetails, ProductForm, ProductUpdateForm, Products, Sidebar, Topbar
} from "./components/index";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import RequireAuth from "./components/RequireAuth";
import "./app.scss";
import { useSelector } from "react-redux";

function App() {
  const isAdmin = useSelector(state => state.currentUser?.isAdmin);
  return (
    <div className="App bg-light">
      <BrowserRouter>
        {isAdmin && <Topbar />}
        <Container fluid="xl" className=" d-flex px-0 vh-100">
          {isAdmin && <Sidebar display="none" />}
          <div className="d-flex flex-column flex-grow-1 justify-content-between px-md-4">
            <Routes>
              <Route path="/" exact element={<RequireAuth><Home /></RequireAuth>} />
              <Route path="/login" exact element={!isAdmin ? <Login /> : <Navigate to="/" replace={true} />}></Route>
              <Route path="/customers" exact element={<RequireAuth><Customers /></RequireAuth>} />
              <Route path="/customers/create" exact element={<RequireAuth><CustomerForm action="create" /></RequireAuth>} />
              <Route path="/customers/update" exact element={<RequireAuth><CustomerUpdateForm action="update" /></RequireAuth>} />
              <Route path="/orders" exact element={<RequireAuth><Orders /></RequireAuth>} />
              <Route path="/orders/:id" exact element={<RequireAuth><OrderDetails /></RequireAuth>} />
              <Route path="/products" exact element={<RequireAuth><Products /></RequireAuth>} />
              <Route path="/products/create" exact element={<RequireAuth><ProductForm action="create" /></RequireAuth>} />
              <Route path="/products/update" exact element={<RequireAuth><ProductUpdateForm action="update" /></RequireAuth>} />
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
