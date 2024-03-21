import HTTP from "../config/api/axiosConfig";

export const UploadFilesService = {
    upload(file) {
        let formData = new FormData();

        formData.append("file", file);

        HTTP.post("/upload-image", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then();
    }
}