import jwt from 'jsonwebtoken';



const adminAuth = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Admin Access Only"
            })
        }

        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: "Invalid Token" });
    }
    
}


export default adminAuth;