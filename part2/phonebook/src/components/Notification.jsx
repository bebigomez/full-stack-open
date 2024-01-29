const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const notificationStyle = message.type === 'error' ? 'error' : 'notification';

  return (
    <div className={notificationStyle}>
      {message.text}
    </div>
  );
}

export default Notification