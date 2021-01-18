import { useState, useEffect } from "react";
import moment from "moment";

import api from "../services/api";

import Loader from "../components/Loader";
import Page from "../components/Page";
import NavMenu from "../components/NavMenu";

import { getCurrentUser } from "../services/auth";

const BookUserHistory = (props) => {
    const [disabled, setDisabled] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [selectedBook, setSelectedBook] = useState({});
    const [selectedBookIndex, setSelectedBookIndex] = useState(null);
    const [books, setBooks] = useState([]);

    const currentUser = getCurrentUser();
    const modalDeliverBook = $("#modal-deliver-book");

    async function loadingData() {
        setBooks([]);
        const response = await api.get(`/user/my-books/${currentUser.uuid}`);
        setBooks(response.data);
        setLoaded(true);
    }

    useEffect(() => {
        loadingData();
    }, []);

    const handleDeliverClick = (index) => {
        setSelectedBookIndex(index);
        setSelectedBook(books[index]);

        modalDeliverBook.modal("show");
    };

    const handleDeliverSubmit = async (e) => {
        e.preventDefault();

        setDisabled(true);

        await api
            .put("/deliver", {
                user_uuid: currentUser.uuid,
                book_uuid: selectedBook.uuid,
            })
            .then(function (response) {
                loadingData();
                modalDeliverBook.modal("hide");
                setDisabled(false);
            });
    };

    return (
        <Page title="My Books" menu={<NavMenu />}>
            <Loader hide={books.length === 0 && loaded} />

            {books.length === 0 && loaded && (
                <h3 className="text-center">Empty</h3>
            )}

            <div
                id="modal-deliver-book"
                className="modal"
                data-keyboard="false"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleDeliverSubmit}>
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Delivery Confirmation
                                </h5>
                                <button
                                    disabled={disabled}
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h3 className="text-center">
                                    {`Are you sure you want give back the Book: ${selectedBook.title} now?`}
                                </h3>
                            </div>
                            <div className="modal-footer">
                                <button
                                    disabled={disabled}
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    disabled={disabled}
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Confirm Delivery
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {books.length > 0 && (
                <table className="table table-bordered mb-0">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Rental Date</th>
                            <th>Expiration Date</th>
                            <th className="text-center">Status</th>
                            <th width="120"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => {
                            return (
                                <tr key={`book-${book.uuid}`}>
                                    <td>{book.title}</td>
                                    <td className="text-center">
                                        {moment(book.pivot.rented_at).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </td>
                                    <td className="text-center">
                                        {moment(book.pivot.expirated_at).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </td>
                                    <td className="text-center">
                                        <span
                                            className={`badge badge-${
                                                book.pivot.status === "paid"
                                                    ? "success"
                                                    : "danger"
                                            }`}
                                        >
                                            {book.pivot.status}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        {book.pivot.status !== "paid" && (
                                            <button
                                                onClick={() => {
                                                    handleDeliverClick(index);
                                                }}
                                                className="btn btn-sm btn-secondary"
                                            >
                                                Deliver
                                            </button>
                                        )}

                                        {book.pivot.status === "paid" && (
                                            <small>
                                                {`Delivered in: ${moment(
                                                    book.pivot.deliverd_at
                                                ).format("DD/MM/YYYY")}`}
                                            </small>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </Page>
    );
};

export default BookUserHistory;
