import { useState } from "react";
import { POST } from "../../utils/api";
import styles from "./index.module.scss";

const AddNewMessage = ({ reloadData, setReloadData }) => {
  const [messageInput, setMessageInput] = useState("");
  const [userInput, setUserInput] = useState("");

  const onSendData = (e) => {
    e.preventDefault();
    POST(
      "messages",
      JSON.stringify({
        text: messageInput,
        sender: userInput,
        date: new Date()
      })
    );
    alert("Il messaggio è stato inviato!");
    setReloadData(!reloadData);
    setMessageInput("");
    setUserInput("");
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSendData}>
        <label htmlFor="user">Utente</label>
        <input
          required
          autoComplete="off"
          type="text"
          id="user"
          name="user"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        /><label htmlFor="message">Messaggio</label>
        <input
          required
          autoComplete="off"
          type="text"
          id="message"
          name="message"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <input type="submit" value="Invia" />
      </form>
    </div>
  );
};

export default AddNewMessage;
