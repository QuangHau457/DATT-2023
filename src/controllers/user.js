import dotenv from "dotenv";
import User from "../models/user";

dotenv.config();

export const getAll = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length===0) {
            return res.json({
                message: "Không tìm thấy tài khoản",
            });
        }
        return res.json({
            message: "Lấy tài khoản thành công",
            users,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const remove = async (req, res) => {
    try {
        const users = await User.findByIdAndDelete(req.params.id);
        if (!users) {
            return res.status(404).json({
                message: "Xoa Khong Thanh Cong"
            })
        }
        return res.status(200).json({
            message: "xoá thanh cong",
            users,
        })

    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}


//update
export const update = async(req,res)=>{
    try {
        const users = await users.findByIdAndUpdate(req.params.id,req.body)
        if(!users){
            return res.status(400).json({
                message:"Update không thành công"
            })
        }
        return res.status(200).json({
            message:"Update thành công",
            data: users
        })
    } catch (error) {
        return res.status(400).json({
            message:"Lỗi server"
        })
    }
}