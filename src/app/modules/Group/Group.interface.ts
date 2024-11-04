import mongoose from "mongoose";

export type Tgroup = {
    name: string;
    description: string;
    privacy: string;
    members: mongoose.Types.ObjectId[]; 
   admin: mongoose.Types.ObjectId; 
};
