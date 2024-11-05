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
const deleteGroup = async (req: Request) => {
    const id = req.params.id;
    const group = await Group.findById (id);
    if(!group){
        return "Group not found";
    }
    const checkAdmin = group.admin.toString() === req.user._id.toString();
    if(!checkAdmin){
        return "You are not allowed to delete this group";
    }
    const result = await Group.findByIdAndDelete(id);
    return result;
};
const getSingleGroup = async (req: Request) => {
    const id = req.params.id;
    const group = await Group.findById(id);
    return group;
};

export const groupService = {
    createGroup,
    getUserCreateGroup,
    discoverGroup,
    deleteGroup,
    getSingleGroup
}