import { useState } from "react";
import { Button, Container, Form, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login } from "../actions/userAction";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import SuccessDiv from "./SuccessDiv";


const Login = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleLogin = (data) => {
    const formDataJSON = JSON.stringify(data)
    login(formDataJSON, setIsSuccess, dispatch, navigate)
  }
  return (
    <Container fluid="xl" className="login-container d-flex justify-content-center vh-100 align-items-center">
      {isSuccess ?
        <SuccessDiv message="Welcome to Jack's Garden Admin Panel. Redirecting you to dashboard now." /> :
        <Form className="login-form bg-white shadow rounded-3 py-5 px-3 px-md-4"
          onSubmit={handleSubmit(handleLogin)}>
          <h1 className="text-center text-success fw-bold pt-3">LOG IN</h1>
          <h6 className="text-center text-secondary pb-3">@JACK'S GARDEN ADMIN PANEL</h6>
          <FloatingLabel className="mb-3" label="Email">
            <Form.Control
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            <p className="text-danger">{errors.email && "Unvalid email"}</p>
          </FloatingLabel>
          <FloatingLabel className="mb-3" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            <p className="text-danger">{errors.password && "Please enter a password"}</p>
          </FloatingLabel>
          <div className="d-grid gap-2">
            <Button variant="success" type="submit">SUBMIT</Button>
          </div>
        </Form>}

    </Container>
  );

}
export default Login;