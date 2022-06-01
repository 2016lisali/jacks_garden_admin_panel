import { Button, Image } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
const ProductRow = ({ product, handleDelete }) => {
  // const URL = "http://localhost:5000";
  const URL = "https://jacks-garden-server.herokuapp.com";
  return (
    <tr className='text-center align-middle'>
      <td><Image className="me-3" rounded src={`${URL}${product.productImage}`} style={{ width: "50px", height: "50px" }} /></td>
      <td>{product.productName}</td>
      <td className='d-none d-md-table-cell'>{product.category}</td>
      <td className='d-none d-md-table-cell'>{product.quantityInstock}</td>
      <td>
        {product.price}
      </td>
      <td>
        <Button variant="link" href={`/products/update?productId=${product.productId}`}>EDIT</Button>
        <Button variant="link" onClick={() => handleDelete(product.productId)}>
          <Trash id="deleteButton" color="FireBrick" />
        </Button></td>
    </tr>
  )
}

export default ProductRow