import prisma from "../configs/prisma.js";
import cloudinary from "../configs/cloudinary.js";

export const getAllProperties = async (req,res)=>{

    try{
        const prop = await prisma.property.findMany();
        res.status(200).json(prop);
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Cannot Fetch Properties"});
    }

}
export const getMyProperties = async (req, res) => {
    const {id} = req.params;
  try {
    const prop =await prisma.property.findMany({
      where: {
        ownerId:id
      },
    });
    res.status(200).json({prop});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cannot Fetch Properties" });
  }
};


export const addProperty = async (req,res) =>{

    const { title, description ,location,pricePerNight,bedrooms,guests} = req.body;
    const photos = req.files;

    try {

        const uploadedImages = await Promise.all(
            req.files.map(
                (file) =>
                new Promise((resolve, reject) => {
                    cloudinary.uploader
                    .upload_stream((error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    })
                    .end(file.buffer);
                }),
            ),
        );

        const urlArr = []
        for(const image of uploadedImages){
            urlArr.push(image.secure_url)
        }
        
        const property = await prisma.property.create({
          data: {
            ownerId: req.user.id,
            title,
            description,
            pricePerNight:parseFloat(pricePerNight),
            location,
            bedrooms:parseInt(bedrooms),
            guests:parseInt(bedrooms),
            photos:urlArr
          },
        });

        return res.status(201).json({message:"Property added."})
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Cannot Add Property" });
    }
}