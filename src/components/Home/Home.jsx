import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getOrderSummary, getProductAndOrderSummary } from "../../api/api";
import { SalesChart } from "./SalesChart";
import StatCard from "./StatCard";

const Home = () => {
  const [salesData, setSalesData] = useState()
  const [statData, setStatData] = useState();
  useEffect(() => {
    const getData = async () => {
      try {
        const orderRes = await getOrderSummary()
        const statRes = await getProductAndOrderSummary();
        setSalesData(orderRes.data)
        setStatData({ ...statData, "salesData": orderRes.data, "totalProducts": statRes.data[0].totalProducts, "totalUsers": statRes.data[0].totalUsers })
      } catch (error) {
        alert(error)
      }
    }
    getData()
  }, [])

  return (
    <Container fluid="xl" className="home px-4 px-md-0">
      <Row className="top-container mt-4">
        <Col md={4}>
          <StatCard title="Products"
            amount={statData?.totalProducts}
            link="/products" />
        </Col>
        <Col md={4}>
          <StatCard title="Orders"
            amount={`$ ${salesData && salesData[salesData?.length - 1]?.totalAmount / 100}`}
            link="/orders" />
        </Col>
        <Col md={4}>
          <StatCard title="Customers"
            amount={statData?.totalUsers}
            link="/customer" />
        </Col>
      </Row>
      <Row className="bottom-container">
        <SalesChart salesData={salesData} />
      </Row>
    </Container>
  )
}

export default Home;