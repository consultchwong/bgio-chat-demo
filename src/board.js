/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from "react";
import PropTypes from "prop-types";
import "./board.css";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import SendIcon from "@material-ui/icons/Send";
import Linkify from "react-linkify";

const useStyles = makeStyles({
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  }
});

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export class ChatBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tabvalue: 0, inputvalue: "", appbarheight: 96 + 48 };
  }

  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool
  };

  onAddTextClick = (sess_id, msg) => {
    console.log("onAddTextClick", msg);
    //    this.props.moves.takeAction(action);
    this.props.moves.addText(
      sess_id,
      parseInt(this.props.playerID),
      this.linkify(msg)
    );
    this.setState({ ...this.state, inputvalue: "" });
  };
  onAddAvatarClick = (sess_id, avatar) => {
    console.log("onAddAvatarClick", avatar);
    //    this.props.moves.takeAction(action);
    this.props.moves.invite(sess_id, avatar);
  };
  onJoinChatClick = (sess_id, topic, player_id) => {
    console.log("onJoinChatClick", topic);
    //    this.props.moves.takeAction(action);
    this.props.moves.createChatSession(sess_id, topic, player_id);
  };
  onTabChange = (event, newValue) => {
    var tab_h = 48;
    var tab_border_h = 48;
    var tab_item_h = 48;
    var appbarheight = tab_h + tab_border_h + tab_item_h;
    if (newValue === 1) tab_item_h = 280;
    appbarheight = tab_h + tab_border_h + tab_item_h;
    this.setState({
      ...this.state,
      tabvalue: newValue,
      appbarheight: appbarheight
    });
  };
  onMessageInputChange = value => {
    this.setState({ ...this.state, inputvalue: value });
  };

  linkify(text, caption) {
    var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    if (caption) {
      return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + caption + "</a>";
      });
    } else {
      return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + url + "</a>";
      });
    }
  }

  scrollToBottom = () => {
    this.el.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    console.log("render", this.state);
    console.log("render", this.props.ctx);
    console.log("render", this.props.G);
    console.log("render playerID", this.props.playerID);
    console.log("render isActive", this.props.isActive);
    console.log(
      "render linkify",
      this.linkify("hello, http://www.yahoo.com.hk", "Link")
    );
    var inputvalue = this.state.inputvalue;
    var youID = this.props.playerID ? this.props.playerID : 0;
    var opponentID = this.props.playerID
      ? this.props.playerID == 0
        ? 1
        : 0
      : 1;
    var isGameOver = "gameover" in this.props.ctx;

    var csession = this.props.G["chatSession"][this.props.chatSessionID];

    const msgList = !csession
      ? ""
      : this.props.G["chatSession"][this.props.chatSessionID]["messages"].map(
          (val, idx) => {
            return (
              <Paper
                style={{
                  margin: 8,
                  flexDirection: "row",
                  padding: 8,
                  display: "flex",
                  alignItems: "center",
                  align: "right",
                  width: "max-content"
                }}
              >
                <Avatar
                  alt={this.props.G.avatars[val.avatar]["name"]}
                  src={this.props.G.avatars[val.avatar]["pic"]}
                  style={{ margin: 10, width: 60, height: 60 }}
                />
                <Typography component="p">
                  <Linkify>{val.t}</Linkify>
                </Typography>
              </Paper>
            );
          }
        );

    const emojiList = [
      "😀",
      "😄",
      "😁",
      "😆",
      "😅",
      "🤣",
      "😂",
      "🙂",
      "🙃",
      "😉",
      "😊",
      "😇",
      "🥰",
      "😍",
      "🤩",
      "😘",
      "😗",
      "☺",
      "😚",
      "😙",
      "😋",
      "😛",
      "😜",
      "🤪",
      "😝",
      "🤑",
      "🤗",
      "🤭",
      "🤫",
      "🤔",
      "🤐",
      "🤨",
      "😐",
      "😑",
      "😶",
      "😏",
      "😒",
      "🙄",
      "😬",
      "🤥",
      "😌",
      "😔",
      "😪",
      "🤤",
      "😴",
      "😷",
      "🤒",
      "🤕",
      "🤢",
      "🤮",
      "🤧"
    ];
    const emojiButtons = emojiList.map((val, idx) => {
      return (
        <IconButton
          size="big"
          color="default"
          style={{ margin: 8, padding: 8 }}
          onClick={() => this.onAddTextClick(this.props.chatSessionID, val)}
          key={"emoji_" + idx}
          component="span"
        >
          {val}
        </IconButton>
      );
    });
    return (
      <React.Fragment>
        <div>{csession.topic}</div>
        {/*        <Button
          variant="contained"
          size="small"
          color="primary"
          style={{ margin: 8, padding: 8 }}
          onClick={() =>
            this.onJoinChatClick(
              this.props.chatSessionID,
              "Just Say It",
              parseInt(this.props.playerID)
            )
          }
          key="joinchat"
        >
          Join Chat
        </Button>
        <Button
          variant="contained"
          size="small"
          color="primary"
          style={{ margin: 8, padding: 8 }}
          onClick={() => this.onAddAvatarClick(this.props.chatSessionID, 2)}
          key="addavatar"
        >
          Invite Eva
        </Button>
        <Button
          variant="contained"
          size="small"
          color="primary"
          style={{ margin: 8, padding: 8 }}
          onClick={() => this.onAddTextClick(this.props.chatSessionID, "hihi")}
          key="addtext"
        >
          Add Text
        </Button>*/}
        <div>
          {msgList}
          <div
            style={{ height: this.state.appbarheight }}
            ref={el => {
              this.el = el;
            }}
          >
            {/**Place holder */}{" "}
          </div>
        </div>
        <AppBar
          position="fixed"
          color="primary"
          style={{
            top: "auto",
            bottom: 0
          }}
        >
          <Tabs
            value={this.state.tabvalue}
            onChange={(evt, newValue) => this.onTabChange(evt, newValue)}
          >
            <Tab label="💬" />
            <Tab label="😃" />
          </Tabs>
          {this.state.tabvalue === 0 && (
            <TabContainer>
              <Paper
                style={{
                  padding: "2px 4px",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <InputBase
                  style={{ marginLeft: 8, flex: 1 }}
                  placeholder="Add Message Here"
                  inputProps={{ "aria-label": "Add Message Here" }}
                  value={this.state.inputvalue}
                  onChange={evt => this.onMessageInputChange(evt.target.value)}
                />
                <IconButton
                  style={{ padding: 10 }}
                  aria-label="Send"
                  onClick={() =>
                    this.onAddTextClick(this.props.chatSessionID, inputvalue)
                  }
                >
                  <SendIcon />
                </IconButton>
              </Paper>
            </TabContainer>
          )}
          {this.state.tabvalue === 1 && (
            <TabContainer>
              <Typography variant="h6" color="inherit">
                {emojiButtons}
              </Typography>
            </TabContainer>
          )}
        </AppBar>
      </React.Fragment>
    );
  }
}
