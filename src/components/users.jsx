import React, {useState} from 'react';
import api from "../api";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    console.log(users);

    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter(item => item._id !== userId));
    };

    const renderPhrase = (number) => {
        if (number !== 0) {
            return <h1><span className="badge bg-primary">{number} человек тусанёт с тобой сегодня</span></h1>;
            // return <h2 className="badge bg-primary">{number} человек тусанёт с тобой сегодня</h2>;
        } else {
            return <h1><span className="badge bg-danger">Никто с тобой не тусанёт</span></h1>;
        }
    };

    return <>
        {renderPhrase(users.length)}
        {users.length !== 0 && <table className="table">
            <thead>
            <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            {users.map(user =>
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>
                        {user.qualities.map(qualitie =>
                            <div key={qualitie._id} className={"badge bg-" + qualitie.color}>{qualitie.name}</div>
                        )}
                    </td>
                    <td>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate} / 5</td>
                    <td>
                        <button onClick={() => handleDelete(user._id)}
                            type="button" className="btn btn-danger">delete</button>
                    </td>
                </tr>
            )}
            </tbody>
        </table>}
    </>;
};

export default Users;