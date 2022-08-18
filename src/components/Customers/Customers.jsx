import { useEffect, useState } from "react";
import { Button, FormControl, Form, Table } from "react-bootstrap";
import { getAllUsers, deleteUser, getUserBySearch } from "../../api/api";
import CustomerRow from "./CustomerRow";
import Pagi from "../Pagi";
import { useForm } from "react-hook-form";
// import FetchingSpinner from '../FetchingSpinner';
import IsFetchingModal from "../IsFetchingModal";

const Customers = () => {
    const [customers, setCustomers] = useState();
    const [isFetching, setIsFetching] = useState(false);
    const [pages, setPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const handleDelete = async (userId) => {
        setIsFetching(true);
        try {
            await deleteUser(userId);
            setIsFetching(false);
            setCustomers(
                customers.filter((customer) => customer.userId !== userId)
            );
            alert("User Deleted");
        } catch (error) {
            setIsFetching(false);
            alert(error);
        }
    };
    const handleSearch = async (data) => {
        try {
            const res = await getUserBySearch(data.search, data.search);
            console.log(res.data);
            res.data && setCustomers(res.data);
            setPages(Math.ceil(res.data.length / 10));
        } catch (error) {
            alert(error.response.data);
        }
    };
    useEffect(() => {
        const getCustomerData = async () => {
            setIsFetching(true);
            try {
                const result = await getAllUsers();
                setCustomers(result.data);
                setIsFetching(false);
                setPages(Math.ceil(result.data.length / 10));
            } catch (error) {
                setIsFetching(false);
                console.log(error);
            }
        };
        getCustomerData();
    }, []);

    return (
        <div className="customer mt-5 mx-2">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Customers</h4>
                <Button
                    variant="dark"
                    href="/customers/create"
                    size="sm"
                    className="rounded-pill px-3"
                >
                    + ADD
                </Button>
            </div>
            <div className="mb-3">
                <Form
                    className="input-group"
                    onSubmit={handleSubmit(handleSearch)}
                >
                    <FormControl
                        id="search-customers"
                        placeholder="Search customers by email address or name"
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
                        variant="outline-primary"
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
                    <thead className="bg-primary small bg-opacity-75 text-light">
                        <tr className="text-center">
                            <th>USERID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th className="d-none d-md-table-cell">
                                DATE JOINED
                            </th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers
                            ?.slice((currentPage - 1) * 10, currentPage * 10)
                            .map((customer) => (
                                <CustomerRow
                                    customer={customer}
                                    handleDelete={handleDelete}
                                    key={customer.userId}
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

export default Customers;
