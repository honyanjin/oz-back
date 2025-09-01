// express 부트스트랩 파일
import express from "express";
import indexRouter from "./routes/index-router.js";
import productsRouter from "./routes/products-router.js";
import postRouter from './routes/post-router.js';

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use('/posts', postRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
