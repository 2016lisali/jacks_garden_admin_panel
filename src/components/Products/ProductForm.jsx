import {
    Button,
    Col,
    Container,
    FloatingLabel,
    Form,
    Row,
    Spinner,
} from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { createProduct, updateProduct, uploadImg } from "../../api/api.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// create form validation schema
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const schema = yup
    .object({
        productName: yup
            .string()
            .max(50, "The length cannot be over 45")
            .required()
            .matches(
                /^[A-Za-z0-9 -]+$/,
                "The product name can only contain letters and alphabets"
            ),
        category: yup
            .string()
            .required()
            .matches(
                /\b(?:indoor|outdoor|fruittree)\b/,
                "category is a required field"
            ),
        productDescription: yup.string().max(500).required(),
        productImage: yup.string(),
        productImageFile: yup
            .mixed()
            .test(
                "FILE",
                "Products image is a required field.",
                (value) => value.length > 0
            )
            .test(
                "FILE_SIZE",
                "The file size cannot be over 1 MB.",
                (value) =>
                    value.length === 0 ||
                    !value ||
                    (value.length > 0 && value["0"].size <= 1024000)
            )
            .test(
                "FILE_FORMAT",
                "Only support jpg, jpeg and png format.",
                (value) =>
                    value.length === 0 ||
                    (value.length > 0 &&
                        SUPPORTED_FORMATS.includes(value["0"].type))
            ),
        price: yup
            .number()
            .required()
            .test(
                "Is positive?",
                "ERROR: The number must be greater than 0!",
                (value) => value > 0
            ),
        quantityInstock: yup
            .number()
            .integer()
            .required()
            .test(
                "Is positive?",
                "ERROR: The number must be greater than 0!",
                (value) => value > 0
            ),
    })
    .required();

const ProductForm = ({ action, preloadedValues }) => {
    const [isFetching, setIsFetching] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isTester = useSelector((state) => state.currentUser?.firstName);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: preloadedValues,
    });

    const handleCreateProduct = async (data) => {
        if (isTester === "test") {
            alert("You are with a test account, only get requests allowed");
            return;
        }
        setIsFetching(true);
        const jsonFormData = JSON.stringify({
            ...data,
            productImage: "/images/" + data.productImageFile["0"].name,
        });
        const imgform = new FormData();
        imgform.append("productImage", data.productImageFile["0"]);
        try {
            await uploadImg(imgform);
            await createProduct(jsonFormData);
            setIsFetching(false);
            navigate("/products");
            // console.log(result);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };
    const handleUpdateProduct = async (data) => {
        if (isTester === "test") {
            alert("You are with a test account, only get requests allowed");
            return;
        }
        setIsFetching(true);
        const imgform = new FormData();
        if (data.productImageFile["0"]) {
            data["productImage"] = "/images/" + data.productImageFile["0"].name;
            imgform.append("productImage", data.productImageFile["0"]);
        }
        const jsonFormData = JSON.stringify(data);
        try {
            data.productImageFile["0"] && (await uploadImg(imgform));
            await updateProduct(jsonFormData);
            setIsFetching(false);
            navigate("/products");
        } catch (error) {
            setIsFetching(false);
            alert(error);
        }
    };
    return (
        <Container
            fluid="xl"
            className="d-flex justify-content-center px-0 py-md-3"
        >
            <Form
                className="bg-white shadow p-4 rounded w-100"
                onSubmit={handleSubmit(handleCreateProduct)}
            >
                <h2 className="text-center mb-3">
                    {location.pathname.includes("create")
                        ? "Create "
                        : "Update "}
                    Product
                </h2>
                <Row className="mb-3">
                    <Col md>
                        <FloatingLabel className="mb-3" label="Product Name">
                            <Form.Control
                                {...register("productName")}
                                placeholder="Product Name"
                            />
                        </FloatingLabel>
                        <p className="text-danger">
                            {errors.productName?.message}
                        </p>

                        <FloatingLabel className="mb-3" label="Category">
                            <Form.Select {...register("category")}>
                                <option>Choose the category</option>
                                <option value="indoor">indoor</option>
                                <option value="outdoor">outdoor</option>
                                <option value="fruittree">fruittree</option>
                            </Form.Select>
                        </FloatingLabel>
                        <p className="text-danger">
                            {errors.category?.message}
                        </p>
                        <FloatingLabel
                            className="mb-3"
                            label="Quantity In Stock"
                        >
                            <Form.Control
                                min="0"
                                {...register("quantityInstock")}
                                placeholder="Quatity In Stock"
                                name="quantityInstock"
                            />
                        </FloatingLabel>
                        <p className="text-danger">
                            {errors.quantityInstock?.message}
                        </p>

                        <FloatingLabel label="Price">
                            <Form.Control
                                type="number"
                                step="0.01"
                                {...register("price")}
                                placeholder="price"
                            />
                        </FloatingLabel>
                        <p className="text-danger">{errors.price?.message}</p>
                        <Form.Group className="mt-3">
                            <Form.Control
                                type="file"
                                placeholder="product image"
                                multiple={false}
                                {...register("productImageFile")}
                            />
                            <p className="text-danger">
                                {errors.productImageFile?.message}
                            </p>
                        </Form.Group>
                    </Col>
                    <Col md className="pt-3 pt-md-0">
                        <FloatingLabel label="Description" className="h-100">
                            <Form.Control
                                as="textarea"
                                className="h-100"
                                placeholder="product description"
                                {...register("productDescription")}
                            />
                        </FloatingLabel>
                        <p className="text-danger">
                            {errors.productDescription?.message}
                        </p>
                    </Col>
                </Row>
                <input className="d-none" {...register("productImage")} />
                <Button
                    variant="success"
                    type="submit"
                    className={`w-100 mt-3 d-${
                        action === "create" ? "block" : "none"
                    }`}
                >
                    {isFetching ? (
                        <Spinner
                            animation="border"
                            variant="light"
                            role="status"
                            size="sm"
                        />
                    ) : (
                        "CREATE"
                    )}
                </Button>
                <Button
                    variant="success"
                    type="submit"
                    className={`w-100 mt-3 d-${
                        action === "update" ? "block" : "none"
                    }`}
                    onClick={handleSubmit(handleUpdateProduct)}
                >
                    {isFetching ? (
                        <Spinner
                            animation="border"
                            variant="light"
                            role="status"
                            size="sm"
                        />
                    ) : (
                        "UPDATE"
                    )}
                </Button>
            </Form>
        </Container>
    );
};

export default ProductForm;
// Slow-growing evergreen shrubs, with dense branches, perfect for pot.
