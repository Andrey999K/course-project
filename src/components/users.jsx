import React, {useState} from 'react';
import api from "../api";
import SearchStatus from "./searchStatus";
import User from "./user";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter(item => item._id !== userId));
    };

    return <>
        <SearchStatus number={users.length}/>
        {users.length !== 0 && <table className="table">
            <thead>
            <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col">Избранное</th>
                <th scope="col"/>
            </tr>
            </thead>
            <tbody>
            {users.map(user =>
              <User key={user._id} {...user} onDelete={handleDelete} />
            )}
            </tbody>
        </table>}
    </>;
};

export default Users;