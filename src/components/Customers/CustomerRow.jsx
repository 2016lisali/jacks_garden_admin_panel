import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
const CustomerRow = ({ customer, handleDelete }) => {
  return (
    <tr className='text-center align-middle'>
      <td>
        {customer.userId}
      </td>
      <td>{`${customer.firstName} ${customer.lastName}`}</td>
      <td id="emailBar">{customer.email}</td>
      <td className="d-none d-md-table-cell">
        {customer.dateCreate.split("T")[0]}
      </td>
      <td>
        <Button variant="link" href={`/customers/update?userId=${customer.userId}`}>EDIT</Button>
        <Button variant="link" onClick={() => handleDelete(customer.userId)}>
          <Trash color="FIreBrick" />
        </Button>
      </td>
    </tr >
  )
}

export default CustomerRow;