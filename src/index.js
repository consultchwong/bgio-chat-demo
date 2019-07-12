/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 *
 * DONE
 *   Turn Order = ANY
 *   Game ID
 *   Secret State
 *
 * TO DO
 *   Point System (Apply Phases)
 *   Support more than 2 players
 *   Lobby
 *   Card game framework
 *   add AI
 */

import React from "react";
import PropTypes from "prop-types";
import { render } from "react-dom";
import { Client } from "boardgame.io/react";
import { LiveChat } from "./game";
import { ChatBoard } from "./board";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Avatar from "@material-ui/core/Avatar";

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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));
const ChatClient = Client({
  game: LiveChat,
  board: ChatBoard,
  multiplayer: { local: true }
  /*multiplayer: {
    server: "https://rock-paper-scissors-bgio-serv.herokuapp.com/"
  }*/
});

export default function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const avatars = [
    {
      name: "Adam",
      pic: "https://material-ui.com/static/images/avatar/1.jpg"
    },
    {
      name: "Serpent",
      pic: "https://material-ui.com/static/images/avatar/2.jpg"
    },
    {
      name: "Eva",
      pic: "https://material-ui.com/static/images/avatar/3.jpg"
    }
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Avatar
          alt={avatars[value].name}
          src={avatars[value].pic}
          style={{ margin: 10, width: 60, height: 60 }}
        />
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Adam"> </Tab>
          <Tab label="Serpent" />
        </Tabs>
      </AppBar>
      {value === 0 && (
        <TabContainer>
          <Typography variant="h6" color="inherit">
            <ChatClient playerID="0" chatSessionID="chathere" />
          </Typography>
        </TabContainer>
      )}
      {value === 1 && (
        <TabContainer>
          <Typography variant="h6" color="inherit">
            <ChatClient playerID="1" chatSessionID="chathere" />
          </Typography>
        </TabContainer>
      )}
    </div>
  );
}

render(<App />, document.getElementById("root"));
