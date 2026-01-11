import { ModuleService } from "./module.service.js";

const createModule = async (req, res) => {
    try {
        const moduleData = req.body;
        const newModule = await ModuleService.createModule(moduleData);
        res.status(201).json({
            success: true,
            message: "Module created successfully",
            data: newModule,
        });
    } catch (error) {
        console.log(error)
        res.status(error.status || error.statusCode || 500).json({
            success: false,
            message: "Failed to create module",
            error: error
        });
    }
}

export const ModuleController = {
    createModule
}