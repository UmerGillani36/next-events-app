import classes from './comment-list.module.css';

function CommentList({ comments }) {
  return (
    <ul className={classes.comments}>
      {comments?.map((val) => (
        <li key={val._id}>
          <p>{val.text}</p>
          <div>
            By <address>{val.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
