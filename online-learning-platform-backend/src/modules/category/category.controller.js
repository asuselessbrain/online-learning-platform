import { categoryService } from "./category.service.js";

const createCategory = async (req, res) => {
    const categoryData = req.body;

    try {
        const result = await categoryService.createCategory(categoryData);
        res.status(201).json({
            message: "Category created successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create category",
            error: error,
        });
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories(req.query);
        res.status(200).json({
            message: "Categories fetched successfully",
            data: categories,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch categories",
            error: error.message,
        });
    }
}

const getSingleCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await categoryService.getSingleCategoryById(id);
        if (!category) {
            return res.status(404).json({
                message: "Category not found",
            });
        }
        res.status(200).json({
            message: "Category fetched successfully",
            data: category,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch category",
            error: error.message,
        });
    }
}

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const categoryData = req.body;
    try {
        const updatedCategory = await categoryService.updateCategory(id, categoryData);
        if (!updatedCategory) {
            return res.status(404).json({
                message: "Category not found",
            });
        }
        res.status(200).json({
            message: "Category updated successfully",
            data: updatedCategory,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update category",
            error: error,
        });
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategory = await categoryService.deleteCategory(id);
        if (!deletedCategory) {
            return res.status(404).json({
                message: "Category not found",
            });
        }
        res.status(200).json({
            message: "Category deleted successfully",
            data: deletedCategory,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to delete category",
            error: error.message,
        });
    }
}

const getActiveCategories = async (req, res) => {
    try {
        const categories = await categoryService.getActiveCategories();
        res.status(200).json({
            message: "Active categories fetched successfully",
            data: categories,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch active categories",
            error: error.message,
        });
    }
}

export const categoryController = {
    createCategory,
    getAllCategories,
    getSingleCategoryById,
    updateCategory,
    deleteCategory,
    getActiveCategories,
};