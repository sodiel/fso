const Notification = ({ message, type }) => {
  let notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
  };
  notificationStyle =
    type === "success"
      ? { ...notificationStyle, color: "green" }
      : { ...notificationStyle, color: "red" };
  if (message === null) {
    return null;
  }

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
