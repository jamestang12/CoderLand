import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getPost } from "../../action/post";
import PostItem from "../posts/PostItem";
import CommentForm from "../post/CommentForm";
import CommentItem from "../post/CommentItem";

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back to posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      {post.comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} postId={post._id} />
      ))}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
