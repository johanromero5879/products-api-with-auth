import jwt from "jsonwebtoken"

import User from "../models/User"
import Role from "../models/Role"

const getUserToken = (id) => 
    jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 86400 // 24 horas
    })


export const signup = async (req, res) => {
    const { username, email, password, roles } = req.body
    
    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })

    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } })
        newUser.roles = foundRoles.map(role => role._id)
    } else{
        const role = await Role.findOne({ name: "user" })
        newUser.roles = [ role._id ]
    }

    
    try{
        const savedUser = await newUser.save()
        const token = getUserToken(savedUser._id)
        
        res.json({ token })
    }catch(ex){
        console.log(ex)
        res.status(400).json("Error on signup")
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body

    const userFound = await User.findOne({ email })
                                .populate("roles")
    
    if(!userFound) 
        return res.status(400).json({ message: "User not found" })
    
    const matchPassword = await User.comparePassword(password, userFound.password)

    if(!matchPassword)
        return res.status(401).json({ message: "Invalid password" })
    
    const token = getUserToken(userFound._id)

    res.json({ token })
}