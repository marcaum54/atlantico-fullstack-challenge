const Input = (props) => {
    const { name, errors, className } = props;

    let attrs = { ...props };

    if (errors) {
        delete attrs.errors;
        if ("errors" in errors) {
            attrs.className =
                name in errors.errors ? `${className} is-invalid` : className;
        }
    }

    return (
        <>
            <input {...attrs} />

            {errors && "errors" in errors && name in errors.errors && (
                <div className="invalid-feedback">
                    {errors.errors[name].map((message, index) => {
                        return (
                            <div key={`${message}-${index}`}>
                                &bull; {message}
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default Input;
