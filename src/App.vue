
<template>
    <div>
      
      <!-- [Search]  -->

      <div class="container mt-4 mb-4">
         <input type="text" v-model="search" id="" class="form-control" placeholder="search country's name">
      </div>

      <!-- [Search]  -->

      <!-- <div class="container">
        <pagination v-model="page" :records="300" :per-page="25" @paginate="getListCountry()"/>
      </div> -->

      <!-- [Sort]  -->
   
      <div class="container">
        <button class="btn btn-dark" @click="sortBy1('cca2')">Sort ( A-Z )</button> &nbsp;&nbsp;
        <button class="btn btn-dark" @click="sortBy2('cca2')">Sort ( Z-A )</button>
      </div>

      <!-- [Sort]  -->
      
      <!-- [Box Card]  -->

      <div class="container">
           <div class="row">
              <div class="col-xl-3 col-md-6 col-sm-12" v-for="country in filteredList">
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

                            <div class="box-btn">
                              <button class="btn btn-warning" @click="DetailMore(country)" data-bs-toggle="modal" data-bs-target="#exampleModal" >Detail more</button>
                          </div>
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
                <p><b>cca2 : </b>{{ itemDetail.cca2 }}</p>
                <p><b>cca3 : </b>{{ itemDetail.cca3 }}</p>
                <p><b>altSpellings  : </b>{{ itemDetail.altSpellings  }}</p>
                <p><b>idd   : </b>{{ itemDetail.idd   }}</p>
                <img :src="img_Detail" alt="">
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
         page: 1
    };
   },
   computed: {
    filteredList() {
      return this.ListCountry.filter(country => {
        return country.name.official.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
   created(){
     this.getListCountry();
     setTimeout(() => {
			this.ListCountry = ListCountry;
		}, 1000)
   },
   methods: {
    sortBy1(prop){
       this.ListCountry.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
     },
     sortBy2(prop){
       this.ListCountry.sort((a,b) => a[prop] > b[prop] ? -1 : 1)
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
  height: 500px;
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

.box-btn {
  width: 100%;
  height: 40px;
}

</style>
