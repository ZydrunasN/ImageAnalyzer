import React, {useState} from 'react';
import {Box, Input} from "@mui/material";
import {UploadFilesService} from "../services/UploadFileService";

export const ImageUploader = () => {
    const [image, setImage] = useState(null);

    const handleFileInput = (e) => {
        if(e.target.files[0] !== undefined) {
            const formData = new FormData();
            formData.append("file",e.target.files[0]);
            setImage(URL.createObjectURL(e.target.files[0]));
            UploadFilesService.upload(e.target.files[0]);
        }
    }

    return (
        <div>
            <div>{image && <img src={image} alt="image" width={300}/>}</div>
            <Box sx={{pb:5}}></Box>
            <Input type="file" accept={"image/png"} onChange={handleFileInput}/>
            <Box sx={{pb:5}}></Box>
        </div>
    );
}