function create (elediv, eleclass, eleid){
    var item = document.createElement(elediv);
    item.setAttribute('class',eleclass);
    item.setAttribute('id', eleid);
    return item;
}

var container = create('div','container-lg')
var row = create('div','row my-3');

let test = [];

var t = fetch('https://restcountries.eu/rest/v2/all').then((response)=>{
        return response.json();
}).then((result)=>{
        console.log(result);
        foo(result);
}).catch((err)=>{
    console.log(err);
});

function foo (answer){

    answer.forEach(element => {

        var col = create('div', 'col-lg-4 col-sm-12 my-2');

        col.setAttribute('style','text-align:center; background:  rgb(235, 221, 245)')
    
        var card = create('div','card my-2');
        card.setAttribute('style','background:  rgb(248, 227, 196)')

        var cardheader = create('div', 'card-header bg-dark text-white');
        cardheader.innerHTML=element.name;
    
        var img = create('img', 'card-img-top');
        img.setAttribute('src',element.flag)
        img.setAttribute('class', 'img-fluid mx-3 my-3');
        img.setAttribute('style', 'height: 200px; width: 315px')
    
        var cardbody = create('div', 'card-body');
    
        var cardtext1 = create('p', 'card-text');
        cardtext1.innerHTML = 'Capital : '+element.capital;
    
        var cardtext2 = create('p', 'card-text');
        cardtext2.innerHTML = 'Region : '+element.region;
    
        var cardtext3 = create('p', 'card-text');
        cardtext3.innerHTML = 'countrycode : '+element.cioc;

        var cardtext4 = create('p', 'card-text');
        cardtext4.innerHTML = 'Lat Lng : '+element.latlng;

        var button = create('a', 'btn btn-primary');
        button.innerHTML = "Click for weather";

        button.addEventListener('click',()=>{
            var t = fetch('https://api.openweathermap.org/data/2.5/weather?q='+element.capital+'&appid=2fb38d004ce2dda794090797a85304de').then((response)=>{
            return response.json();
        }).then((result)=>{
            let t = parseFloat(result.main.temp - 273.15).toFixed(2);
            let tt = parseFloat(result.main.feels_like - 273).toFixed(2);
            alert('Temperature: '+t+' Degree Celcius'+'\n'+'Feels Like: '+tt+' Degree Celcius');
        }).catch((err)=>{
            console.log(err);
        })
        }); 
    
        cardbody.append(cardtext1, cardtext2, cardtext3, cardtext4, button);
        card.append(cardheader, img, cardbody);
        col.append(card);
        row.append(col);
    
    });

};

container.append(row);
document.body.append(container);
