function ErrorMessage(props) {
    let message = props.message;
    switch (message) {
        case 1000:
            message = "Username is required!";
            break;
        case 1001:
            message = "Password is required!";
            break;
        case 1002:
            message = "Password is weak!";
            break;
        case 1003:
            message = "Username already taken";
            break;
        case 1004:
            message = "Wrong username or password";
            break;
    }
    return (
        <span style={{color: "red"}}>
            {
                props.lineBreak ?
                    <div>
                        {message}
                    </div>
                    :
                    <span>
                                            {message}
                    </span>
            }
        </span>
    )
}

export default ErrorMessage;