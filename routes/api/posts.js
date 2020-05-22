const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

//@route    POST api/posts
//@desc     Create a post
//@access   Private
router.post(
  "/",
  [auth, check("text", "Text is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req, res);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    try {
      const user = await (await User.findById(req.user.id)).isSelected(
        "-password"
      );

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      const post = await newPost.save();

      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route    GET api/posts
//@desc     Get all post
//@access   Private
router.get("/", auth, async (req, res) => {
  try {
    const post = await Post.find().sort({ date: -1 });
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route    GET api/posts/:id
//@desc     Get post by ID
//@access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route    DELETE api/posts/:id
//@desc     Delete a post
//@access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    //Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();
    res.json({ msg: "Post removed" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
