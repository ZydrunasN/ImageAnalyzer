import React, {useEffect, useState} from 'react';
import {Box, styled} from "@mui/material";
import {UploadFilesService} from "../services/UploadFileService";
import Button from "@mui/material/Button";
import {CustomSnackbar} from "./CustomSnackBar";


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const ImageUploader = ({onImageUpload}) => {
    const initialResponse = {
        imageURL: null,
        approved: false,
        category: null
    };

    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [response, setResponse] = useState(initialResponse);

    const handleFileInput = (e) => {
        if(e.target.files[0] !== undefined) {
            const reader = new FileReader();
            let imageURL;

            reader.onload = () => {
                imageURL = reader.result;
                setImage(reader.result)
            }
            reader.readAsDataURL(e.target.files[0])

            setOpen(true);
            const formData = new FormData();
            formData.append("file",e.target.files[0]);
            setImage(URL.createObjectURL(e.target.files[0]));
            UploadFilesService.upload(e.target.files[0]).then(value => {
                setResponse({
                    imageURL: imageURL,
                    approved: value.approved,
                    category: value.category
                })
            }).catch(error => console.error(error));
        }
    }

    function handleClose() {
        setOpen(false);
    }

    useEffect(() => {
        onImageUpload(response);
    }, [response]);

    return (
        <div>
            <CustomSnackbar onClose={handleClose} state={open} title={"Image uploaded successfully!"}/>

            <div>{image && <img src={image} alt="image" width={300}/>}</div>
            <Box sx={{pb:5}}></Box>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
            >
                Upload Image
                <VisuallyHiddenInput type="file" accept={"image/png,image/jpeg"} onChange={handleFileInput}/>
            </Button>
            <Box sx={{pb:5}}></Box>
        </div>
    );
}