<script>
import axios from "axios";
import ActionCable from "actioncable";

export default {
  data: function () {
    return {
      messages: [],
      newMessageParams: {}
    };
  },
  created: function () {
    axios.get("/messages").then((response) => {
      console.log("Messages Index:", response.data);
      this.messages = response.data;
    });
    var cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    cable.subscriptions.create("MessagesChannel", {
      connected: () => {
        // Called when the subscription is ready for use on the server
        console.log("Connected to MessagesChannel");
      },
      disconnected: () => {
        // Called when the subscription has been terminated by the server
      },
      received: (data) => {
        // Called when there's incoming data on the websocket for this channel
        console.log("Data from MessagesChannel:", data);
        this.messages.unshift(data); // update the messages in real time
      }
    });
  },
  methods: {
    createMessage: function () {
      axios.post("/messages", this.newMessageParams).then((response) => {
        console.log(response.data);
        // this.messages.unshift(response.data);
        this.newMessageParams.body = "";
      });
    }
  }
};
</script>

<template>
  <div class="messages-index">
    <br />
    <br />
    <br />
    <h1>Messages</h1>

    <div>
      <textarea v-model="newMessageParams.body" cols="30" rows="10"></textarea>
      <br />
      <button v-on:click="createMessage()">Submit</button>
    </div>

    <div v-for="message in messages" v-bind:key="message.id">
      <p>
        <strong>{{ message.name }}</strong> : {{ message.created_at }}
      </p>
      <p>{{ message.body }}</p>
    </div>
  </div>
</template>
