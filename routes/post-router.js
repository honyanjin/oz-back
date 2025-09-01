import express from "express";

const router = express.Router();

// 임시 데이터베이스
let posts = [
    {
        id: 1,
        title: "첫 번째 게시글",
        content: "안녕하세요! 첫 번째 게시글입니다.",
        author: "작성자1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 2,
        title: "두 번째 게시글",
        content: "두 번째 게시글의 내용입니다.",
        author: "작성자2",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

// GET /posts - 모든 게시글 조회
router.get("/", (req, res) => {
    console.log("모든 게시글 조회");
    res.json(posts);
});

// GET /posts/:id - 특정 게시글 조회
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    
    if (!post) {
        return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }
    
    console.log(`게시글 ${id} 조회`);
    res.json(post);
});

// POST /posts - 새 게시글 생성
router.post("/", (req, res) => {
    const { title, content, author } = req.body;
    
    if (!title || !content || !author) {
        return res.status(400).json({ 
            message: "제목, 내용, 작성자는 필수 입력 항목입니다." 
        });
    }
    
    const newPost = {
        id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
        title,
        content,
        author,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    posts.push(newPost);
    console.log("새 게시글 생성:", newPost.title);
    res.status(201).json(newPost);
});

// PUT /posts/:id - 게시글 전체 수정
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { title, content, author } = req.body;
    
    const postIndex = posts.findIndex(p => p.id === id);
    
    if (postIndex === -1) {
        return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }
    
    if (!title || !content || !author) {
        return res.status(400).json({ 
            message: "제목, 내용, 작성자는 필수 입력 항목입니다." 
        });
    }
    
    posts[postIndex] = {
        ...posts[postIndex],
        title,
        content,
        author,
        updatedAt: new Date().toISOString()
    };
    
    console.log(`게시글 ${id} 수정`);
    res.json(posts[postIndex]);
});

// PATCH /posts/:id - 게시글 부분 수정
router.patch("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { title, content, author } = req.body;
    
    const postIndex = posts.findIndex(p => p.id === id);
    
    if (postIndex === -1) {
        return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }
    
    // 부분 수정: 제공된 필드만 업데이트
    if (title) posts[postIndex].title = title;
    if (content) posts[postIndex].content = content;
    if (author) posts[postIndex].author = author;
    
    posts[postIndex].updatedAt = new Date().toISOString();
    
    console.log(`게시글 ${id} 부분 수정`);
    res.json(posts[postIndex]);
});

// DELETE /posts/:id - 게시글 삭제
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === id);
    
    if (postIndex === -1) {
        return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }
    
    const deletedPost = posts.splice(postIndex, 1)[0];
    console.log(`게시글 ${id} 삭제`);
    res.json({ message: "게시글이 성공적으로 삭제되었습니다.", deletedPost });
});

export default router;
