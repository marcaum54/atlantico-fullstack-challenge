const Form = (props) => {
    const { api, method, route, formData } = props;

    const handleSubmit = (e) => {
        e.preventDefault();

        setDisabled(true);

        api[method](route, formData)
            .then(function (response) {})
            .catch(function (error) {
                setDisabled(false);
                if (error.response.status === 422) {
                    setErrors(error.response.data);
                }
            });
    };

    return <form onSubmit={handleSubmit}>{props.child}</form>;
};

export default Form;
