import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
    Button,
    Container,
    Col,
    Form,
    FloatingLabel,
    Row,
    Table,
} from "react-bootstrap";
import { getEmailList } from "../api/api";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { FetchingSpinner, IsFetchingModal, Pagi, SuccessDiv } from "./index";

const MailingList = () => {
    const isTester = useSelector((state) => state.currentUser?.firstName);
    const [allEmails, setAllEmails] = useState();
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [lists, setLists] = useState();
    const [pages, setPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const form = useRef();
    const ListRow = ({ list }) => (
        <tr className="text-center align-middle">
            <td>{list.email_id}</td>
            <td>{list.email}</td>
            <td>
                <input
                    type="checkbox"
                    checked={selectedEmails.includes(list.email)}
                    value={list.email}
                    onChange={handleSelectEmail}
                />
            </td>
        </tr>
    );
    const handleSelectEmail = (e) => {
        e.target.checked
            ? setSelectedEmails([...selectedEmails, e.target.value])
            : setSelectedEmails(
                  selectedEmails.filter((email) => email !== e.target.value)
              );
    };
    const onSubmit = (data) => {
        console.log(form.current);
        setIsFetching(true);
        emailjs
            .sendForm(
                process.env.REACT_APP_SERVICE_ID,
                process.env.REACT_APP_TEMPLATE_ID,
                form.current,
                process.env.REACT_APP_PUBLIC_KEY
            )
            .then(
                () => {
                    setIsFetching(false);
                    setIsSuccess(true);
                },
                (error) => {
                    setIsFetching(false);
                    alert(error.text);
                }
            );
    };
    useEffect(() => {
        const getEmails = async () => {
            setIsFetching(true);
            try {
                const res = await getEmailList();
                setAllEmails(res.data);
                setPages(Math.ceil(res.data.length / 10));
                setLists(res.data);
                setIsFetching(false);
            } catch (error) {
                alert(error);
                setIsFetching(false);
            }
        };
        getEmails();
    }, []);
    return (
        <Container fluid="xl" className="mailingList mt-5">
            <Row>
                <Col lg className="position-relative">
                    <h4 className="text-center">Mailing List</h4>
                    <Table className="shadow-sm mb-2 bg-body rounded text-secondary">
                        <thead className="bg-secondary small text-light">
                            <tr className="text-center">
                                <th>ID</th>
                                <th>EMAIL ADDRESS</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {lists
                                ?.slice(
                                    (currentPage - 1) * 10,
                                    currentPage * 10
                                )
                                .map((list) => (
                                    <ListRow list={list} key={list.email_id} />
                                ))}
                        </tbody>
                    </Table>
                    {isFetching && <IsFetchingModal />}
                    <Pagi
                        pages={pages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </Col>
                <Col lg className="d-flex flex-column justify-content-center">
                    {isSuccess ? (
                        <>
                            <SuccessDiv message="Email has been sent successfully" />
                            <Button
                                variant="outline-secondary"
                                href="/mailinglist"
                            >
                                Send another email
                            </Button>
                        </>
                    ) : (
                        <Form
                            ref={form}
                            onSubmit={() => {
                                isTester === "test"
                                    ? alert(
                                          "You are with a test account, only get requests allowed"
                                      )
                                    : handleSubmit(onSubmit);
                            }}
                            className="d-flex flex-column w-100 h-100"
                        >
                            <h4 className="text-center">Email</h4>
                            <FloatingLabel className="mb-3" label="Subject">
                                <Form.Control
                                    type="text"
                                    placeholder="Subject"
                                    {...register("subject", {
                                        required: true,
                                        maxLength: 50,
                                    })}
                                />
                                <span className="mt-1 text-danger">
                                    {errors.subject &&
                                        "subject can not be empty and max lenth is 50."}
                                </span>
                            </FloatingLabel>
                            <FloatingLabel
                                className="mb-3  flex-grow-1"
                                label="Message"
                                style={{ minHeight: "160px" }}
                            >
                                <Form.Control
                                    as="textarea"
                                    className="h-100"
                                    placeholder="Message"
                                    {...register("message", {
                                        required: true,
                                        maxLength: 1000,
                                    })}
                                />
                                <span className="mt-1 text-danger">
                                    {errors.name &&
                                        "message can not be empty and max lenth is 1000."}
                                </span>
                            </FloatingLabel>
                            <Form.Check
                                type="radio"
                                label="send to all email addresses in the list"
                                {...register("recipient", { required: true })}
                                value={allEmails
                                    ?.map(({ email }) => email)
                                    .join(",")}
                            />
                            <Form.Check
                                type="radio"
                                label="send to selected email addresses only"
                                {...register("recipient", { required: true })}
                                value={selectedEmails.join(",")}
                            />
                            <span className="mt-1 text-danger">
                                {errors.recipient && "Please choose recipient"}
                            </span>
                            <Button
                                variant="secondary"
                                type="submit"
                                className="my-3"
                            >
                                {isFetching ? (
                                    <FetchingSpinner />
                                ) : (
                                    <span>SEND</span>
                                )}
                            </Button>
                        </Form>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default MailingList;
