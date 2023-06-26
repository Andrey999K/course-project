import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import PropTypes from "prop-types";
import api from "../../api";

const CommentsList = ({ data, onDelete, onSubmit, userId }) => {
  const [users, setUsers] = useState([]);
  const [newComment, setNewComment] = useState({ pageId: userId, userId: "", content: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newComment);
    setNewComment({ pageId: userId, userId: "", content: "" });
  };
  useEffect(() => {
    api.users.fetchAll().then(data => setUsers(data));
  }, []);
  return (
    <>
      <div className="card mb-2">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <h2>New comment</h2>
            <div className="mb-4">
              <select
                className="form-select"
                name="userId"
                value={newComment.userId}
                onChange={e => setNewComment(prevState => ({ ...prevState, userId: e.target.value }))}
              >
                <option disabled value="">
                  Выберите пользователя
                </option>
                {users.map(user =>
                  <option key={user._id} value={user._id}>{user.name}</option>
                )}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >Сообщение</label
              >
              <textarea
                value={newComment.content}
                onChange={e => setNewComment(prevState => ({ ...prevState, content: e.target.value }))}
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
            <div className="float-end">
              <button className="btn btn-primary" disabled={newComment.content === "" || newComment.userId === ""}>Опубликовать</button>
            </div>
          </form>
        </div>
      </div>
      {!!data.length && (
        <div className="card mb-3">
          <div className="card-body">
            <h2>Comments</h2>
            <hr/>
            {data.sort((a, b) => a.created_at - b.created_at).map(comment => (
              <Comment
                key={comment._id}
                data={comment}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

CommentsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
  onSubmit: PropTypes.func,
  userId: PropTypes.string.isRequired
};

export default CommentsList;
