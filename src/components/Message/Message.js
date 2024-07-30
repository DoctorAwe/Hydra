import {Snackbar} from "@mui/material";
import * as React from "react"
import Alert from "@mui/material/Alert";

function Message(props) {
    const { content, duration, type } = {...props};
    const [open, setOpen] = React.useState(true);
    const handleClose = (event, reason) => {
        setOpen(false);
    };
    return <Snackbar
        open={open}
        autoHideDuration={duration}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}>
        <Alert severity={type}>{content}</Alert>
    </Snackbar>
}

export default Message