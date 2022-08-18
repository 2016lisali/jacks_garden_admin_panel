import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
    getOrderSummary,
    getProductAndOrderSummary,
    getEmailList,
} from "../../api/api";
import FetchingSpinner from "../FetchingSpinner";
import { SalesChart } from "./SalesChart";
import StatCard from "./StatCard";

const Home = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [salesData, setSalesData] = useState(null);
    const [statData, setStatData] = useState();
    const [emailData, setsEmailData] = useState();
    useEffect(() => {
        setIsFetching(true);
        const getData = async () => {
            try {
                const orderRes = await getOrderSummary();
                const statRes = await getProductAndOrderSummary();
                const totalEmails = await getEmailList();
                setSalesData(orderRes.data);
                setStatData({
                    ...statData,
                    salesData: orderRes.data,
                    totalProducts: statRes.data[0].totalProducts,
                    totalUsers: statRes.data[0].totalUsers,
                });
                setsEmailData(totalEmails.data);
                setIsFetching(false);
            } catch (error) {
                setIsFetching(false);
                console.log(error);
            }
        };
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container fluid="xl" className="home px-4 px-md-0">
            <Row className="top-container mt-4">
                <Col xs={6} md={3}>
                    <StatCard
                        title="Products"
                        bg="bg-success"
                        amount={
                            isFetching ? (
                                <FetchingSpinner />
                            ) : (
                                statData?.totalProducts
                            )
                        }
                        link="/products"
                    />
                </Col>
                <Col xs={6} md={3}>
                    <StatCard
                        title="Orders"
                        bg="bg-warning"
                        amount={
                            isFetching ? (
                                <FetchingSpinner />
                            ) : (
                                salesData &&
                                `$ ${
                                    salesData[salesData?.length - 1]
                                        ?.totalAmount / 100
                                }`
                            )
                        }
                        link="/orders"
                    />
                </Col>
                <Col xs={6} md={3}>
                    <StatCard
                        title="Customers"
                        bg="bg-primary"
                        amount={
                            isFetching ? (
                                <FetchingSpinner />
                            ) : (
                                statData?.totalUsers
                            )
                        }
                        link="/customers"
                    />
                </Col>
                <Col xs={6} md={3}>
                    <StatCard
                        title="Mailing List"
                        bg="bg-secondary"
                        amount={
                            isFetching ? <FetchingSpinner /> : emailData?.length
                        }
                        link="/mailinglist"
                    />
                </Col>
            </Row>
            <Row className="bottom-container">
                <SalesChart salesData={salesData} />
            </Row>
        </Container>
    );
};

export default Home;
