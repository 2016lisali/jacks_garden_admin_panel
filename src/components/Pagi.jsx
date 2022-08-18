import { Pagination } from "react-bootstrap";

const Pagi = ({ pages, currentPage, setCurrentPage }) => {
    let pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    }
    return (
        <Pagination>
            <Pagination.Prev
                onClick={() =>
                    setCurrentPage(
                        currentPage > 1 ? currentPage - 1 : currentPage
                    )
                }
            />
            {pageNumbers.map((item) => (
                <Pagination.Item
                    key={item}
                    active={item === currentPage}
                    onClick={() => setCurrentPage(item)}
                >
                    {item}
                </Pagination.Item>
            ))}
            <Pagination.Next
                onClick={() =>
                    setCurrentPage(
                        currentPage < pages ? currentPage + 1 : currentPage
                    )
                }
            />
        </Pagination>
    );
};

export default Pagi;
