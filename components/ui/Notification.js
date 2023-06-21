import { useContext, useEffect } from 'react';

import classes from './Notification.module.css';
import NotificationContext from '../../store/notification-context';

function Notification(props) {
  const { title, message, status } = props;
  const context = useContext(NotificationContext);
  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  if (status === 'pending') {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={context.hideNotification}
    >
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;