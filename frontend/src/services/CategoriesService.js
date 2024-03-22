import HTTP from "../config/api/axiosConfig";

export const CategoriesService = {

    getCategories() {
        return HTTP.get("/categories").then(response => {
            return response.data.map(category => ({
                id: category.id,
                name: category.name,
                prohibited: category.prohibited
            }));
        });
    },

    updateCategories(categories) {
        HTTP.put("/update-categories",categories).catch(error => console.log(error));
    }
}