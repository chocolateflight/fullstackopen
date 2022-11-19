import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('Blog', () => {
  const blog = {
    title: 'this is a test title',
    author: 'test author',
    url: 'www.google.com',
    likes: 0,
    user: {
      username: 'TestUser',
    },
  };

  const user = {
    username: 'TestUser',
    name: 'TestName',
  };

  const onLike = () => {};
  const onDelete = () => {};

  test('renders title and author but not url and likes', () => {
    const { container } = render(
      <Blog blog={blog} user={user} onLike={onLike} onDelete={onDelete} />
    );

    expect(container.querySelector('.blog')).toHaveTextContent(
      'this is a test title by test author'
    );

    expect(container.querySelector('.toggle-visible')).toHaveStyle('display: none');
  });

  test('will show details after clicking the button', async () => {
    const { container } = render(
      <Blog blog={blog} user={user} onLike={onLike} onDelete={onDelete} />
    );

    const user2 = userEvent.setup();
    const button = container.querySelector('.show-details');
    await user2.click(button);

    expect(container.querySelector('.toggle-visible')).toHaveStyle('display: block');
  });

  test('will call event handler twice when like is clicked twice', async () => {
    const mockHandler = jest.fn();

    const { container } = render(
      <Blog blog={blog} user={user} onLike={mockHandler} onDelete={onDelete} />
    );

    const user2 = userEvent.setup();
    const button = container.querySelector('.btn-like');
    await user2.click(button);
    await user2.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
