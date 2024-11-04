import { Request } from "express";
import { Group } from "./Group.model";



const createGroup = async (req:Request) => {

    const admin = req.user._id;
    const data = req.body;
    const group = new Group({
        ...data,
        admin
    })
   const result =  await group.save();

    return result;
    
  
};

const getUserCreateGroup = async (req: Request) => {
    const admin = req.user._id;
    const group = await Group.find({admin});

    return group;
};

const discoverGroup = async () => {
   
    const groups = await Group.find({});
    return groups;
};


export const groupService = {
    createGroup,
    getUserCreateGroup,
    discoverGroup
}