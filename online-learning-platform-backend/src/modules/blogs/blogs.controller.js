import { blogService } from "./blogs.service.js";

const createBlogs = async (req, res) => {
    const blogData = req.body;

    try {
        const result = await blogService.createBlogs(blogData);
        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create Blog",
            error: error
        });
    }
}

const getAllBlogsForAdmin = async (req, res) => {
    const options = req.query;
    try {
        const result = await blogService.getAllBlogsForAdmin(options);
        res.status(200).json({
            success: true,
            message: "Blogs retrieved successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve Blogs",
            error: error
        });
    }
}


const getSingleBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await blogService.getSingleBlog(id);
        res.status(200).json({
            success: true,
            message: "Blog retrieved successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve Blog",
            error: error
        });
    }
}


export const blogController = {
    createBlogs,
    getAllBlogsForAdmin,
    getSingleBlog,  
}