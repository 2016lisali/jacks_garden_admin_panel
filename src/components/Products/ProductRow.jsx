import { Button, Image } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useSelector } from "react-redux";

const ProductRow = ({ product, handleDelete }) => {
    const isTester = useSelector((state) => state.currentUser?.firstName);
    const URL = "https://jacks-garden-server.herokuapp.com";
    return (
        <tr className="text-center align-middle">
            <td>
                <Image
                    className="me-3"
                    rounded
                    src={`${URL}${product.productImage}`}
                    style={{ width: "50px", height: "50px" }}
                />
            </td>
            <td>{product.productName}</td>
            <td className="d-none d-md-table-cell">{product.category}</td>
            <td className="d-none d-md-table-cell">
                {product.quantityInstock}
            </td>
            <td>{product.price}</td>
            <td>
                <Button
                    variant="link"
                    href={`/products/update?productId=${product.productId}`}
                >
                    EDIT
                </Button>
                <Button
                    variant="link"
                    onClick={() =>
                        isTester === "test"
                            ? alert(
                                  "You are with a test account, only get requests allowed"
                              )
                            : handleDelete(product.productId)
                    }
                >
                    <Trash id="deleteButton" color="FireBrick" />
                </Button>
            </td>
        </tr>
    );
};

export default ProductRow;
