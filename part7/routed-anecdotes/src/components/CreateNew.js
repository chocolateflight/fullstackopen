import { useField } from '../hooks/index.js';
import { useNavigate } from 'react-router-dom';

const CreateNew = (props) => {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    props.addNew({
      content: content.inputs.value,
      author: author.inputs.value,
      info: info.inputs.value,
      votes: 0,
    });
    navigate('/');
  };

  const handleReset = (e) => {
    content.onReset();
    author.onReset();
    info.onReset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.inputs} />
        </div>
        <div>
          author
          <input {...author.inputs} />
        </div>
        <div>
          url for more info
          <input {...info.inputs} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
