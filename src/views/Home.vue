<template>
  <div class="home">
    <img width="200" height="200" alt="restuarant logo" src="../assets/work.png" />
    <br />
    <br />
    <b-container>
      <b-form-group
        label="Restuarant  Details"
        label-size="lg"
        label-class="font-weight-bold pt-0"
        lg="auto"
      ></b-form-group>

      <b-form-group
        label-cols-sm="3"
        label="Restuarant Name:"
        label-align-sm="right"
        label-for="res-name"
      >
        <b-form-input v-model="myRes" id="res-name"></b-form-input>
      </b-form-group>

      <b-form-group
        label-cols-sm="3"
        label="Restuarant Description:"
        label-align-sm="right"
        label-for="res-des"
      >
        <b-form-textarea
          v-model="myDes"
          id="textarea"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>

      <div class="rating">
        <star-rating class="rating" v-model="myRating"></star-rating>
      </div>
      <br />
      <br />
      <button @click="addRes">Add</button>
    </b-container>
  </div>
</template>

<script>
import { db } from "@/main";
import StarRating from "vue-star-rating";

export default {
  name: "Home",
  components: {
    StarRating
  },
  data() {
    return {
      myRes: "",
      myDes: "",
      errors: "",
      myRating: 0
    };
  },
  methods: {
    addRes() {
      this.errors = "";
      if (this.myRes !== "") {
        db.collection("items")
          .add({
            created_at: Date.now(),
            name: this.myRes,
            description: this.myDes,
            rating: this.myRating
          })
          .then(response => {
            console.log("sucess add items");
            if (response) {
              this.myRes = "";
              this.myDes = "";
              this.rating = 0;
            }
            this.$router.push({ path: "/list" });
          })
          .catch(error => {
            console.log("error add items", error);
            this.errors = error;
          });
        console.log(this.myRes);
        console.log(this.myDes);
      } else {
        this.errors = "Please enter some text";
      }
    }
  }
};
</script>

<style scoped>
.rating {
  display: inline-block;
}

.inputMyRes {
  width: 500px;
  height: 30px;
  font-size: 15px;
}

.inputMyDes {
  width: 500px;
  height: 100px;
  font-size: 15px;
}

button {
  width: 10%;
  margin: 0 0 10px;
  padding: 7px;
  font-size: 15px;
  background: rgb(235, 92, 92);
  color: aliceblue;
}
</style>
