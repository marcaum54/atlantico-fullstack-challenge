import { useState } from "react";

import moment from "moment";

import Page from "../components/Page";
import NavMenu from "../components/NavMenu";

import api from "../services/api";
import { getCurrentUser } from "../services/auth";
import { getCheckoutItems, setCheckoutItems } from "../services/checkout";

const Checkout = (props) => {
    const currentUser = getCurrentUser();
    const checkoutItems = getCheckoutItems();

    const [disabled, setDisabled] = useState(false);
    const [items, setItems] = useState(checkoutItems);
    const [errors, setErrors] = useState([]);

    const addError = (item) => {
        setErrors((errors) => [
            ...errors,
            `Unfortunately, an unexpected error occurred in the book: ${item.book.title} cannot be rented.`,
        ]);
    };

    const handleRemoveClick = (uuid) => {
        setDisabled(true);
        delete items[uuid];
        const newItems = items;

        setItems({ ...newItems });
        setCheckoutItems(newItems);

        setDisabled(false);
    };

    const handleCheckoutClick = () => {
        setDisabled(true);

        setErrors([]);

        Object.keys(items).forEach(async (key) => {
            const item = items[key];

            await api
                .post("/rent", {
                    user_uuid: currentUser.uuid,
                    book_uuid: item.book.uuid,
                    rented_at: item.rented_at,
                    expirated_at: item.expirated_at,
                })
                .then(function (response) {
                    handleRemoveClick(item.book.uuid);
                    if (Object.keys(items).length === 0) {
                        props.history.push("/my-books");
                    }
                })
                .catch(function (error) {
                    setDisabled(false);
                    addError(item);
                });
        });
    };

    return (
        <Page title="Checkout" menu={<NavMenu />}>
            {errors.map((error, i) => {
                return (
                    <div
                        key={`${i}-errors`}
                        className="alert alert-danger"
                        role="alert"
                    >
                        {error}
                    </div>
                );
            })}

            {Object.keys(items).length === 0 && (
                <h3 className="text-center">-- Empty --</h3>
            )}

            {Object.keys(items).length > 0 && (
                <>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Rental Date</th>
                                <th>Delivery Data</th>
                                <th width="80"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(items).map((key) => {
                                const item = checkoutItems[key];
                                return (
                                    <tr key={`book-${item.book.uuid}`}>
                                        <td>{item.book.title}</td>
                                        <td>
                                            {moment(item.rented_at).format(
                                                "DD/MM/YYYY"
                                            )}
                                        </td>
                                        <td>
                                            {moment(item.expirated_at).format(
                                                "DD/MM/YYYY"
                                            )}
                                        </td>
                                        <td className="text-center">
                                            <button
                                                disabled={disabled}
                                                type="button"
                                                className="btn btn-sm btn-danger"
                                                onClick={() => {
                                                    handleRemoveClick(
                                                        item.book.uuid
                                                    );
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <button
                        disabled={disabled}
                        onClick={handleCheckoutClick}
                        type="button"
                        className="btn btn-primary"
                    >
                        Checkout
                    </button>
                </>
            )}
        </Page>
    );
};

export default Checkout;
