import { useState, useEffect } from "react";
import CustomerForm from "./CustomerForm";
import { getUserById } from "../../api/api";
import { useLocation } from "react-router-dom";
import IsFetchingModal from "../IsFetchingModal";

const CustomerUpdateForm = () => {
    const [data, setData] = useState();
    const location = useLocation();
    useEffect(() => {
        const getUser = async (userId) => {
            try {
                const result = await getUserById(userId);
                console.log(result);
                // delete image url from the result object
                setData({ ...result.data[0] });
            } catch (error) {
                alert(error);
            }
        };
        const userId = location.search.split("=")[1];
        console.log(userId);
        getUser(userId);
    }, [location.search]);
    return data ? (
        <CustomerForm preloadedValues={data} action="update" />
    ) : (
        <IsFetchingModal />
    );
};

export default CustomerUpdateForm;
