import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import "./ChatWindow.css";
import MessageItem from "./MessageItem";

import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
import MicIcon from "@material-ui/icons/Mic";

export default ({ user }) => {
  let recognition = null;
  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition !== undefined) {
    recognition = new SpeechRecognition();
  }

  const [emojiOpen, setEmojiOpen] = useState(false);
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [list, setList] = useState([
    { author: "firstUser", body: "blablabla" },
    { author: "firstUser", body: "blabla" },
    { author: "anotherUser", body: "bla" }
  ]);

  //Concatenando o texto com Emoji
  const handleEmojiClick = (event, emojiObject) => {
    setText(text + emojiObject.emoji);
  };
  const handleOpenEmoji = () => {
    setEmojiOpen(true);
  };
  const handleCloseEmoji = () => {
    setEmojiOpen(false);
  };
  //Não está funcionando o Handle do Mic, verificar posteriormente condição
  const handleMicClick = () => {
    if (recognition !== null) {
      recognition.onstart = () => {
        setListening(true);
      };
      recognition.onend = () => {
        setListening(false);
      };
      recognition.onresult = (event) => {
        setText(event.results[0][0].transcript);
      };
      recognition.start();
    }
  };
  const handleSendClick = () => {};

  return (
    <div className="chatWindow">
      <div className="chatWindow--header">
        <div className="chatWindow--headerinfo">
          <img
            className="chatWindow--avatar"
            src="https://ik.imagekit.io/meugamer/wp-content/uploads/2020/02/conan_o_barbaro_1_2019_plano_critico-600x400-1.jpg"
            alt="Foto do Perfil-Conversante"
          />
          <div className="chatWindow--name">Fulano 01</div>
        </div>

        <div className="chatWindow--headerbuttons">
          <div className="chatWindow--btn">
            <SearchIcon fontSize="small" style={{ color: "#919191" }} />
          </div>
          <div className="chatWindow--btn">
            <AttachFileIcon fontSize="small" style={{ color: "#919191" }} />
          </div>
          <div className="chatWindow--btn">
            <MoreVertIcon fontSize="small" style={{ color: "#919191" }} />
          </div>
        </div>
      </div>

      <div className="chatWindow--body">
        {list.map((item, key) => (
          <MessageItem key={key} data={item} user={user} />
        ))}
      </div>

      <div
        className="chatWindow--emojiarea"
        style={{ height: emojiOpen ? "200px" : "0px" }}
      >
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          disableSearchBar /*Bye bye search bar*/
        />
      </div>

      <div className="chatWindow--footer">
        <div className="chatWindow--pre">
          <div
            className="chatWindow--btn"
            onClick={handleCloseEmoji}
            style={{ width: emojiOpen ? 40 : 0 }}
          >
            <CloseIcon fontSize="small" style={{ color: "#919191" }} />
          </div>
          <div className="chatWindow--btn" onClick={handleOpenEmoji}>
            <InsertEmoticonIcon
              fontSize="small"
              style={{ color: emojiOpen ? "#009688" : "#919191" }}
            />
          </div>
        </div>

        <div className="chatWindow--inputarea">
          <input
            className="chatWindow--input"
            type="text"
            placeholder="Digite uma mensagem"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </div>

        <div className="chatWindow--pos">
          {text === "" && (
            <div onClick={handleMicClick} className="chatWindow--btn">
              <MicIcon
                fontSize="small"
                style={{ color: listening ? "#126ece" : "#919191" }}
              />
            </div>
          )}
          {text !== "" && (
            <div onClick={handleSendClick} className="chatWindow--btn">
              <SendIcon fontSize="small" style={{ color: "#919191" }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
