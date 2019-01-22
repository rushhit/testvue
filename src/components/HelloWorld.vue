<template>
  <div class="hello">
    <button class="btn btn-primary" @click="post">Get New Beacons</button>
    <div v-if="updated || available" v-bind:class="{updated:updated, available:available }">
      <span>{{message}}</span>
    </div>
    <br>
    <br>
    <div id="table">
      <table class="blueTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Device Serial</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="beacon in beacons">
            <td>{{ beacon.id }}</td>
            <td>{{ beacon.device_serial }}</td>
            <td>{{ beacon.latitude }}</td>
            <td>{{ beacon.longitude }}</td>
            <td
              v-on:click.prevent="get_id($event)"
              :data-value-id="beacon.id"
              :data-value-description="beacon.description"
            >{{ beacon.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      element: "",
      name: "rst",
      job: "jr.devoloper",
      url: "http://54.194.160.158/bleshads/api/general/getBeaconsForTest",
      beacons: [],
      accessToken: "0088A1BA-0F71-4AC1-E232-29D408F2A058",
      update_url:
        "http://54.194.160.158/bleshads/api/general/updateDescriptionForTest",
      deviceId: "",
      description: "",
      updated: false,
      available: false,
      message: "",
      show: false,
      click: false
    };
  },
  /*computed:{
      name(){return store.state.name},
      job(){return store.state.job},
      url(){return store.state.url},
      beacons(){return store.state.beacons},
      accessToken(){return store.state.accessToken},
      update_url(){return store.state.update_url},
      deviceId(){return store.state.deviceId},
      description(){return store.state.description},
      available(){return store.state.available},
      message(){return store.state.message},
      show(){return store.state.show}
  },*/
  methods: {
    mounted() {
      window.addEventListener("load", () => {
        alert("laod");
      });
    },
    post() {
      /*store.commit('postData');*/
      this.$http
        .post(
          this.url,
          { accessToken: this.accessToken },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(
          function(result) {
            this.beacons = result.body.beacons;

            //console.log(this.beacons);
          },
          error => {
            console.error(error);
          }
        );
    },
    
    get_id: function(event) {
      this.element = event.target;
      this.description = this.element.getAttribute("data-value-description");
      this.deviceId = this.element.getAttribute("data-value-id");
      console.log(this.deviceId, this.description);    
      var txt;
      var description = prompt("Please change beacon description:", "");
      if (description == null || description == "") {
        txt = "User cancelled change description.";
      } else {
        this.$http
          .post(
            this.update_url,
            {
              deviceId: this.deviceId,
              description: this.description,
              accessToken: this.accessToken
            },
            { headers: { "Content-Type": "application/json" } }
          )
          .then(result => {
            console.log(result);
            if (result.body.resultCode == 0 && result.body.result) {
              this.updated = true;
              this.available = false;
              this.message =
                "Beacon " + this.deviceId + " updated successfully";
            } else {
              this.updated = false;
              this.available = true;
              this.message =
                "Beacon " + this.deviceId + " not updated";
            }
          });
      }
      
    }
  }
};


</script>


<style scoped>
ul,
li {
  list-style-type: none;
}
span {
  display: inline-block;
  padding: 10px;
  color: #fff;
  margin: 10px 0;
}
.updated span {
  background: green;
}
.available span {
  background: red;
}

#map {
  height: 100%;
}
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
#table {
  width: 100%;
  height: auto;
  background: rgba(2, 255, 255);
}
table.blueTable {
  border: 1px solid #1c6ea4;
  background-color: #eeeeee;
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}
table.blueTable td,
table.blueTable th {
  border: 1px solid #aaaaaa;
  padding: 3px 2px;
}
table.blueTable tbody td {
  font-size: 13px;
}
table.blueTable tr:nth-child(even) {
  background: #d0e4f5;
}
table.blueTable thead {
  background: #1c6ea4;
  background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1c6ea4 100%);
  background: -webkit-linear-gradient(
    top,
    #5592bb 0%,
    #327cad 66%,
    #1c6ea4 100%
  );
  background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1c6ea4 100%);
  border-bottom: 2px solid #444444;
}
table.blueTable thead th {
  font-size: 15px;
  font-weight: bold;
  color: #ffffff;
  border-left: 2px solid #d0e4f5;
}
table.blueTable thead th:first-child {
  border-left: none;
}

table.blueTable tfoot {
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  background: #d0e4f5;
  background: -moz-linear-gradient(top, #dcebf7 0%, #d4e6f6 66%, #d0e4f5 100%);
  background: -webkit-linear-gradient(
    top,
    #dcebf7 0%,
    #d4e6f6 66%,
    #d0e4f5 100%
  );
  background: linear-gradient(to bottom, #dcebf7 0%, #d4e6f6 66%, #d0e4f5 100%);
  border-top: 2px solid #444444;
}
table.blueTable tfoot td {
  font-size: 14px;
}
table.blueTable tfoot .links {
  text-align: right;
}
table.blueTable tfoot .links a {
  display: inline-block;
  background: #1c6ea4;
  color: #ffffff;
  padding: 2px 8px;
  border-radius: 5px;
}
</style>



