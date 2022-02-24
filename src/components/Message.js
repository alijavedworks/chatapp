import React from "react";
import Moment from "react-moment";
function Message({ msg }) {
  return (
    <div className="message_wrapper">
      <p>{msg.text}</p>

      <small>
        <Moment fromNow>{msg.createdAt.toDate()}</Moment>
      </small>
    </div>
  );
}

export default Message;
