let shows=[];
document.addEventListener("DOMContentLoaded", function() {
  init();
});
function getRandomInt(max) {
    return Math.floor(Math.random()*max)+1;
  }

function win(result){ 
    document.getElementById("rating1").textContent = shows[1];
    document.getElementById("rating2").textContent = shows[3]; 
    if(shows[1]==shows[3])
    {   m=2;
        rating1.style.color = "green";
        title1.style.color = "green";
        rating2.style.color = "green";
        title2.style.color = "green";
    }
    if(shows[1]>shows[3]){
        m=1;
        rating1.style.color = "green";
        title1.style.color = "green";
        rating2.style.color = "red";
        title2.style.color = "red";
    }
    else if(shows[1]<shows[3]) {
        m=0;
        rating1.style.color = "red";
        rating2.style.color = "green";
        title1.style.color = "red"; 
        title2.style.color = "green";
    }
    
    setTimeout(() => {
        if(m==result || m==2){
            if (confirm("You win! Want to play again?")) {
                init();
            }
        } 
        else {
            if (confirm("You lose! Want to play again?")) {
                init();
            }
        }
    }, 100);
}

// function init(){
//     rating1.style.color = "black";
//     rating2.style.color = "black";
//     title1.style.color = "black";
//     title2.style.color = "black";
//     shows=[];
//     x=0;  
//     for (let  i= 1; i < 3; i++){  
//     n=1000;
//     ant=x;
//     x=getRandomInt(n);
//     while(x==ant)
//     {x=getRandomInt(n);}
//     fetch(`https://api.tvmaze.com/shows/`+x) //URL de la llamada 
//       //Si ha ido correcto, obtiene el json de la respuesta
//       .then(response => response.json())
//       //Si hace correctamente el parseo, mapea los campos de la respuesta con los elementos HTML
//       .then(data => {
//         // Actualizar la interfaz con los datos del producto
//         let {image, name,rating,summary,genres} = data;
//         let {average}=rating;
//         shows.push(average.value);
//         shows.push(average);
//         document.getElementById(`thumbnail`+i).src = image.medium;
//         document.getElementById(`title`+i).textContent = name;
//         document.getElementById(`description`+i).innerHTML = summary;
//         document.getElementById(`rating`+i).textContent = "?"
//         document.getElementById(`category`+i).textContent =genres;   
//       })
//       //SI hay algún error, entonces loggea el mensaje
//       .catch(error => console.error("Error al obtener los datos del producto:", error));
//         }
      
// }

function init(){
    rating1.style.color = "black";
    rating2.style.color = "black";
    title1.style.color = "black";
    title2.style.color = "black";
    shows = [];
    x = 0;
    let fetchPromises = [];

    for (let i = 1; i < 3; i++) {
        n = 1000;
        ant = x;
        x = getRandomInt(n);
        while (x == ant) {
            x = getRandomInt(n);
        }
        fetchPromises.push(
            fetch(`https://api.tvmaze.com/shows/` + x)
                .then(response => response.json())
                .then(data => {
                    let { image, name, rating, summary, genres } = data;
                    let { average } = rating;
                    shows.push(average.value);
                    shows.push(average);
                    document.getElementById(`thumbnail` + i).src = image.medium;
                    document.getElementById(`title` + i).textContent = name;
                    document.getElementById(`description` + i).innerHTML = summary;
                    document.getElementById(`rating` + i).textContent = "?";
                    document.getElementById(`category` + i).textContent = genres;
                })
                .catch(error => console.error("Error al obtener los datos del producto:", error))
        );
    }

    Promise.all(fetchPromises).then(() => {
        console.log("Both shows have been updated");
    });
}