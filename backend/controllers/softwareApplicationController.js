import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { SoftwareApplication } from "../models/softwareApplicationSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewApplication = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(
            new ErrorHandler(
                "Software Application Icon/Image is Required!",
                400
            )
        );
    }
    const { image } = req.files;
    const { name } = req.body;

    if (!name) {
        return next(new ErrorHandler("Software's Name is Required!", 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        image.tempFilePath,
        { folder: "PORTFOLIO_SOFTWARE_APPLICATIONS" }
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Unknown Cloudinary error"
        );
    }

    const softwareApplication = await SoftwareApplication.create({
        name,
        image: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });
    res.status(200).json({
        success: true,
        message: "Timeline Added!",
        softwareApplication,
    });
});

export const deleteApplication = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const softwareApplication = await SoftwareApplication.findById(id);
    if (!softwareApplication) {
        return next(new ErrorHandler("Software Application not found!", 400));
    }
    await softwareApplication.deleteOne();
    res.status(200).json({
        success: true,
        message: "Application Deleted",
    });
});

export const getAllApplication = catchAsyncErrors(async (req, res, next) => {
    const softwareApplications = await SoftwareApplication.find();
    res.status(200).json({
        success: true,
        softwareApplications,
    });
});
