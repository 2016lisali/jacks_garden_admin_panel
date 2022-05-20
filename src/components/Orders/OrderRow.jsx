import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const OrderRow = ({ order, handleDelete }) => {
  return (
    <tr className='text-center align-middle'>
      <td>{order.orderId}</td>
      <td className='d-none d-md-table-cell'>{order.orderDate.split("T")[0]}</td>
      <td>{order.orderStatus}</td>
      <td>{order.total}</td>
      <td>
        <Link to={`/orders/${order.orderId}`} state={order}>
          Details
        </Link>
        <Button variant="link" onClick={() => handleDelete(order.orderId)}>
          <Trash color="FireBrick" />
        </Button>
      </td>
    </tr>
  )
}

export default OrderRow;