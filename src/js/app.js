console.log('wat')

// console.log ($)

import $ from 'jquery';

var forEach = function(arr,cb){for(var i = 0; i < arr.length; i++){ cb(arr[i], i, arr)  } }
// // var concertsEl=document.querySelector(".concerts-container")
var appContainerEl= document.querySelector("#app-container")

//
function controllerRouter (){
  var currentRoute= window.location.hash
  console.log(currentRoute)

  if (currentRoute==="#carpools"){
    $.getJSON('http://apis.is/concerts').then(function(serverRes){
      console.log(serverRes.results)
      var htmlTemplate= createPageTemplate(serverRes.results, "concerts")
      appContainerEl.innerHTML=htmlTemplate
    })
    return
  }



  // if (currentRoute==="#carpools"){
  //   $.getJSON('http://apis.is/concerts').then(function(serverRes){
  //     var htmlTemplate= createPageTemplate(serverRes.results, "carpools")
  //     appContainerEl.innerHTML=htmlTemplate
  //   })
  //   return
  // }
  //
  // if (currentRoute==="#flights"){
  //   $.getJSON('http://apis.is/concerts').then(function(serverRes){
  //     var htmlTemplate= createPageTemplate(serverRes.results, "flights")
  //     appContainerEl.innerHTML=htmlTemplate
  //   })
  //   return
  // }

function createPageTemplate(dataArray, title){
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
    </div>
`
  })

  return `
  <h1> YES </h1>
  <div class= "what-container">
    ${bigHTMLStr}
    </div>
    `
}
}


window.addEventListener('hashchange', controllerRouter )
controllerRouter()
