import React, { useState, useEffect, useContext } from "react";

import Page from "../components/Page";
import Input from "../components/Input";
import NavMenu from "../components/NavMenu";
import Loader from "../components/Loader";
import CheckoutContext from "../contexts/Checkout";

import api from "../services/api";
import { getCheckoutItems, setCheckoutItems } from "../services/checkout";

import moment from "moment";
import { getCurrentUser } from "../services/auth";

const Books = (props) => {
    const checkoutItems = getCheckoutItems();
    const currentUser = getCurrentUser();

    const [selectedBook, setSelectedBook] = useState({});
    const [selectedBookIndex, setSelectedBookIndex] = useState(null);
    const [books, setBooks] = useState([]);
    const [rentedAt, setRentendAt] = useState("");
    const [expiratedAt, setExpiratedAt] = useState("");
    const [items, setItems] = useState(checkoutItems);

    const addCheckoutModal = $("#modal-add-checkout");

    useEffect(() => {
        async function loadingData() {
            const response = await api.get(
                `/book/available/${currentUser.uuid}`
            );
            setBooks(response.data);
        }

        loadingData();
    }, []);

    const handleRentClick = (index) => {
        setSelectedBookIndex(index);
        setSelectedBook(books[index]);
        addCheckoutModal.modal("show");
    };

    const addItem = (item) => {
        const newItems = { ...items, ...item };
        setItems(newItems);
        setCheckoutItems(newItems);

        delete books[selectedBookIndex];
        setBooks(books);

        setSelectedBookIndex(null);
        setRentendAt("");
        setExpiratedAt("");
        setSelectedBook({});
    };

    const handleCheckoutSubmit = (e) => {
        e.preventDefault();

        let newItem = {};
        newItem[selectedBook.uuid] = {
            book: selectedBook,
            rented_at: rentedAt,
            expirated_at: expiratedAt,
        };

        addItem(newItem);

        addCheckoutModal.modal("hide");
    };

    return (
        <CheckoutContext.Provider
            value={{
                items,
                addItem,
            }}
        >
            <Page title="Books" menu={<NavMenu />} hasLogout={true}>
                <Loader hide={books.length > 0} />

                <div id="modal-add-checkout" className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={handleCheckoutSubmit}>
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        Rent a Book - {selectedBook.title}
                                    </h5>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="name">
                                            Rental Date
                                        </label>
                                        <Input
                                            required
                                            autoFocus
                                            type="date"
                                            id="rented_at"
                                            name="rented_at"
                                            className="form-control"
                                            value={rentedAt}
                                            onChange={(e) => {
                                                const date = moment(
                                                    e.target.value
                                                );
                                                setRentendAt(e.target.value);
                                                setExpiratedAt(
                                                    date
                                                        .add(7, "days")
                                                        .format("YYYY-MM-DD")
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">
                                            Delivery Date
                                        </label>
                                        <Input
                                            disabled
                                            autoFocus
                                            type="text"
                                            id="rented_at"
                                            name="rented_at"
                                            className="form-control"
                                            value={
                                                expiratedAt
                                                    ? moment(
                                                          expiratedAt
                                                      ).format("DD/MM/YYYY")
                                                    : ""
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Add book to Cart
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
                                <th width="100" className="text-center">
                                    Copies
                                </th>
                                <th width="80"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book, index) => {
                                return (
                                    items[book.uuid] == null && (
                                        <tr key={`book-${book.uuid}`}>
                                            <td>{book.title}</td>
                                            <td className="text-center">
                                                {book.copies - book.users_count}
                                            </td>
                                            <td className="text-center">
                                                <button
                                                    onClick={() => {
                                                        handleRentClick(index);
                                                    }}
                                                    className="btn btn-sm btn-secondary"
                                                >
                                                    Rent
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </Page>
        </CheckoutContext.Provider>
    );
};

export default Books;
