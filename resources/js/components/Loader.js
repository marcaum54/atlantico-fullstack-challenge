const Loader = (props) => {
    const { hide } = props;
    return (
        <div className={`text-center ${hide ? "d-none" : ""}`}>
            <div className="spinner-border text-primary">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Loader;
