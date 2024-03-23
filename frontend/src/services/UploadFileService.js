import HTTP from "../config/api/axiosConfig";

export const UploadFilesService = {
    upload(file) {
        let formData = new FormData();
        formData.append("file", file);

        return HTTP.post("/upload-image", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(response => {
            return {
                approved: response.data.approved,
                category: response.data.category
            };
        }).catch(error => console.error("Error uploading file: ",error));
    }
}