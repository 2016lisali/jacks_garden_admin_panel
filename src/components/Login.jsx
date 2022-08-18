import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Form, FloatingLabel } from "react-bootstrap";
import { login } from "../actions/userAction";
import { useForm } from "react-hook-form";
import { FetchingSpinner, SuccessDiv } from "./index";

const Login = () => {
    const isSuccess = useSelector((state) => state.isSuccess);
    const isFetching = useSelector((state) => state.isFetching);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const handleLogin = (data) => {
        const formDataJSON = JSON.stringify(data);
        login(formDataJSON, dispatch);
    };
    return (
        <Container
            fluid="xl"
            className="login-container d-flex justify-content-center align-items-center"
        >
            {isSuccess ? (
                <SuccessDiv message="Welcome to Jack's Garden Admin Panel. Redirecting you to dashboard now." />
            ) : (
                <Form
                    className="login-form bg-white shadow rounded-3 py-5 px-3 px-md-4"
                    onSubmit={handleSubmit(handleLogin)}
                >
                    <h1 className="text-center text-success fw-bold pt-3">
                        LOG IN
                    </h1>
                    <h6 className="text-center text-secondary pb-3">
                        @JACK'S GARDEN ADMIN PANEL
                    </h6>
                    <FloatingLabel className="mb-3" label="Email">
                        <Form.Control
                            placeholder="Email"
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "invalid email address",
                                },
                            })}
                        />
                        <p className="text-danger">
                            {errors.email && "Please enter a valid email"}
                        </p>
                    </FloatingLabel>
                    <FloatingLabel className="mb-3" label="Password">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            {...register("password", {
                                pattern: {
                                    value: /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+*!=.]).*$/,
                                    message: `Please check your password`,
                                },
                                required: "Please enter your password",
                            })}
                        />
                        <p className="text-danger">
                            {errors.password && errors.password.message}
                        </p>
                    </FloatingLabel>
                    <div className="d-grid gap-2">
                        <Button variant="success" type="submit">
                            {isFetching ? <FetchingSpinner /> : "SUBMIT"}
                        </Button>
                    </div>
                    <div className="border border-danger rounded-3 p-3 mt-3">
                        <p className="py-0 my-0">The demonstration account:</p>
                        <p className="py-0 my-0">
                            <strong>Email</strong>: admintest@gmail.com
                        </p>
                        <p className="py-0 my-0">
                            <strong>Password</strong>: Admin1234&
                        </p>
                        <p className="py-0 my-0">
                            <strong>PS</strong>: Only get requests allowed for
                            demonstration account
                        </p>
                    </div>
                </Form>
            )}
        </Container>
    );
};
export default Login;
