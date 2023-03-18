import {Alert, Button, Collapse, IconButton} from "@mui/material";
import {useState} from "react";

function ErrorMessage(props) {
    let message = props.message;
    let isClickable=props.isClickable;
    const [open, setOpen] = useState(true);
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
                        <Collapse in={!isClickable}>
                            <Alert severity="error"
                                   action={
                                       <IconButton variant="contained" aria-label="close" color="inherit" size="small"
                                                   onClick={() => {
                                               isClickable=!isClickable;}}>
                                            </IconButton>}>
                                {message}
                            </Alert>
                        </Collapse>
                    </div>
                    :
                    <span>
                        {message}
                        <Alert severity="error">
                            {message}
                            </Alert>
                    </span>
            }
        </span>
    )
}

export default ErrorMessage;