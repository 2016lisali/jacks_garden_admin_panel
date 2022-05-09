import { Col, Form, Button, FloatingLabel, Row, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react";
import { createUser, updateUser } from "../../api/api"
import { FormInput } from "../index"

const schema = yup.object({
  firstName: yup.string().max(25, "The length cannot be over 45").matches(/^([a-zA-Z])+$/,
    "upper case or lower case letters only, at least 2 letters.").required(),
  lastName: yup.string().max(25, "The length cannot be over 45").matches(/^([a-zA-Z])+$/,
    "upper case or lower case letters only, at least 2 letters.").required(),
  email: yup.string().email().required(),
  isAdmin: yup.string().required(),
  password: yup.string().max(20, "The length cannot be over 25").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    `Minimum 8 characters, at least one letter and one number`).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
}).required();

const CustomerForm = ({ action, preloadedValues }) => {
  const [isFetching, setIsFetching] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: preloadedValues
  });
  const navigate = useNavigate();
  const location = useLocation();
  const handleCreateUser = async (data) => {
    setIsFetching(true)
    const jsonFormData = JSON.stringify(data)
    try {
      await createUser(jsonFormData)
      setIsFetching(false)
      navigate("/customers")
    } catch (error) {
      setIsFetching(false)
      alert(error)
    }
  };
  console.log(preloadedValues);
  const handleUpdateUser = async (data) => {
    setIsFetching(true)
    const jsonFormData = JSON.stringify(data)
    try {
      await updateUser(jsonFormData)
      setIsFetching(false)
      navigate("/customers")
    } catch (error) {
      setIsFetching(false)
      alert(error)
    }
  }
  return (
    <div className="register-container w-100 d-flex justify-content-center align-items-center py-md-4">
      <Form className="register-form bg-white w-100 rounded-3 py-5 px-3 px-md-4 mx-md-3" onSubmit={handleSubmit(handleCreateUser)}>
        <h2 className="text-center py-3">{location.pathname.includes("create") ? "CREATE " : "UPDATE "}USER</h2>
        <Row>
          <Col lg>
            <FormInput register={register} errors={errors} name="firstName" type="text" formattedName="First Name" tips="upper case or lower case letters only, at least 2 letters." />
            <FormInput register={register} errors={errors} name="lastName" type="text" formattedName="Last Name" tips="upper case or lower case letters only, at least 2 letters." />
            <FormInput register={register} errors={errors} name="email" type="email" formattedName="Email" tips="must be a valid email address" />
          </Col>
          <Col lg>
            <FloatingLabel className="mb-3" label="Is Admin">
              <Form.Select
                name="isAdmin"
                {...register("isAdmin")}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </Form.Select>
            </FloatingLabel>
            <FormInput register={register} errors={errors} name="password" type="password" formattedName="Password" tips="Minimum 8 characters, at least one uppercase letter, one lowercase letter and one number" />
            <FormInput register={register} errors={errors} name="confirmPassword" type="password" formattedName="Confirm Password" tips="Passwords must match" />
          </Col>
        </Row>
        <div className="d-grid gap-2 mb-3">
          <Button variant="success" type="submit"
            className={`w-100 d-${action === "create" ? "block" : "none"}`} >
            {isFetching ? <Spinner animation="border" variant="light" role="status" size="sm" /> : 'CREATE'}
          </Button>
          <Button variant="success" type="submit"
            className={`w-100 d-${action === "update" ? "block" : "none"}`}
            onClick={handleSubmit(handleUpdateUser)}>
            {isFetching ? <Spinner animation="border" variant="light" role="status" size="sm" /> : 'UPDATE'}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default CustomerForm