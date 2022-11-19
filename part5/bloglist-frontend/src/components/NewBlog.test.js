import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewBlog from './NewBlog';

describe('New Blog Form', () => {
  test('calls event handler with right details', async () => {
    const mockHandler = jest.fn();
    const { container } = render(<NewBlog onNewBlog={mockHandler} />);

    const user2 = userEvent.setup();
    const button = container.querySelector('.btn-submit');
    await user2.click(button);

    console.log(mockHandler.mock.calls);
    expect(mockHandler.mock.calls).toHaveLength(1);
    // eslint-disable-next-line quotes
    expect(mockHandler.mock.calls[0][0]).toStrictEqual({ "title": "", "author": "", "url": "" });
  });
});
