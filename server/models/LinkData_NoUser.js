import mongoose from "mongoose";

const LinkDataSchema = new mongoose.Schema({
    redirectUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
}, { timestamps: true });

export const LinkDataUserNotPresent = mongoose.model('LinkData_NoUser', LinkDataSchema);