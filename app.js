const location_element=document.querySelector('.location');
const inputField=document.getElementById("inputField");
const searchButton=document.querySelector(".button")
const city_h1=document.getElementById("city_h1");
const temp_h1=document.getElementById("temp_h1");
const cloudIcon=document.getElementById("icon");
const cloudDescription=document.getElementById("cloudDescription")
const humidity_p=document.getElementById("humidity_p");
const windspeed_p=document.getElementById("windSpeed_p");

//https://source.unsplash.com/1600x900/?Chennai
const weather={
    "API":"a5810fc9d2b5de67b5415fac0cf6c07e",
    fetchLat:function(lat,long){
        fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=a26b661efecb442796247bd8a7de99f1`)
        .then(response => response.json())
        .then(result => weather.fetchWeather(result.features[0].properties.city))
        .catch(error => console.log('error', error));
    },
    knowLocation:function(){
        let fetchLat=weather.fetchLat;
        return navigator.geolocation.getCurrentPosition((success)=>{
            let coords=success.coords;
            lat=coords.latitude;
            long=coords.longitude;
            fetchLat(lat,long)
        },(error)=>{
            alert(error.message);
        });
    },
    fetchWeather:function(city){
            fetch("https://api.openweathermap.org/data/2.5/weather?q="
            +city
            +"&units=metric&appid="
            +this.API)
            .then((res)=>{
                if(res.ok){
                    return res.json()
                }else{
                    alert(res.status + " Not found." + " Please Enter Correct Spelling Of City or State or Country.");
                }
            })
            .then((data)=>this.displayWeather(data))   
    },
    displayWeather(data){
        const { name }=data;
        const { humidity,temp }=data.main;
        const { speed }=data.wind;
        const { icon,description }=data.weather[0];
        city_h1.innerText="Weather in "+name;
        temp_h1.innerText=temp+"°C";
        cloudIcon.src="https://openweathermap.org/img/wn/"+icon+".png"
        humidity_p.innerText="Humidity: "+humidity+"%";
        windspeed_p.innerText="Wind Speed: "+speed+"Km/h";
        cloudDescription.innerText=description;
        document.body.style.backgroundImage="url('https://source.unsplash.com/1600x900/?"+name+"')";
    },
    search(){
        this.fetchWeather(inputField.value);
    }
}
searchButton.addEventListener('click',()=>{
    if(inputField.value!==''){
        weather.search()
    }else{
        alert('Please Enter Your City or State or Country')
    }
})

inputField.addEventListener('keyup',(event)=>{
    if(event.code!="Enter") return
    if(event.code==="Enter" &&inputField.value!==''){
        weather.search()
    }else{
        alert('Please Enter Your City or State or Country')
    }
})
location_element.addEventListener('click',weather.knowLocation)
weather.fetchWeather("trichy")
