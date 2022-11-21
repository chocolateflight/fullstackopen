import { useSelector } from 'react-redux';
import './Loading.css';

const Loading = (props) => {
  const { loading } = useSelector((store) => store.loading);

  return <>{loading ? <div className='loading'></div> : props.children}</>;
};

export default Loading;
