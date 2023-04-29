
<template>
    <div>
      
      <!-- [Search]  -->

      <div class="container pt-3 pb-3">
         <h2 class="text-center"><strong>Techbodia's Assignment</strong></h2>
      </div>

      <div class="container mt-4 mb-4 d-flex justify-content-between">
         <input type="text" v-model="search" id="" class="form-control w-75" placeholder="search countries's name">
         <p><strong>Countries : </strong>{{ ListCountry.length }}</p>
      </div>

      <!-- [Search]  -->

      <!-- <div class="container">
        <pagination v-model="page" :records="300" :per-page="25" @paginate=""/>
      </div> -->

      <!-- [Sort]  -->
   
      <div class="container">
        <button class="btn btn-dark" @click="toggleSortOrder">{{ sortOrderButtonText }}</button>
      </div>

      <!-- [Sort]  -->
      
      <!-- [Box Card]  -->

      <div class="container">
           <div class="row">
              <div class="col-xl-3 col-md-6 col-sm-12" v-for="country in sortedItems">
                  <div class="box-card">
                        <div class="box-img">
                            <img :src=country.flags.png alt="...">
                        </div>
                        <div class="box-description">
                          <div class="box-title text-center">
                            
                            <h5  @click="DetailMore(country)" data-bs-toggle="modal" data-bs-target="#exampleModal"
                              style="width: 200px; 
                              height: 42px; 
                              overflow: hidden; 
                              text-overflow: ellipsis; 
                              white-space: nowrap;">
                            {{ country.name.official }}</h5> 
                          </div>
                            <span><b>cca2 : </b>{{ country.cca2 }}</span>
                            <span class="to-right"><b>cca3 : </b>{{ country.cca3 }}</span>
                            <br>
                            <p class="card-text pt-3" 
                              style="width: 200px; 
                              height: 42px; 
                              overflow: hidden; 
                              text-overflow: ellipsis; 
                              white-space: nowrap;">
                          <b>altSpellings : </b>{{ country.altSpellings }}</p>
                          <p class="card-text"
                              style="width: 200px; 
                              height: 42px; 
                              overflow: hidden; 
                              text-overflow: ellipsis; 
                              white-space: nowrap;"
                            >
                            <b>idd : </b>{{ country.idd }}</p>

                      </div>
                  </div>
               </div>
           </div>
       </div>

      <!-- [Box Card]  -->

       
      <!-- [Model Detail]  -->
     
       <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal Detail</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <h2 class="text-center">{{ name }}</h2>
                <p><b>cca2 : </b>{{ itemDetail.cca2 }}</p>
                <p><b>cca3 : </b>{{ itemDetail.cca3 }}</p>
                <p 
                    style="width: 400px; 
                    height: 42px; 
                    overflow: hidden; 
                    text-overflow: ellipsis; 
                    white-space: nowrap;"
                    >
                
                <b>altSpellings  : </b>{{ itemDetail.altSpellings  }}</p>
                <p 
                    style="width: 400px; 
                    height: 42px; 
                    overflow: hidden; 
                    text-overflow: ellipsis; 
                    white-space: nowrap;"
                    >
                <b>idd   : </b>{{ itemDetail.idd   }}</p>
                <img :src="img_Detail" class="img-detail" alt="">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
      </div>

      <!-- [Model Detail]  -->

        
      <!-- [Loading]  -->

       <Loader v-if="loader"/>

      <!-- [Loading]  -->

    </div>

</template>

<script >

import 'bootstrap/dist/css/bootstrap.css'
import Loader from './components/Loader.vue';
import axios from 'axios';


export default {
   
  components: {
    Loader
  },
   data(){
    return {
         search:'',
         ListCountry: [],
         loader:false,
         itemDetail:[],
         img_Detail: false,
         name:false,
         sortOrder: "asc"
    };
   },
   computed: {
    filteredList() {
      return this.ListCountry.filter(country => {
        return country.name.official.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    sortedItems() {
          let sortedArray = [...this.filteredList];
          sortedArray.sort((x, y) => {
            let comparison = 0;
            if (x.name.official < y.name.official) {
              comparison = -1;
            } else if (x.name.official > y.name.official) {
              comparison = 1;
            }
            return comparison;
          });
          if (this.sortOrder === "desc") {
            sortedArray.reverse();
          }
          return sortedArray;
        },
        sortOrderButtonText() {
          return this.sortOrder === "asc" ? "Sort Countries's Name Descending ⇣⇣" : "Sort Countries's Name Ascending ⇡⇡ ";
        }
  },
   created(){
     this.getListCountry();
     setTimeout(() => {
			this.ListCountry = ListCountry;
		}, 1000)
   },
   methods: {
        toggleSortOrder() {
          this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
       
        },
     async getListCountry() {
       try {
           this.loader = true;
            const response = await axios.get('https://restcountries.com/v3.1/all');
            // console.log(response);
            this.ListCountry = response.data;
            this.loader = false;  

       }catch (error) {
            console.log(error);
       }
     },
     DetailMore(country) {
        // console.log(country)
        this.itemDetail = country
        this.img_Detail = this.itemDetail.flags.png
        this.name = this.itemDetail.name.official

       
     }
   },
   
}

</script>
  


<style>

.box-detail {
  width: 400px;
  height: 400px;
}

.box-card {
  width: 100%;
  height:420px;
  background-color:#FFFEFE;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 15px;
  overflow: hidden;
  margin-top: 20px;
  position: relative;

}

.box-img {
  width: 100%;
  height: 50%;
  background-color: black;
}

.box-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.box-title {
  width: 100%;
  height: 10%;
}

.box-title:hover {
  cursor: pointer;
}

.box-title h5 {
  color: red;
}

.box-description {
  padding: 10px;
}

.to-right {
  position: absolute;
  right: 10px;
}

.img-detail {
  width: 100%;
  height: 200px;
}



</style>
