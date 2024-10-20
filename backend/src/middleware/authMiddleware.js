import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req , res) =>{

    try {
        // check if user is logged in
        const token = req.cookies.token;

        if(!token){
            // 401 Unauthorized
            res.status(401).json({message:"Not authorized , please login!"});
        }
        // verify the token
        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        //get user details from the token ----> exlude password
        const user = await User.findOne(decoded.id).select("-password");

        //check if user exists
        if(!user){
            res.status(401).json({message:"User not found!"});
        }
    } catch (error) {
        
    }
})