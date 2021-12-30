const submitBtn = document.getElementById("ipSubmit");
const maps ="https://www.google.com/maps/embed/v1/place?key=AIzaSyCahhqGFfzuUx1UW-tUfJR7gj2R3iFr0-0&q=";

window.onload = function getIpInfo(){
  let resolveIP = localStorage.getItem('ip');
  this.console.log(resolveIP);
  fetch("http://ip-api.com/json/" + resolveIP)
  .then((res) => (res.json()))
  .then((data) => {
    let output = '<h1 class="display-2 mb-4 text-white text-center">IP Info<row class="d-flex"></row></h1>';
    Object.keys(data).forEach(function(key) {
      output += `
        <div class="d-inline-flex p-2 m-2 text-white border border-black">${key} : ${data[key]}</div>
        `;
    });

    let iframe = document.createElement('iframe');
    iframe.style.display = "flex";
    iframe.width="1000";
    iframe.height="450";
    iframe.frameborder="0"; 
    iframe.style="border:0";
    iframe.src = `${maps}${data["lat"]},${data["lon"]}`;
    document.getElementById("map").appendChild(iframe);
  
    
    document.getElementById("output").innerHTML = output;

  });
}
