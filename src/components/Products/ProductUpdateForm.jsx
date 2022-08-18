import { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import { getProductById } from "../../api/api";
import { useLocation } from "react-router-dom";
import IsFetchingModal from "../IsFetchingModal";

const ProductUpdateForm = () => {
    const [data, setData] = useState();
    const location = useLocation();
    useEffect(() => {
        const getProduct = async (productId) => {
            try {
                const result = await getProductById(productId);
                // delete image url from the result object
                setData({ ...result.data[0] });
            } catch (error) {
                alert(error);
            }
        };
        const productId = location.search.split("=")[1];
        getProduct(productId);
    }, [location.search]);
    return data ? (
        <ProductForm preloadedValues={data} action="update" />
    ) : (
        <IsFetchingModal />
    );
};

export default ProductUpdateForm;
