import mongoose from "mongoose";

const LinkDataSchema = new mongoose.Schema({
    redirectUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    clicks: { type: Number, default: 0 },
    createdBy: { type: mongoose.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export const LinkDataUserPresent = mongoose.model('LinkData_User', LinkDataSchema);