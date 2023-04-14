import React, {useState} from 'react';
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";

const User = (props) => {

  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(prevState => !prevState);
  }

  return (
    <tr key={props._id}>
      <td>{props.name}</td>
      <td>
        {props.qualities.map(qualitie =>
          <Qualitie key={qualitie._id} {...qualitie} />
        )}
      </td>
      <td>{props.profession.name}</td>
      <td>{props.completedMeetings}</td>
      <td>{props.rate} / 5</td>
      <td>
        <Bookmark active={active} onClick={handleClick}/>
      </td>
      <td>
        <button onClick={() => props.onDelete(props._id)}
                type="button" className="btn btn-danger">delete</button>
      </td>
    </tr>
  );
};

export default User;