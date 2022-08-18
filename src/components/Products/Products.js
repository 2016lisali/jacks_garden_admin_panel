import { useState, useEffect } from "react";
import {
    getAllProducts,
    deleteProductById,
    getProductBySearch,
} from "../../api/api";
import { Button, Form, FormControl, Table } from "react-bootstrap";
import ProductRow from "./ProductRow";
import { useForm } from "react-hook-form";
import Pagi from "../Pagi";
import IsFetchingModal from "../IsFetchingModal";

const Products = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [products, setProducts] = useState();
    const [pages, setPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);

    const handleSearch = async (data) => {
        setIsFetching(true);
        try {
            const result = await getProductBySearch(data.search, data.search);
            result && setProducts(result.data);
            setPages(Math.ceil(result.data.length / 10));
            setIsFetching(false);
        } catch (error) {
            setIsFetching(false);
            alert(error);
        }
    };

    const handleDelete = async (productId) => {
        setIsFetching(true);
        try {
            await deleteProductById(productId);
            setIsFetching(false);
            setProducts(
                products.filter((product) => product.productId !== productId)
            );
            alert("Product Deleted");
        } catch (error) {
            setIsFetching(false);
            alert(error);
        }
    };

    useEffect(() => {
        const getProducts = async () => {
            setIsFetching(true);
            try {
                const res = await getAllProducts();
                setPages(Math.ceil(res.data.length / 10));
                setProducts(res.data);
                setIsFetching(false);
            } catch (error) {
                console.log(error);
                setIsFetching(false);
            }
        };
        getProducts();
    }, []);

    return (
        <div className="products mt-5 mx-2">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Products</h4>
                <Button
                    variant="dark"
                    size="sm"
                    className="rounded-pill px-3"
                    href="/products/create"
                >
                    + ADD
                </Button>
            </div>
            <div className="w-100 mb-3">
                <Form
                    className="input-group"
                    onSubmit={handleSubmit(handleSearch)}
                >
                    <FormControl
                        id="search-product"
                        placeholder="Search product by category or product name"
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
                        variant="outline-success"
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
                    <thead className="bg-success small text-light">
                        <tr className="text-center">
                            <th></th>
                            <th>PRODUCT</th>
                            <th className="d-none d-md-table-cell">CATEGORY</th>
                            <th className="d-none d-md-table-cell">
                                REMAINING
                            </th>
                            <th>PRICE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products
                            ?.slice((currentPage - 1) * 10, currentPage * 10)
                            .map((product) => (
                                <ProductRow
                                    product={product}
                                    handleDelete={handleDelete}
                                    key={product.productId}
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

export default Products;
