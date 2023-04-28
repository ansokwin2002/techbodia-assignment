

<template>


<div class="box_opacity">
    <div class="loader"></div>
</div>


</template>

<style>

.box_opacity {
    width: 100%;
    height: 100vh;
    background-color: #00000065;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.loader {
  display: block;
  position: relative;
  height: 32px;
  width: 200px;
  background: #fff;
  border: 2px solid #fff;
  color: rgb(223, 60, 60);
  overflow: hidden;
}

.loader::before {
  content: '';
  background: rgb(223, 60, 60);
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  animation: loading_302 10s linear infinite;
}

.loader:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 18px;
  line-height: 32px;
  color: rgb(0,255,255);
  mix-blend-mode: difference;
  animation: percentage_302 10s linear infinite;
}

@keyframes loading_302 {
  0% {
    width: 0
  }

  100% {
    width: 100%
  }
}

@keyframes percentage_302 {
  0% {
    content: "0%"
  }

  5% {
    content: "5%"
  }

  10% {
    content: "10%"
  }

  20% {
    content: "20%"
  }

  30% {
    content: "30%"
  }

  40% {
    content: "40%"
  }

  50% {
    content: "50%"
  }

  60% {
    content: "60%"
  }

  70% {
    content: "70%"
  }

  80% {
    content: "80%"
  }

  90% {
    content: "90%"
  }

  95% {
    content: "95%"
  }

  96% {
    content: "96%"
  }

  97% {
    content: "97%"
  }

  98% {
    content: "98%"
  }

  99% {
    content: "99%"
  }

  100% {
    content: "100%"
  }
}
  
  

</style>