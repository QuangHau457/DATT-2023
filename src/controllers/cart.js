import Cart from '../models/cart'
import User from "../models/user";
import Product from "../models/product";
import { schemaCart } from '../schemas/cart';


// Get All Cart
export const getCarts = async (req, res) => {
    try {
        const carts = await Cart.find({}).populate('products.productId');

        if (carts.length === 0) {
            return res.status(400).json({ message: "Không có giỏ hàng nào!" });
        }

        return res.json({
            message: "Lấy danh sách giỏ hàng thành công!",
            carts,
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Get One Cart
export const getOneCart = async (req, res) => {
    const { _id: userId } = req.user;

    try {
        // Tìm kiếm giỏ hàng của người dùng
        const cart = await Cart.findOne({ userId }).populate("products.productId").populate("userId");

        if (!cart) {
            return res.status(400).json({ message: "Không có giỏ hàng nào của người dùng!" });
        }

        return res.json({
            message: "Lấy giỏ hàng thành công!",
            cart,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controller để thêm sản phẩm vào giỏ hàng
export const addToCart = async (req, res) => {
    try {
        // const { error } = schemaCart.validate(req.body);
        // if (error) {
        //     return res.status(404).json({
        //         message: error.details[0].message,
        //     })
        // }
        const { _id: userId } = req.user;
        const {  productId, quantity } = req.body;

        // Kiểm tra xem giỏ hàng của người dùng đã tồn tại chưa
        let cart = await Cart.findOne({userId});

        if (!cart) {
            // Nếu giỏ hàng chưa tồn tại, tạo một giỏ hàng mới
            cart = new Cart({
                userId,
                products: [{ productId, quantity }],
            });
        } else {
            // Nếu giỏ hàng đã tồn tại, thêm sản phẩm vào mảng các sản phẩm
            const productIndex = cart.products.findIndex(
                (product) => product.productId === productId
            );

            if (productIndex !== -1) {
                // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng và giá của sản phẩm
                cart.products[productIndex].quantity += quantity;
                // cart.products[productIndex].price = price;
            } else {
                // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm vào mảng các sản phẩm
                cart.products.push({ productId, quantity });
            }
        }

        // Lưu giỏ hàng
        await cart.save();
       

        res.status(200).json({ success: true, message: "Sản phẩm đã được thêm vào giỏ hàng", cart });
    } catch (error) {
        res.status(500).json({ success: false, message: "Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng" });
    }
};

// XÓA CART
export const deleteProductCart = async (req, res) => {
    const { _id: userId } = req.user;
    const  {products}  = req.params.id;
    try {
        // Tìm kiếm giỏ hàng của người dùng
        let cart = await Cart.findOne({ userId })
            .populate("products.productId")
            .populate("userId");

        // Nếu không tìm thấy giỏ hàng, trả về lỗi
        if (!cart) {
            return res.status(400).json({ message: "Giỏ hàng không tồn tại!" });
        }

        // Xóa sản phẩm khỏi giỏ hàng
        cart.products = cart.products.filter((product) => product._id.toString() !== products);
        console.log(cart.products.quantity)
        await cart.save();
        return res.status(200).json({ message: "Xóa sản phẩm thành công!", cart });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// LẤY DỮ LIỆU CỦA 1 PHẦN TỬ TRONG CART
export const get = async (req, res) => {
    const { _id: userId } = req.user;
    try {
        const cart = await Cart.findOne({ userId }).Cart.products.findById(req.params.id).populate("productId");
        console.log("origin", cart);
        if (!cart) {
            return res.json({
                message: "Không tìm thấy danh mục",
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};