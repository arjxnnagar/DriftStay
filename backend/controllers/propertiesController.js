import prisma from "../configs/prisma";

export const getProperties = ()=>{

    try{
        const prop = prisma.properties;



    }catch(err){
        console.error(err);
        res.status(500).json({message:"Cannot Fetch Properties"});
    }

}