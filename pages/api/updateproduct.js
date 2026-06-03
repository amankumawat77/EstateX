// Next,js API route support: https://nextjs,org/docs/api-routes/introduction
import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"
import ReactDOMServer from "react-dom/server";
import NotFound from "../error";

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            await Product.findByIdAndUpdate(req.body.id,{
                title: req.body.title,
                slug: req.body.slug,
                desc: req.body.desc,
                img: req.body.img,
                price: req.body.price,
                availableQty: req.body.availableQty,
            })
            res.status(200).json({ succses: true, message: "Product updated successfully!" })
        } catch (error) {
            console.error("Error updating product:", error);
            res.status(500).json({ succses: false, error: "Internal Server Error", details: error.message })
        }
    }
    else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
export default connectDb(handler);