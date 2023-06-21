import { useEffect, useState, useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const { eventId } = props;
  const context = useContext(NotificationContext)

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (showComments) {
       context.showNotification({
      title:'Fetching all Comments...',
      message:'Fetching all comments for this event.',
      status:'pending'
    })
      fetch(`/api/comments/${eventId}`)
        .then((res) =>{
          if(res.ok){
            return res.json()
          }
          return res.json().then((data)=>{
            throw new Error(data.message || 'Something went wrong')
          })
          })
        .then((data) => {
          console.log('All Dummy comments', data);
          setComments(data.comments);
           context.showNotification({
      title:'Success',
      message:'Comment fetched successfully.',
      status:'success'
    })
           
        }).catch((err)=>{
           context.showNotification({
      title:'Error',
      message: err.messsage || 'Something went wrong',
      status:'error'
    })
        })
    }
  }, [showComments]);
  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    // send data to API
    context.showNotification({
      title:'Adding Comments...',
      message:'Adding comments for this event.',
      status:'pending'
    })
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if(res.ok){
          return res.json()
        }

        return res.json().then((data)=>{
          throw new Error(data.message || 'Something went wrong')
        })
      })
      .then((data) => {
        console.log('Comments Data', data);
        context.showNotification({
      title:'Success',
      message:'Comment added successfully.',
      status:'success'
    })
      }).catch((err)=>{
        context.showNotification({
      title:'Error',
      message: err.messsage || 'Something went wrong',
      status:'error'
    })
      })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
