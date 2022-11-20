import { connect } from 'react-redux';

// import { useSelector } from 'react-redux';
// const Notification = () => {
//   const { notification } = useSelector((store) => store.notification);

//   const style = {
//     border: 'solid',
//     padding: 10,
//     borderWidth: 1,
//   };
//   return <>{notification ? <div style={style}>{notification}</div> : null}</>;
// };

// export default Notification;

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  return (
    <>
      {props.notification.notification ? (
        <div style={style}>{props.notification.notification}</div>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const ConnectedNotifications = connect(mapStateToProps)(Notification);
export default ConnectedNotifications;
