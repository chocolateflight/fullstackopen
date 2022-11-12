const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlogs = (blogs) => {
  return blogs.reduce((favorite, currentBlog) =>
    favorite.likes > currentBlog.likes ? favorite : currentBlog
  );
};

const mostBlogs = (blogs) => {
  const countedAuthors = _.countBy(blogs, 'author');
  const maxAuthor = Object.keys(countedAuthors).reduce((max, current) =>
    max > current ? max : current
  );
  const numBlogs = countedAuthors[maxAuthor];

  return {
    author: maxAuthor,
    blogs: numBlogs,
  };
};

const mostLikes = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author');
  const likesByAuthor = Object.keys(groupedByAuthor).map((author) => {
    const likes = groupedByAuthor[author].reduce(
      (allLikes, currentBlog) => allLikes + currentBlog.likes,
      0
    );
    return {
      author: author,
      likes: likes,
    };
  });
  const maxLikedAuthor = likesByAuthor.reduce((max, current) =>
    max.likes > current.likes ? max : current
  );

  return maxLikedAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs,
  mostLikes,
};
