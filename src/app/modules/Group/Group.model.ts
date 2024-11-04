import mongoose from "mongoose";
import { Tgroup } from "./Group.interface";

const GroupSchema = new mongoose.Schema<Tgroup>({
    name: String,
    description: String,
    privacy: String,
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export const Group = mongoose.model("Group", GroupSchema);