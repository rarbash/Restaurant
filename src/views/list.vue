<template>
  <div class="about">
    <h1>Restaurant List</h1>
    <br />
    <b-container>
      <b-table striped hover :items="collectData" :fields="fields">
        <template v-slot:cell(delete)="row">
          <b-button size="sm" @click="deleteItem(row.index)">Delete</b-button>
        </template>

        <template v-slot:cell(edit)="row">
          <b-button v-b-modal.showEdit @click="modalShow = !modalShow ,edited(row.index)">Edit</b-button>

          <b-modal
            id="showEdit"
            title="Change Restaurant Details"
            @hidden="resetModal"
            @ok="handleOk"
            v-model="modalShow"
          >
            <b-form-group label="Restaurant Name" label-for="newName">
              <b-form-input id="newName" v-model="resName"></b-form-input>
            </b-form-group>

            <b-form-group label="Restaurant Detail" label-for="textarea">
              <b-form-textarea
                v-model="resDes"
                id="textarea"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
            <star-rating class="rating" v-model="newRating"></star-rating>
          </b-modal>
        </template>
      </b-table>
    </b-container>
  </div>
</template>

<script>
import { db } from "@/main";
import StarRating from "vue-star-rating";

export default {
  components: {
    StarRating
  },
  beforeCreate() {
    this.$store.dispatch("setItems");
  },

  data() {
    return {
      fields: ["name", "rating", "description", "delete", "edit"],
      collectData: [],
      resName: "",
      resDes: "",
      indexOfRow: 0,
      modalShow: false,
      newRating: 0
    };
  },
  watch: {
    items() {
      this.showResData();
    }
  },
  computed: {
    items() {
      return this.$store.getters.getItems;
    }
  },
  methods: {
    showResData() {
      this.collectData = [];
      this.items.forEach(item => {
        this.collectData.push({
          name: item.name,
          rating: item.rating + "/5",
          description: item.description,
          idData: item.id
        });
      });
    },
    deleteItem(index) {
      var id = this.collectData[index].idData;
      if (id) {
        db.collection("items")
          .doc(id)
          .delete()
          .then(() => {
            console.log("Document successfully deleted");
            this.$store.dispatch("setItems");
          })
          .catch(error => {
            this.error = error;
          });
      } else {
        this.error = "Invalid ID";
      }
    },
    resetModal() {},

    handleOk() {
      var int = this.indexOfRow;
      var id = this.collectData[int].idData;
      if (this.resName !== "") {
        this.collectData[int].name = this.resName;
        db.collection("items")
          .doc(id)
          .update({ name: this.resName });
        this.resName = "";
        this.$store.dispatch("setItems");
        console.log(this.collectData[int]);
      }
      if (this.resDes !== "") {
        this.collectData[int].description = this.resDes;
        db.collection("items")
          .doc(id)
          .update({ description: this.resDes });
        this.resDes = "";
        this.$store.dispatch("setItems");
      }
      if (this.newRating !== 0) {
        this.collectData[int].rating = this.newRating;
        db.collection("items")
          .doc(id)
          .update({ rating: this.newRating });
        this.newRating = 0;
        this.$store.dispatch("setItems");
      }
      this.indexOfRow = 0;
    },
    edited(index) {
      return (this.indexOfRow = index);
    }
  }
};
</script>


<style>
/* .deletebt {
  background: rgb(240, 82, 82);
  border: none;
} */
</style>