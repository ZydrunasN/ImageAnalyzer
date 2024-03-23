import {Alert, Snackbar} from "@mui/material";
import React, {useEffect, useState} from "react";

export  const CustomSnackbar = ({onClose,state, title}) => {
    const vertical = 'top';
    const horizontal = 'center';

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(state) setOpen(true);
        onClose()
    }, [state]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return(
        <div>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{vertical, horizontal}}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    {title}
                </Alert>
            </Snackbar>
    </div>)
}