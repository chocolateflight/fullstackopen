import { useMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Loading from './Loading';

const UserView = () => {
  const { allUsers } = useSelector((store) => store.user);
  const match = useMatch('/users/:id');
  const [detailedUser, setDetailedUser] = useState(null);

  useEffect(() => {
    if (allUsers) {
      setDetailedUser(match ? allUsers.find((u) => u.id === match.params.id) : null);
    }
  }, [allUsers]);

  if (detailedUser === null) {
    return <Loading></Loading>;
  }

  if (detailedUser === undefined) {
    return <div>Invalid User</div>;
  }

  return (
    <>
      <h2>{detailedUser.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {detailedUser.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default UserView;
