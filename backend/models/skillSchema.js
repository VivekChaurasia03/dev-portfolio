import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title required!"],
    },
    proficiency: {
        type: String,
        required: [true, "Proficiency required!"],
    },
    image: {
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

export const Skill = mongoose.model("Skill", skillSchema);
