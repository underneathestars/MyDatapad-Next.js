import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { GET, DELETE } from "../../utils/api";
import styles from "./[id].module.scss";
import Layout from "../../components/Layout/layout";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";

const DynamicMessage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [messageData, setMessageData] = useState({});

  const onMessageDelete = (id) => {
    const deleteIt = confirm("Sei sicuro di volerlo cancellare?");

    deleteIt &&
      DELETE("messages", id).then(() => {
        router.push("/");
      });
  };

  useEffect(() => {
    id && localStorage.setItem("id", id);
    GET(`messages/${localStorage.getItem("id")}`).then((data) =>
      setMessageData(data)
    );
  }, [id]);

  return (
  <Layout> 
    <div className={styles.wrapper}>
      <Link href={"/"}>
        <a className={styles.goback}><FontAwesomeIcon
        icon={faArrowLeft}
        style={{ fontSize: 30, color: "white" }}
      /></a>
      </Link>
      <div className={styles.wrapper__card}>
        <h4 className={styles.title}>{messageData.sender}</h4>
        <p className={styles.text}>{messageData.text}</p>
        <p className={styles.date}>{moment(messageData.date).calendar()}</p>
        <button className={styles.button} onClick={() => onMessageDelete(messageData.id)}>x</button>
      </div>
    </div>
  </Layout> 
  );
};

export default DynamicMessage;
