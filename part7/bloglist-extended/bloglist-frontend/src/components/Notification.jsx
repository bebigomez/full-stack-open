import { useSelector } from 'react-redux'

const Notification = () => {
  const notificationObject = useSelector((state) => state.notification)

  if (notificationObject === null) {
    return null
  }

  return (
    <div className={notificationObject.className}>
      {notificationObject.text}
    </div>
  )
}

export default Notification
