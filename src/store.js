import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store(
    {
        state:{
            name: "rst",
            job: "jr.devoloper",
            url: "http://54.194.160.158/bleshads/api/general/getBeaconsForTest",
            beacons: [],
            accessToken: "0088A1BA-0F71-4AC1-E232-29D408F2A058",
            update_url: "http://54.194.160.158/bleshads/api/general/updateDescriptionForTest",
            deviceId: "",
            description: "", 
            available: false,
            message: "Becaons Coming",
            show: false,
        },
        mutations:{
            postData(state){
                this.$http
                    .post(
                    this.state.url,
                    { accessToken: this.state.accessToken },
                    { headers: { "Content-Type": "application/json" } }
                    )
                    .then( function (result) {
                    this.state.beacons = result.body.beacons;
                    this.state.show=true;
                    this.state.available=true;
                    //console.log(this.beacons);
                    },
                    error => {
                        console.error(error);
                        this.state.show=false;  
                        this.state.available=false;           
                        this.state.message="Becaons not Coming";
                        }
                    );
            }
        }
    }
)