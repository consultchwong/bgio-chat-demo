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

class ButtonGroup extends React.Component {
  render() {
    var isPlayed = this.props.isPlayed;
    var isActive = this.props.isActive;
    var selectedButton = this.props.selectedButton;
    var buttonColor = ["gre️y", "grey", "grey"];
    var buttonIcon = ["⛰️", "📝", "✂️"];
    console.log("ButtonGroup isPlayed", isPlayed);
    console.log("ButtonGroup isActive", isActive);
    console.log("ButtonGroup selectedButton", selectedButton);
    buttonColor = buttonColor.map((val, idx) => {
      if (isPlayed) {
        if (!selectedButton) {
          return "secondary";
        } else if (idx === selectedButton) {
          return "primary";
        } else {
          return "default";
        }
      } else {
        return "primary";
      }
    });
    const buttonList = buttonIcon.map((val, idx) => (
      <Button
        variant="contained"
        size="small"
        color={buttonColor[idx]}
        style={{ margin: 8, padding: 8 }}
        onClick={() => this.props.onClick(idx)}
        key={val}
      >
        {val}
      </Button>
    ));
    return <React.Fragment>{buttonList}</React.Fragment>;
  }
}

export class ChatBoard extends React.Component {
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
    this.props.moves.addText(sess_id, parseInt(this.props.playerID), msg);
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

  render() {
    console.log("render", this.props.ctx);
    console.log("render", this.props.G);
    console.log("render playerID", this.props.playerID);
    console.log("render isActive", this.props.isActive);

    var youID = this.props.playerID ? this.props.playerID : 0;
    var opponentID = this.props.playerID
      ? this.props.playerID == 0
        ? 1
        : 0
      : 1;
    var isGameOver = "gameover" in this.props.ctx;

    return (
      <React.Fragment>
        <div>Chat? Game?</div>
        <Button
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
        </Button>
      </React.Fragment>
    );
  }
}
