import { useState, useEffect } from "react";
import { Button, Form, FormControl, Table } from "react-bootstrap";
import OrderRow from "./OrderRow";
import { getAllOrders, deleteOrderById, getOrderDetails } from "../../api/api";
// import FetchingSpinner from '../FetchingSpinner';
import { useForm } from "react-hook-form";
import Pagi from "../Pagi";
import IsFetchingModal from "../IsFetchingModal";

const Orders = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [orders, setOrders] = useState();
    const [pages, setPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const deleteOrder = async (orderId) => {
        setIsFetching(true);
        try {
            await deleteOrderById(orderId);
            setIsFetching(false);
            alert("Order deleted");
        } catch (error) {
            setIsFetching(false);
            alert(error);
        }
    };
    const handleSearch = async (data) => {
        setIsFetching(true);
        try {
            const res = await getOrderDetails(data.search);
            res.data && setOrders([{ ...res.data[0], orderId: data.search }]);
            setPages(Math.ceil(res.data.length / 10));
            setIsFetching(false);
        } catch (error) {
            setIsFetching(false);
            alert(error.response.data);
        }
    };
    useEffect(() => {
        const getOrders = async () => {
            setIsFetching(true);
            try {
                const res = await getAllOrders();
                setPages(Math.ceil(res.data.length / 10));
                setOrders(res.data);
                setIsFetching(false);
            } catch (error) {
                console.log(error);
                setIsFetching(false);
            }
        };
        getOrders();
    }, []);
    return (
        <div className="orders mt-5 mx-2">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Orders</h4>
            </div>
            <div className="w-100 mb-3">
                <Form
                    className="input-group"
                    onSubmit={handleSubmit(handleSearch)}
                >
                    <FormControl
                        id="search-orders"
                        type="text"
                        placeholder="Search orders by order Id"
                        name="search"
                        {...register("search", {
                            required: "input cannot be null",
                            maxLength: {
                                value: 45,
                                message: "Max length is 45",
                            },
                        })}
                    />
                    <Button
                        type="submit"
                        variant="outline-warning"
                        className="rounded-end px-4"
                    >
                        Search
                    </Button>
                    <span className="search-error position-absolute text-danger">
                        {errors.search && errors.search.message}
                    </span>
                </Form>
            </div>
            <div className="position-relative">
                <Table className="shadow-sm mb-2 bg-body rounded text-secondary">
                    <thead className="bg-warning small text-light">
                        <tr className="text-center">
                            <th>ORDER ID</th>
                            <th className="d-none d-md-table-cell">DATE</th>
                            <th>STATUS</th>
                            <th>AMOUNT</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders
                            ?.slice((currentPage - 1) * 10, currentPage * 10)
                            .map((order) => (
                                <OrderRow
                                    order={order}
                                    key={order.orderId}
                                    handleDelete={deleteOrder}
                                />
                            ))}
                    </tbody>
                </Table>
                {isFetching && <IsFetchingModal />}
            </div>
            <Pagi
                pages={pages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default Orders;
