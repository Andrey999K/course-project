import React from "react";
import Quality from "./quality";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  onDelete,
  bookmark,
  onToggleBookMark,
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((qualitie) => (
          <Quality key={qualitie._id} {...qualitie} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} / 5</td>
      <td>
        <Bookmark status={bookmark} onClick={() => onToggleBookMark(_id)} />
      </td>
      <td>
        <button
          onClick={() => onDelete(_id)}
          type="button"
          className="btn btn-danger"
        >
          delete
        </button>
      </td>
    </tr>
  );
};

User.propTypes = {
  _id: PropTypes.string.isRequired,
  qualities: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  bookmark: PropTypes.bool.isRequired,
  onToggleBookMark: PropTypes.func.isRequired
};

export default User;
