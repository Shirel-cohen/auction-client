import {Alert, Button, Collapse, IconButton} from "@mui/material";
import {useState} from "react";

function ErrorMessage(props) {
    let message = props.message;
    let isClickable=props.isClickable;
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
        case 1014:
            message = "Invalid Credit";
            break;

    }
    return (
        <span style={{color: "red"}}>
            {
                props.lineBreak ?
                    <div>
                            <Alert severity="error"  variant="outlined"
                                   >
                                {message}
                            </Alert>
                </div>  :
                    <span>
                        <Alert  variant="outlined" severity="error">
                            {message}
                            </Alert>
                    </span>
            }
        </span>
    );
}

export default ErrorMessage;