import Role from "../models/Role"
import User from "../models/User"

export const checkExistedRoles = async (req, res, next) =>{
    
    const {roles} = req.body 
    
    if (roles) {
        for (let i = 0; i < roles.length; i++){
            const roleFound = await Role.findOne({ name: roles[i] })
            if(!roleFound){
                return res.status(400).json({
                    message: `Role ${roles[i]} does not exist`
                })
            }
        }
    }

    next()
}

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const { username, email } = req.body
    
    let user = await User.findOne({ username })

    if(user)
        return res.status(400).json({ message: "User already exists" })
    
    user = await User.findOne({ email })

    if(user)
        return res.status(400).json({ message: "Email already exists" })

    next()
}