import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../api";

const Comment = ({ data, onDelete }) => {
  const [user, setUser] = useState(null);
  const formatDate = () => {
    const currentDate = new Date();
    const date = new Date(Number(data.created_at));
    const timeDiff = Math.abs(currentDate.getTime() - date.getTime());
    const diffInMinutes = Math.round(timeDiff / (1000 * 60));
    const diffInDays = Math.round(timeDiff / (1000 * 60 * 60 * 24));
    const diffInYear = Math.round(timeDiff / (1000 * 60 * 60 * 24 * 365.25));

    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDay().toString().padStart(2, "0");
    const month = date.getMonth().toString().padStart(2, "0");
    const year = date.getFullYear().toString().padStart(2, "0");

    if (diffInMinutes <= 1) return "1 минуту назад";
    if (diffInMinutes <= 5) return "5 минут назад";
    if (diffInMinutes <= 10) return "10 минут назад";
    if (diffInMinutes <= 30) return "30 минут назад";
    if (diffInDays <= 1) return `${hour}:${minute}`;
    if (diffInYear <= 1) return `${day}.${month}`;
    return `${day}.${month}.${year}`;
  };
  useEffect(() => {
    api.users.getById(data.userId).then(response => setUser(response));
  }, []);
  if (!user) return <div className="bg-light card-body mb-3">Loading...</div>;
  return (
    <div className="bg-light card-body mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start">
            <img
              src={`https://avatars.dicebear.com/api/avataaars/${(
                Math.random() + 1
              )
                .toString(36)
                .substring(7)}.svg`}
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1 ">
                    {user.name + " - "}
                    <span className="small">
                      {formatDate()}
                    </span>
                  </p>
                  <button
                    onClick={() => onDelete(data._id)}
                    className="btn btn-sm text-primary d-flex align-items-center">
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
                <p className="small mb-0">{data.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  data: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default React.memo(Comment);
