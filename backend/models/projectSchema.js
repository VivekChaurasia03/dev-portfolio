import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required!"],
    },
    description: {
        type: String,
        required: [true, "Description is required!"],
    },
    gitRepoLink: {
        type: String,
        required: [true, "Github Repository Link is required!"],
    },
    projectLink: String,
    technologies: {
        type: String,
        required: [true, "Proficiency required!"],
    },
    stack: String,
    deployed: String,
    projectBanner: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
});

export const Project = mongoose.model("Project", projectSchema);
