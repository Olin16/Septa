const NodeHelper = require("node_helper");
const fetch = require("node-fetch");

module.exports = NodeHelper.create({
  // Override start function
  start: function () {
    console.log("SEPTA Transit helper started...");
  },

  // Override socket notification received function
  socketNotificationReceived: function (notification, payload) {
    if (notification === "GET_SEPTA_TRANSIT") {
      this.fetchTransitData();
    }
  },

  // Fetch transit data from the SEPTA API
  fetchTransitData: function () {
    const apiURL = "https://api.septa.org";
    const endpoint = "/realtime/next_to_arrive";
    const station = "Suburban Station"; // Example station name

    const requestURL = apiURL + endpoint + "/" + station;

    fetch(requestURL)
      .then((response) => response.json())
      .then((data) => {
        this.sendSocketNotification("SEPTA_TRANSIT_DATA", data);
      })
      .catch((error) => {
        console.error("Error occurred while accessing the SEPTA API:", error);
      });
  },
});
