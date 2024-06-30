import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Project } from "../models/projectSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewProject = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Project Image is Required!", 400));
    }

    const { projectBanner } = req.files;
    const {
        title,
        description,
        gitRepoLink,
        projectLink,
        technologies,
        stack,
        deployed,
    } = req.body;

    const cloudinaryResponse = await cloudinary.uploader.upload(
        projectBanner.tempFilePath,
        { folder: "PORTFOLIO_PROJECT_BANNER" }
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Unknown Cloudinary error"
        );
    }

    const project = await Project.create({
        title,
        description,
        gitRepoLink,
        projectLink,
        technologies,
        stack,
        deployed,
        projectBanner: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });
    res.status(200).json({
        success: true,
        message: "Project Added!",
        project,
    });
});

export const deleteProject = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
        return next(new ErrorHandler("Project not found!", 400));
    }
    await project.deleteOne();
    res.status(200).json({
        success: true,
        message: "Project Deleted!",
    });
});

export const updateProject = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    let project = await Project.findById(id);

    if (!project) {
        return next(new ErrorHandler("Project not found!", 400));
    }

    const newProjectData = {
        title: req.body.title,
        description: req.body.description,
        gitRepoLink: req.body.gitRepoLink,
        projectLink: req.body.projectLink,
        technologies: req.body.technologies,
        stack: req.body.stack,
        deployed: req.body.deployed,
    };

    // Project banner updated
    if (req.files && req.files.projectBanner) {
        const { projectBanner } = req.files;
        const projectImageId = project.projectBanner.public_id;
        await cloudinary.uploader.destroy(projectImageId);
        const cloudinaryResponse = await cloudinary.uploader.upload(
            projectBanner.tempFilePath,
            { folder: "PORTFOLIO_PROJECT_BANNER" }
        );
        newProjectData.projectBanner = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        };
    }

    project = await Project.findByIdAndUpdate(id, newProjectData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        message: "Project updated!",
        newProjectData,
    });
});

export const getAllProject = catchAsyncErrors(async (req, res, next) => {
    const projects = await Project.find();
    res.status(200).json({
        success: true,
        projects,
    });
});

export const getProject = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
        return next(new ErrorHandler("Project not found!", 400));
    }
    res.status(200).json({
        success: true,
        project,
    });
});
