import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Col, Form, Row, Spinner, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import {
    getOrderDetails,
    getOrderBillingDetails,
    updateOrder,
} from "../../api/api";
import { useForm } from "react-hook-form";

const OrderDetails = () => {
    const isTester = useSelector((state) => state.currentUser?.firstName);
    const [isFetching, setIsFetching] = useState(false);
    const [orderDetails, setOrderDetails] = useState();
    const [billingDetails, setBillingDetails] = useState();
    const location = useLocation();
    const order = location.state;
    const { register, handleSubmit } = useForm();

    const DetailRow = ({ data }) => {
        return (
            <tr>
                <td>{data.productName}</td>
                <td>{data.price}</td>
                <td>{data.quantity}</td>
            </tr>
        );
    };

    const updateOrderStatus = async (data) => {
        if (isTester === "test") {
            alert("You are with a test account, only get requests allowed");
            return;
        }
        setIsFetching(true);
        const formDataJson = JSON.stringify(data);
        try {
            const res = await updateOrder(order.orderId, formDataJson);
            if (res.status === 200) {
                setIsFetching(false);
            } else {
                throw new Error("something went wrong, please try later");
            }
        } catch (error) {
            setIsFetching(false);
            alert(error);
        }
    };
    // console.log(order);
    useEffect(() => {
        const getOrder = async (orderId) => {
            try {
                const result = await getOrderDetails(orderId);
                const res = await getOrderBillingDetails(orderId);
                setOrderDetails(result.data);
                setBillingDetails(res.data[0]);
            } catch (error) {
                console.log(error);
            }
        };
        getOrder(order.orderId);
    }, [order.orderId, orderDetails?.orderStatus]);
    return (
        <div className="order-details mt-5 bg-white shadow p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Order Details</h4>
            </div>
            <Row>
                <Col md="8">
                    <Table
                        borderless
                        className="shadow-sm border small mb-3 bg-body rounded-3 text-secondary"
                    >
                        <thead>
                            <tr className="text-center">
                                <th>ORDERID</th>
                                <th>DATE</th>
                                <th>STATUS</th>
                                <th className="d-none d-md-table-cell">
                                    LOCAL PICKUP
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-center">
                                <td>{order.orderId}</td>
                                <td>{order.orderDate.split("T")[0]}</td>
                                <td>
                                    <Form
                                        className="d-flex align-items-center flex-column flex-md-row"
                                        onSubmit={handleSubmit(
                                            updateOrderStatus
                                        )}
                                    >
                                        <Form.Select
                                            name="orderStatus"
                                            {...register("orderStatus", {
                                                required:
                                                    "input cannot be null",
                                            })}
                                        >
                                            <option
                                                value={
                                                    orderDetails &&
                                                    orderDetails[0].orderStatus
                                                }
                                            >
                                                {orderDetails &&
                                                    orderDetails[0].orderStatus}
                                            </option>
                                            {[
                                                "Paid",
                                                "Pending",
                                                "Completed",
                                            ].map(
                                                (item, index) =>
                                                    item !==
                                                        (orderDetails &&
                                                            orderDetails[0]
                                                                .orderStatus) && (
                                                        <option
                                                            value={item}
                                                            key={index}
                                                        >
                                                            {item}
                                                        </option>
                                                    )
                                            )}
                                        </Form.Select>
                                        <Button
                                            variant="success"
                                            type="submit"
                                            className="rounded-pill ms-2 py-0 px-2 mt-2 mt-md-0"
                                        >
                                            {isFetching ? (
                                                <Spinner
                                                    animation="border"
                                                    variant="light"
                                                    role="status"
                                                    size="sm"
                                                />
                                            ) : (
                                                <span className="small">
                                                    UPDATE
                                                </span>
                                            )}
                                        </Button>
                                    </Form>
                                </td>
                                <td className="d-none d-md-table-cell">
                                    {orderDetails?.localPickup === 1
                                        ? "Yes"
                                        : "No"}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table className="shadow-sm border small mb-3 bg-body rounded-3 text-secondary">
                        <thead className="bg-success bg-opacity-10">
                            <tr>
                                <th>ITEM</th>
                                <th>PRICE EACH</th>
                                <th>QUANTITY</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails?.map((product) => (
                                <DetailRow
                                    data={product}
                                    key={product.productId}
                                />
                            ))}
                        </tbody>
                    </Table>
                    <hr className="mb-1 mt-4" />
                    <div
                        className="small fw-bolder text-secondary px-2 pb-4"
                        style={{ width: "200px" }}
                    >
                        <div className="w-100 w-lg-25 d-flex justify-content-between py-1">
                            <span className="me-5">SUBTOTAL</span>
                            <span>{order.total}</span>
                        </div>
                        <div className="w-100 w-lg-25 d-flex justify-content-between py-1">
                            <span className="me-5">SHIPPING</span>
                            <span>{order.total >= 99 ? 0 : 9.95}</span>
                        </div>
                        <div className="w-100 w-lg-25 d-flex justify-content-between py-1">
                            <span className="me-5">TOTAL</span>
                            <span>
                                {order.total >= 99
                                    ? order.total
                                    : order.total + 9.95}
                            </span>
                        </div>
                    </div>
                </Col>
                <Col md="4">
                    <div className="border rounded-3 text-secondary small p-3 mb-3">
                        <p className="fw-bolder pb-1 my-0 small text-decoration-underline">
                            CUSTOMER DETAILS
                        </p>
                        <p className="fw-bolder pb-1 my-0">
                            {order.firstName} {order.lastName}
                        </p>
                        <p className="pb-1 my-0">{order.email}</p>
                    </div>
                    <div className="border rounded-3 text-secondary small p-3">
                        <p className="fw-bolder pb-1 my-0 small text-decoration-underline">
                            BILING DETAILS
                        </p>
                        <p className="pb-1 my-0">{billingDetails?.name}</p>
                        <p className="pb-1 my-0">{billingDetails?.phone}</p>
                        <p className="pb-1 my-0">{billingDetails?.line1}</p>
                        <p className="pb-1 my-0">{billingDetails?.line2}</p>
                        <p className="pb-1 my-0">{billingDetails?.city}</p>
                        <p className="pb-1 my-0">{billingDetails?.state}</p>
                        <p className="pb-1 my-0">
                            {billingDetails?.postal_code}
                        </p>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default OrderDetails;
