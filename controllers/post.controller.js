import Post from "../models/Post.js";

export const create = async (req, res) => {
  try {
    const { userEmail, content } = req.body;
    if (!userEmail || !content) {
      return res
        .status(400)
        .json({ message: "Please Provide  userEmail and Content " });
    }
    const newPost = new Post({
      userEmail,
      content,
    });
    await newPost.save();
    return res.status(201).json({
      message: "Post Created Successfully",
      data: newPost,
    });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

export const deletePost = async (req, res) => {
  const id = req.query.id;
  console.log("this is from delete post ", id);
  if (!id) {
    return res
      .status(400)
      .json({ message: "Please provide both email and id." });
  }
  try {
    const post = await Post.findOneAndDelete({ _id: id });
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }
    return res
      .status(200)
      .json({ message: "Post deleted successfully.", post });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

export const getPosts = async (req, res) => {
  try {
    const limit = req.query.limit ||  20  ; 
    const posts  = await Post.aggregate([
      {
        $lookup: {
          from: "images",
          localField: "_id",
          foreignField: "id",
          as: "images",
        },
      },
      { $limit: limit },
    ]);
    return res.status(200).json({
      message: "Posts retrieved successfully.",
      data: posts,
    });
  } catch (error) {
    return res
      .status(500)
      .json(error.message);
  }
};
