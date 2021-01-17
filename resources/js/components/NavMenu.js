import { Link } from "react-router-dom";

const NavMenu = (props) => {
    const checkoutItemsIndex = "checkoutItems";
    const checkoutItems = localStorage.getItem(checkoutItemsIndex)
        ? JSON.parse(localStorage.getItem(checkoutItemsIndex))
        : {};

    const routes = [
        {
            label: "Librarys",
            to: "/books",
        },
        {
            label: "My Books",
            to: "/my-books",
        },
        {
            label: "Checkout",
            to: "/checkout",
        },
    ];

    return (
        <ul className="nav nav-pills  nav-fill">
            {routes.map((route) => {
                return (
                    <Link
                        key={route.to}
                        to={route.to}
                        style={{ padding: "0.25rem 0.5rem" }}
                        className={`nav-link ${
                            window.location.pathname === route.to
                                ? "active"
                                : ""
                        }`}
                    >
                        {route.label}

                        {route.to === "/checkout" && (
                            <span className="badge badge-danger ml-2">
                                {Object.keys(checkoutItems).length}
                            </span>
                        )}
                    </Link>
                );
            })}
        </ul>
    );
};

export default NavMenu;
