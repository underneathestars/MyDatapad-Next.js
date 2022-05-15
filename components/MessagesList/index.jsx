import { useState, useEffect } from "react";
import Link from "next/link";
import { GET, DELETE } from "../../utils/api";
import styles from "./index.module.scss";
import moment from "moment";

const MessagesList = ({ reloadData, setReloadData }) => {
  const [messagesList, setMessagesList] = useState([]);

  useEffect(() => {
    console.log(moment().calendar())
    GET("messages").then((data) => setMessagesList(data));
  }, [reloadData]);

  const onMessageDelete = (id) => {
    const deleteIt = confirm("Sei sicuro di volerlo cancellare?");

    deleteIt &&
      DELETE("messages", id).then(() => {
        setReloadData(!reloadData);
      });
  };

  const orderListByTime = (list) => list.slice(0).reverse();

  return (
    <div className={styles.wrapper}>
      {messagesList &&
        orderListByTime(messagesList).map((message) => (
          <div className={styles.wrapper__message} key={message.id}>
            <Link href={`/messages/${message.id}`}>
              <a>
                <h4>{message.sender}</h4>
              </a>
            </Link>
            <p className={styles.text}>{message.text}</p>
            <p className={styles.date}>{moment(message.date).calendar()}</p>
            <button onClick={() => onMessageDelete(message.id)}>x</button>
          </div>
        ))}
    </div>
  );
};

export default MessagesList;
