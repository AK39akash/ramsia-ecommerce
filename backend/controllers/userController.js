import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";


// CREATE TOKEN
const createToken = (id, role = "user") => {
    return jwt.sign(
        { id, role }, 
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
}


// Route for user login
const loginUser = async (req, res) => {

    try {

        const {email, password} = req.body;

        const user = await userModel
            .findOne({ email })
            .select("+password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exist"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const token = createToken(user._id, user.role);

        return res.status(200).json({
            success: true,
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });

        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message})
        
    }
    
}


// Route for user register
const registerUser = async (req, res) => {

    try {

        const {name, email, password, phone} = req.body;

        // checking user already exists or not
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(409).json({ success:false, message: 'User already exists' })
        }

        // validating email format & strong password
        if (!name || name.length < 3) {
            return res.status(400).json({ success:false, message: 'Name must be at least 3 characters long' })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success:false, message: 'Invalid email' })
        }

        if (phone && !/^[0-9]{10}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Phone must be 10 digits"
            });
        }

        if (!password || password.length < 8) {
            return res.status(400).json({ success:false, message: 'Password must be at least 8 characters' });
        }


        // hashing user password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
            phone: phone || ""
        })

        const token = createToken(user._id, user.role);

        return res.status(201).json({success: true, token});

        
    } catch (error) {

        return res.status(500).json({ success: false, message: error.message });
        
    }
    
}



// Route for admin login
const adminLogin = async (req, res) => {

    try {

        const {email, password} = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = createToken("adminId", "admin");

            return res.status(200).json({ success: true, token })
        } else {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
    
}



// Get user profile
const getProfile = async (req, res) => {
    try {

        const userId = req.userId;

        const user = await userModel
            .findById(userId)
            .select('-password -resetPasswordToken -resetPasswordExpire');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, user });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}


// Update user profile
const updateProfile = async (req, res) => {
    try {

        const userId = req.userId;
        const { name, email, phone } = req.body;

        // Validate name
        if (name && name.length < 3) {
            return res.status(400).json({ success: false, message: 'Name must be at least 3 characters long' });
        }

        // Validate email
        if (email && !validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email' });
        }

        if (phone && !/^[0-9]{10}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Phone must be 10 digits"
            })
        }

        // Check if email is already taken by another user
        if (email) {
            const existingUser = await userModel.findOne({ email, _id: { $ne: userId } });

            if (existingUser) {
                return res.status(409).json({ success: false, message: 'Email already in use' });
            }
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { 
                ...(name && { name }), 
                ...(email && { email }),
                ...(phone !== undefined && { phone }) 
            },
            { new: true }
        ).select('-password');

        return res.status(200).json({ success: true, message: 'Profile updated successfully', user: updatedUser });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}



// GET ALL USERS (ADMIN)
const getAllUsers = async (req, res) => {

    try {

        const users = await userModel
            .find({})
            .select("-password")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            users
        });
        
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
    
}


const getUserDetails = async (req, res) => {

    try {

        const { id } = req.params;

        const user = await userModel
            .findById(id)
            .select("-password");

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const orders = await orderModel
            .find({ userId: id })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            user,
            orders
        });
        
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
    
};


export { loginUser, registerUser, adminLogin, getProfile, updateProfile, getAllUsers, getUserDetails } 