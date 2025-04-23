const recipeSite = [
    ["Sesame Noodles with Chicken", "./assets/img/cardImgs/sesame-noodles-with-chicken-and-cucumbers.webp", "card-easy", "Easy","Quick","30 min"],
    ["Spanakoptia", "./assets/img/cardImgs/spanakopita.webp", "card-medium", "Medium","Spring","60 min"],
    ["Vegetarian Chili", "./assets/img/cardImgs/vegetarian-chili.webp", "card-hard", "Hard","Vegan","4 hours"],
    ["Vegetarian Soft Tacos", "./assets/img/cardImgs/vegetarian-soft-tacos.webp", "card-easy", "Easy","Quick","20 min"],
    ["Gluten-Free Cornbread", "./assets/img/cardImgs/gluten-free-cornbread.webp", "card-medium", "Medium","Bread","50 min"],
    ["Greek Salad", "./assets/img/cardImgs/greek-salad.webp", "card-easy", "Easy","Spring","20 min"],
    ["Rainbow Birthday Cake", "./assets/img/cardImgs/rainbow-birthday-cake.webp", "card-hard", "Hard","Birthday","3 hours"],
    ["Baked Kale Chips", "./assets/img/cardImgs/baked-kale-chips.webp", "card-easy", "Easy","Quick", "25 min"],
    ["Apple Cinnamon Pancakes", "./assets/img/cardImgs/apple-cinnamon-pancakes.webp", "card-easy", "Easy","Birthday","30 min"],
    ["Stacked Enchiladas", "./assets/img/cardImgs/stacked-enchiladas.webp", "card-easy", "Easy","Quick","30 min"],
    ["Pasta Primavera", "./assets/img/cardImgs/pasta-primavera.webp", "card-easy", "Easy","Vegan", "60 min"],
    ["Carrot Ginger Soup", "./assets/img/cardImgs/carrot-ginger-soup.webp", "card-medium", "Medium","Spring","35-40 min"],
    ["Better Sloppy Joes", "./assets/img/cardImgs/sloppy-joes.webp", "card-easy", "Easy","Quick","20 min"],
    ["Epic Vegetable Pie", "./assets/img/cardImgs/vegetable-pie.webp", "card-easy", "Easy","Vegan","1 hour 25 min"],
    ["Better Banana Bread", "./assets/img/cardImgs/banana-bread.webp", "card-medium", "Medium","Bread","60 min"],
    ["Cinnamon Pinwheels", "./assets/img/cardImgs/cinnamon-pinwheels.webp", "card-easy", "Easy","Birthday","1 hour 15 min"],
    ["Maple Pecan Ice Cream", "./assets/img/cardImgs/maple-pecan-ice-cream.webp", "card-easy", "Easy","Desserts","8 hours 30 min"],
    ["Baked Avocado Fries", "./assets/img/cardImgs/baked-avocado-fries.webp", "card-medium", "Medium","Apetizers", "40 min"],
    ["Homemade Tortilla Chips", "./assets/img/cardImgs/homemade-tortilla-chips.webp", "card-easy", "Easy","Apetizers","25 min"],
    ["Homemade Hot Chocolate Mix", "./assets/img/cardImgs/homemade-hot-chocolate-mix.webp", "card-easy", "Easy","Birthday", "10 min"],
    ["Spinnach Artichoke Dip", "./assets/img/cardImgs/spinach-artichoke-dip.webp", "card-medium", "Medium","Apetizers","35 min"],
    ["Blueberry Mango Smoothie", "./assets/img/cardImgs/blueberry-mango-smoothie.webp", "card-easy", "Easy","Drinks","5 min"],
    ["Overnight Oatmeal", "./assets/img/cardImgs/overnight-oatmeal.webp", "card-easy", "Easy","Breakfast","5 min"],
    ["Country Whole Wheat Bread", "./assets/img/cardImgs/country-whole-wheat-bread.webp", "card-easy", "Easy","Bread","3 hours 20 min"]
];


const recipeContainers = {
  
  ".all-recipes": () => true, 
  
  // Denne function har ingen argumenter og derfor altidreturner true, det betyder at alle opskrifter vises i den container der kar class .all-recipes, den bruges som en catch-all

  ".vegan-recipes": r => r.includes("Vegan"), 
  
  //her defineres en funktion med parameter r( array med data om opskrift). r.includes("vegan") tjekker for om der fedes vegan i et array, dette returner true hvis der er vegan, dette funktion viser hun veganske opskrifter på den definerede side (i dette tilfelde .vegan-recipes) det samme foregår i de nedståene funktioner.

  ".quick-recipes": r => r.includes("Quick"),
  ".spring-recipes": r => r.includes("Spring"),
  ".birthday-recipes": r => r.includes("Birthday"),
};
const homeContainer = document.querySelector(".home-recipes");
//henter elementet med class .home-recipes fra html

// Tamplate til opskrift cortne, dette laver opskrift card ud fra htmlen, ved brug af rShow som er array med opskrift infoer. ${rShow[2]} dette sætter de forskellige informationer ind 
function createRecipeCard(rShow) {
  
  return `
 
    <article>
    <a href="sesamNoodles.html" class="recipe-link">
      <div class="${rShow[2]}">
        <p class="tags">${rShow[3]}</p> 
        
        <div class="imgAndText">
          <img src="${rShow[1]}" alt="${rShow[0]}" />
           </a>
          <section>
            <h3>${rShow[0]}</h3>
            <div class="tagsOgIndhild">
              <p>${rShow[4]}</p>
              <p>${rShow[5]}</p>
              
              <!-- Heart SVG -->
            <div class="heart-icon">
              <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 280.1 304.2">
              <!-- Generator: Adobe Illustrator 29.4.0, SVG Export Plug-In . SVG Version: 2.1.0 Build 152)  -->
              <path class="st0" d="M253.6,146.1l-47.6,47.2c-.5.5.6-.3,0,0l-65.1,65.2-68.3-68.3c-.1,0-.3-.2-.4-.3l-45.5-45.5c-21.4-21.4-21.4-56.1,0-77.5,27.9-27.9,73.2-27.9,101.2,0l14.4,14.4,11.6-11.6c27.6-27.6,72.2-27.6,99.8,0,21.1,21.1,21.1,55.3,0,76.5Z"/>
              </svg>
            </div>
          </div>
            </div>
          </section>
        </div>
      </div>
    </article>
    
  `;
}
//if (homeContainer)tjekker om elementet .home-recipes finde i dom, 

if (homeContainer) {
  const easy = recipeSite.find(r => r[3] === "Easy"); // dette bruges til at finde den første opskrift på recipeSite som har sværhedsgrad easy ved bruge array.find(). r er et array og r[3] er sværhedsgraden, array starter fra 0 så sværhedsgrad er på plads 4 istedet for 3 - det samme for medium og hard 
  const medium = recipeSite.find(r => r[3] === "Medium");
  const hard = recipeSite.find(r => r[3] === "Hard");
// her laver vi et array med de 3 opskrifter og looper i gennem dem med forEach.
  [easy, medium, hard].forEach(recipe => { 
    if (recipe) {
      homeContainer.innerHTML += createRecipeCard(recipe);
      //her tjkker vi om recipe findes ( hvi ikke den gør vil der stå undifined). Hvis recipe findes Kaldes funktionen createRecipeCard(recipe), som returnerer en HTML-string med opskriften.Den HTML tilføjes til homeContainer.innerHTML med +=, så den lægger oveni eksisterende indhold.
      // Alt i alt dette kode viser en opskrift fra hver sværhedgrad i boksen .home-recipes - der er nok en nemmere måde at gøre det her på men det her var nemmest at forstå
    }
  });
}

// Render logic
for (const [selector, filterFn] of Object.entries(recipeContainers)) {
  const container = document.querySelector(selector);
  if (container) {
    recipeSite.forEach(recipe => {
      if (filterFn(recipe)) {
        container.innerHTML += createRecipeCard(recipe);
      }
    });
  }
}
  

const domain = "https://api.finnw.dk/";
const postsEndpoint = "wp-json/wp/v2/posts";
const getRealImageUrls = "&acf_format=standard";
const authEndpoint = "wp-json/jwt-auth/v1/token";

const resultEl = document.querySelector(".result");

const desiredRecipeSlug = "sesame-noodles-with-chicken";

init();

// kalder init og funktionen er asynkron hvilket betyder at den kan bruge await til at vente på noget fx et API kald
async function init() {
  // dette er try-catch metoden, Alt i try bliver forsøgt udført, hvis noget slår fejl, hopper den ned i catch
    try {
      // Venter på at få token
        const token = await getToken();
        // Henter opskrift baseret på dens slug
        const recipe = await getRecipeBySlug(token, desiredRecipeSlug);
        // hvis den kanne finde "recipe" ud fra token, desiredRecipeSlug, så hvis den på siden
        if (recipe) {
            renderRecipes([recipe]);
            // hvis ikke, så kommer med fejlbeskeden
        } else {
            resultEl.innerHTML = "Opskriften kunne ikke findes.";
        }
    } catch (err) {
        console.log('err:', err);
        //alert ("Der gik noget galt, fuck hvor nederen?!");
        resultEl.innerHTML = "Der gik noget galt, fuck hvor nederen?!";
    }
}

async function getToken() {
    const userInfo = {
        username: "guest",
        password: "0LiZ E33E zI9i Ay8r 0Gh9 q5SV"
    };

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    };

    try {
        const res = await fetch(domain + authEndpoint, options);
        const authRespone = await res.json();
        console.log('authRespone:', authRespone);
        return authRespone.token;
    } catch (err) {
        console.log('err:', err);
        resultEl.innerHTML = "Den der token der, den kan vi sgu ikke finde fyr";
    }
}

async function getRecipeBySlug(token, slug) {
    const options = {
        headers: {
            Authorization: "Bearer " + token
        }
    };
    const res = await fetch(`${domain}${postsEndpoint}?slug=${slug}${getRealImageUrls}`, options);
    const recipes = await res.json();
    return recipes.length > 0 ? recipes[0] : null;
}

// funktionen hedder renderRecipes
function renderRecipes(data) {
    resultEl.innerHTML = "";

    console.log("Fetched recipes:", data);
// Sørger for at (data) er en liste og ikke vises som tom. Hvis den ikke kan vises kommer der en fejl besked senere
    if (Array.isArray(data) && data.length > 0) {
      // loop gennem hver recipe i data
        data.forEach(recipe => {
          // henter opskriftens "acf" felt fra WordPress
            const acf = recipe.acf || {};
            console.log("ACF:", acf);
// Tilføjer HTML article til resultEl
// Object.values henter alle værdierne ud som en liste. med .join sætter det dem sammen til en tekststreng hvor hver ingrediens / fremgangsmåde bliver adskildt af et <br> tag
// Her bruges også .filter(val => val.trim()!=="") Dette gør at den fjerne de tomme fælter. Fx i mit wordpress har jeg opsat til 30 steps, men en opskrift har måske kun  16 steps. Så i stedet for der er 14 ekstra tomme fælter, så trimmer den dem væk.
            resultEl.innerHTML += `
            <article class="recipe">
                <h2>${recipe.title.rendered}</h2>
                <img src="${acf.opskrift_billede?.url}" alt="Opskrift billede" />
        
                <div class="columns">
                    <div>
                        <h3>Ingredienser</h3>
                        <p>${Object.values(acf.ingredienser).filter(val => val.trim() !== "").join("<br>")}</p>
                    </div>
                    <div>
                        <h3>Fremgangsmåde</h3>
                        <p>${Object.values(acf.fremgangsmaade).filter(val => val.trim() !== "").join("<br>")}</p>
                    </div>
                </div>
        
                <p><strong>Varighed:</strong> ${acf.varighed_i_minutter} min</p>
            </article>
        `;
        });
    } else {
        resultEl.innerHTML = "<p>Ingen opskrift fundet.</p>";
    }
}


// Hjerter - like knappen
document.addEventListener('DOMContentLoaded', () => {
  const heartIcons = document.querySelectorAll('.heart-icon');

  heartIcons.forEach(heart => {
    heart.addEventListener('click', () => {
      
      heart.classList.toggle('filled');
    });
  });
});

// Når man trykker på det med class filter.header, så aktiveres class "active" der gør at den folder ud
document.querySelectorAll('.filter-header').forEach(header => {
  header.addEventListener('click', () => {
    header.classList.toggle('active');
  });
});