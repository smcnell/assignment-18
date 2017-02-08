console.log('wat')

// console.log ($)

import $ from 'jquery';

var forEach = function(arr,cb){for(var i = 0; i < arr.length; i++){ cb(arr[i], i, arr)  } }
// // var concertsEl=document.querySelector(".concerts-container")
var informationEl= document.querySelector(".information-giant")

//
function controllerRouter (){
  var currentRoute= window.location.hash
  console.log(currentRoute)

  if (currentRoute==="#concerts"){
    $.getJSON('http://apis.is/concerts').then(function(serverRes){
      console.log(serverRes.results)
      var htmlTemplate= createPageTemplateConcerts(serverRes.results, "concerts")
      informationEl.innerHTML=htmlTemplate
    })
    return
  }

  if (currentRoute==="#carpools"){
    $.getJSON('http://apis.is/rides/samferda-drivers/').then(function(serverRes){
      var htmlTemplate= createPageTemplateCarpools(serverRes.results, "carpools")
      informationEl.innerHTML=htmlTemplate
    })
    return
  }


  if (currentRoute==="#flights"){
    var theAways = ''
    var theToos = ''
    $.getJSON('http://apis.is/flight?language=en&type=departures').then(function(serverRes){
      theAways = serverRes.results
      // var htmlTemplate= createPageTemplateFlights("BOB", serverRes.results, "flights")
      // informationEl.innerHTML=htmlTemplate

      $.getJSON('http://apis.is/flight?language=en&type=arrivals').then(function(serverRes){
        theToos = serverRes.results
        // var htmlTemplate= createPageTemplateFlights(serverRes.results, "HI", "flights")
        // informationEl.innerHTML=htmlTemplate
        createPageTemplateFlights(theAways, theToos, "flights")
      })
    })
    // return
  }

function createPageTemplateConcerts(dataArray, title){
  var bigHTMLStr= ''

  forEach(dataArray, function(concertObj){
    var name= concertObj.eventDateName
    var venue= concertObj.eventHallName
    var date= concertObj.dateOfShow
    var img= concertObj.imageSource
    bigHTMLStr+= `
      <div class="row">
        <div class="col-sm-4 col-md-4">
          <div class="thumbnail">
            <img src="${img}" alt="...">
            <div class="caption">
              <h3>${name}</h3>
              <p>${venue}</p>
              <p>${date}</p>
            </div>
          </div>
        </div>
`
  })


  return `
  <h1> Concerts </h1>
  <div class= "concerts-container">
    ${bigHTMLStr}
    </div>
    `
}

function createPageTemplateCarpools(dataArray, title){
  var bigCarpoolHTMLStr= ''

  forEach(dataArray, function(carpoolObj){
    console.log(carpoolObj)
    var time= carpoolObj.time
    var from= carpoolObj.from
    var to= carpoolObj.to
    bigCarpoolHTMLStr+= `

			<tr>
				<td>${time}</td>
				<td>${from}</td>
        <td>${to}</td>
			</tr>

`
  })

  return `
  <div class= "carpool-container">
  <h1> Carpools </h1>
  <div class= "carpool-info">
  <table class= "table carpool-table">
    <tr>
      <th> Time of Departure </th>
      <th>From</th>
      <th> To</th>
    </tr>
  ${bigCarpoolHTMLStr}
  		</table>
  </div>
  </div>
  `

    }
    function createPageTemplateFlights(inputDeparture, inputArrivals, title){
      var arrivalString= ''
      var departureString=''
      var bigHTMLStringFlight=''

      bigHTMLStringFlight+= `
        <div class= "titleFlights">
          <h1> Flights </h1>
        </div>
        <div class= "flight-info-container">
          <div class= "departures">
            <h2> Departures </h2>
            <table class="table departure-table">
              <tr>
                <th> Date </th>
                <th>Departure Time</th>
                <th> Destination</th>
                <th> Airline</th>
              </tr>
      `
      // console.log('The Input Departure Arg')
      // console.log(inputDeparture)
          forEach(inputDeparture, function(depObj){
                  console.log(depObj)
                  var dates= depObj.date
                  var depTime= depObj.plannedArrival
                  var destination= depObj.to
                  var airlineTraveled= depObj.airline
                  departureString+= `

                    <tr>
                      <td>${dates}</td>
                      <td>${depTime}</td>
                      <td>${destination}</td>
                      <td>${airlineTraveled}</td>
                    </tr>


              `
          })

    bigHTMLStringFlight +=   `
          ${departureString}
                </table>
        </div>
        <div class= "arrivals">
          <h2> Arrivals </h2>
          <table class= "table arrival-table">
            <tr>
              <th> Date </th>
              <th>Arrival Time</th>
              <th> Origin</th>
              <th> Airline</th>
            </tr>
            `
            forEach(inputArrivals, function(arrivalObj){
              console.log(arrivalObj)
              var date= arrivalObj.date
              var timeLand= arrivalObj.plannedArrival
              var origin= arrivalObj.from
              var airline= arrivalObj.airline
              arrivalString+= `

                <tr>
                  <td>${date}</td>
                  <td>${timeLand}</td>
                  <td>${origin}</td>
                  <td>${airline}</td>
                </tr>

            `
            })

    bigHTMLStringFlight +=   `
      ${arrivalString}
            </table>
        </div>
      </div>


      `

      informationEl.innerHTML = bigHTMLStringFlight
      return


        }
}


window.addEventListener('hashchange', controllerRouter() )
// controllerRouter()
