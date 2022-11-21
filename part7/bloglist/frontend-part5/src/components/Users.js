import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../features/userSlice';

const Users = () => {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th style={{ fontWeight: 'bold' }}>blogs created</th>
          </tr>

          {allUsers &&
            [...allUsers].map((user) => (
              <tr key={user.username}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
