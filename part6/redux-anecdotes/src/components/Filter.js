import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { filterAnecdotes } from '../features/filterSlice';

const Filter = () => {
  const inputFilterRef = useRef();
  const dispatch = useDispatch();

  const filterHandler = () => {
    const filterValue = inputFilterRef.current.value;
    dispatch(filterAnecdotes(filterValue));
  };

  return (
    <div style={{ marginBottom: '16px', marginTop: '16px' }}>
      <span>
        Filter <input ref={inputFilterRef} onChange={filterHandler} />
      </span>
    </div>
  );
};

export default Filter;
