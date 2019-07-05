/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Game, TurnOrder, PlayerView } from "boardgame.io/core";

export const LiveChat = Game({
  name: "live-chat",

  setup: () => ({
    chatSession: [
      {
        "123456": {
          topic: "test",
          subscribers: [],
          messages: [
            { avatar: 1, t: "hihi", dt: "2019-07-03T18:25:43.511Z" },
            { avatar: 1, t: "你好", dt: "2019-07-03T18:25:46.511Z" },
            { avatar: 2, t: "hihihihi", dt: "2019-07-03T18:25:57.511Z" },
            { avatar: 3, t: "你好你好", dt: "2019-07-03T18:25:57.511Z" }
          ]
        }
      }
    ],
    players: {
      "0": "secret0",
      "1": "secret1"
    },
    avatars: [
      {
        name: "Adam",
        pic:
          "https://en.wikipedia.org/wiki/Adam_Levine#/media/File:AdamLevine2011.jpg"
      },
      {
        name: "Eva",
        pic:
          "https://en.wikipedia.org/wiki/Eva_Murati#/media/File:Eva_Murati.jpg"
      },
      {
        name: "Serpent",
        pic:
          "https://upload.wikimedia.org/wikipedia/commons/1/1c/Morelia_viridis_-_python_vert_-_loury_cedric_-_wiki.JPG"
      }
    ]
  }),
  playerView: PlayerView.STRIP_SECRETS,
  moves: {
    addText(G, ctx, sess_id, a_id, msg) {
      console.log("addText", sess_id, msg);

      G.chatSession[sess_id].messages.push({
        avatar: a_id,
        t: msg,
        dt: new Date()
      });
      console.log("addText G.messages", G.messages);
      console.log("addText ret", { ...G });
    },
    addAvatar(G, ctx, sess_id, avatar) {
      console.log("addAvatar", avatar);

      G.chatSession[sess_id].subscribers.push(avatar);
      console.log(
        "addAvatar G.chatSession[sess_id].subscribers",
        G.chatSession[sess_id].subscribers
      );
      console.log("addAvatar ret", { ...G });
    },
    invite(G, ctx, sess_id, avatar_id) {
      console.log("invite", sess_id, avatar_id);

      G.chatSession[sess_id].subscribers.push(avatar_id);
      console.log(
        "invite G.chatSession[sess_id].subscribers",
        G.chatSession[sess_id].subscribers
      );
      console.log("invite ret", { ...G });
    },
    createChatSession(G, ctx, sess_id, topic, player_id) {
      console.log("createChatSession", G);
      console.log("createChatSession", sess_id, topic, player_id);

      G.chatSession = {
        ...G.chatSession,
        [sess_id]: { topic: topic, messages: [], subscribers: [player_id] }
      };
      console.log("createChatSession G.chatSession", G.chatSession);
      console.log("createChatSession ret", { ...G });
    }
  },

  flow: {
    movesPerTurn: 1,
    turnOrder: TurnOrder.ANY,
    endGameIf: (G, ctx) => {
      console.log("endGameIf", G.players);
    }
  }
});
