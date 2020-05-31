<template>
  <div class="about">
    <h1>Restaurant List</h1>
    <br />
    <b-container>
      <b-table striped hover :items="collectData" :fields="fields">
        <template v-slot:cell(delete)="row">
          <b-button size="sm" @click="deleteItem(row.index)" class="deletebt">Delete</b-button>
        </template>
      </b-table>
    </b-container>
  </div>
</template>

<script>
import { db } from "@/main";
export default {
  beforeCreate() {
    this.$store.dispatch("setItems");
  },
  data() {
    return {
      fields: ["name", "rating", "description", "delete"],
      collectData: []
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
      console.log(index);
      var id = this.collectData[index].idData;
      console.log(id);
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
    }
  }
};
</script>


<style>
.deletebt {
  background: rgb(240, 82, 82);
  border: none;
}
</style>