Module.register("septa-transit", {
    // Default module config
    defaults: {},
  
    // Override start function
    start: function () {
      this.sendSocketNotification("GET_SEPTA_TRANSIT");
      this.scheduleUpdate();
    },
  
    // Override socket notification received function
    socketNotificationReceived: function (notification, payload) {
      if (notification === "SEPTA_TRANSIT_DATA") {
        this.transitData = payload;
        this.updateDom();
      }
    },
  
    // Schedule regular module update
    scheduleUpdate: function () {
      const self = this;
      setInterval(function () {
        self.sendSocketNotification("GET_SEPTA_TRANSIT");
      }, 5 * 60 * 1000); // Refresh every 5 minutes
    },
  
    // Override getDom function
    getDom: function () {
      const wrapper = document.createElement("div");
      wrapper.className = "septa-transit";
  
      if (this.transitData) {
        const table = document.createElement("table");
        table.className = "small";
  
        for (const arrival of this.transitData.data) {
          const row = document.createElement("tr");
  
          const routeCell = document.createElement("td");
          routeCell.innerText = arrival.route;
          row.appendChild(routeCell);
  
          const destinationCell = document.createElement("td");
          destinationCell.innerText = arrival.destination;
          row.appendChild(destinationCell);
  
          const departureCell = document.createElement("td");
          departureCell.innerText = arrival.orig_departure_time;
          departureCell.className = "departure-time";
          row.appendChild(departureCell);
  
          table.appendChild(row);
        }
  
        wrapper.appendChild(table);
      } else {
        wrapper.innerText = "Loading SEPTA transit information...";
      }
  
      return wrapper;
    },
  });
  