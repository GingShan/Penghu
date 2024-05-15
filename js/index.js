$(function () {
    let url = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWA-4A477135-0E1B-4995-B08C-45F0E1FBAB85&limit=1&StationId=467350&StationName=%E6%BE%8E%E6%B9%96';
    async function getWeather() {
        try {
            let weatherData = await fetch("https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWA-4A477135-0E1B-4995-B08C-45F0E1FBAB85&format=JSON&StationId=467350&StationName=%E6%BE%8E%E6%B9%96");
            let data = await weatherData.json()
            let getTemp = data.records.Station[0].WeatherElement.AirTemperature;
            let getWeather = data.records.Station[0].WeatherElement.Weather;
            let imageUrlSun = "../images/sunny.png";
            let imageUrlCloud = "../images/clouds.png";
            console.log(data);
            console.log(getTemp);
            document.getElementsByClassName("daliyTemp")[0].innerHTML = "現在溫度" + getTemp + "℃";

            if (getTemp >= 25) {
                $(".weatherImg").css("background-image", 'url(' + imageUrlSun + ')');
            }
            if (getTemp <= 24) {
                $(".weatherImg").css("background-image", 'url(' + imageUrlCloud + ')');
            }
            if (getWeather == "晴") {
                $(".weatherImg").css("background-image", 'url(' + imageUrlSun + ')');
            }
            if (getWeather == "多雲" || getWeather == "陰") {
                $(".weatherImg").css("background-image", 'url(' + imageUrlCloud + ')');
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    getWeather()

    $(".weatherBox .btnTxt").click(()=>{
        $(".btnTxt").css("opacity","0");
        $(".btnTxt").css("display","none");
        $(".weatherBox").removeClass("unshow");
        $(".weatherBox").addClass("show");
        if($(".weatherBox").hasClass("show")){
            setTimeout(() => {
                $(".weatherBox .closeBtn").fadeIn();
                $(".weatherBox .weatherInfo .weatherImg").fadeIn();
                $(".weatherBox .weatherInfo .daliyTemp").fadeIn();
            }, 1000);
        }
    })
    $(".weatherBox .closeBtn").click(()=>{
        $(".weatherBox .weatherInfo .weatherImg").fadeOut("fast");
        $(".weatherBox .weatherInfo .daliyTemp").fadeOut("fast");
        $(".weatherBox .closeBtn").fadeOut("fast");
        setTimeout(() => {
            $(".weatherBox").removeClass("show");
            $(".btnTxt").css("opacity","1");
            $(".btnTxt").css("display","block");
            $(".weatherBox").addClass("unshow");
        }, 500);
    })
})