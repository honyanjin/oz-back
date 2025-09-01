import express from "express";

const router = express.Router();

const products = [
    {
    id: 1,
    name: "Product 1",
    price: 100
    },
    {
        id: 2,
        name: "Product 2",
        price: 200
    }
]

router.get("/", (req, res) => {
    console.log("Projucts");
    res.json(products);
});

export default router;