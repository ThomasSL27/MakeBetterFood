const recipeSite = [
    ["Sesame Noodles with Chicken", "./assets/img/cardImgs/sesame-noodles-with-chicken-and-cucumbers.png", "card-easy", "Easy"],
    ["Spanakoptia", "./assets/img/cardImgs/spanakopita.png", "card-medium", "Medium"],
    ["Vegetarian Chili", "./assets/img/cardImgs/vegetarian-chili.png", "card-hard", "Hard"],
    ["Vegetarian Soft Tacos", "./assets/img/cardImgs/vegetarian-soft-tacos.png", "card-easy", "Easy"],
    ["Gluten-Free Cornbread", "./assets/img/cardImgs/gluten-free-cornbread.png", "card-medium", "Medium"],
    ["Greek Salad", "./assets/img/cardImgs/greek-salad.png", "card-easy", "Easy"],
    ["Rainbow Birthday Cake", "./assets/img/cardImgs/rainbow-birthday-cake.png", "card-hard", "Hard"],
    ["Baked Kale Chips", "./assets/img/cardImgs/baked-kale-chips.png", "card-easy", "Easy" ],
    ["Apple Cinnamon Pancakes", "./assets/img/cardImgs/apple-cinnamon-pancakes.png", "card-easy", "Easy"],
    ["Stacked Enchiladas", "./assets/img/cardImgs/stacked-enchiladas.png", "card-easy", "Easy"],
    ["Pasta Primavera", "./assets/img/cardImgs/pasta-primavera.png", "card-easy", "Easy"],
    ["Carrot Ginger Soup", "./assets/img/cardImgs/carrot-ginger-soup.png", "card-medium", "Medium"],
    ["Better Sloppy Joes", "./assets/img/cardImgs/sloppy-joes.png", "card-easy", "Easy"],
    ["Epic Vegetable Pie", "./assets/img/cardImgs/vegetable-pie.png", "card-easy", "Easy"],
    ["Better Banana Bread", "./assets/img/cardImgs/banana-bread.png", "card-medium", "Medium"],
    ["Cinnamon Pinwheels", "./assets/img/cardImgs/cinnamon-pinwheels.png", "card-easy", "Easy"],
    ["Maple Pecan Ice Cream", "./assets/img/cardImgs/maple-pecan-ice-cream.png", "card-easy", "Easy"],
    ["Baked Avocado Fries", "./assets/img/cardImgs/baked-avocado-fries.png", "card-medium", "Medium"],
    ["Homemade Tortilla Chips", "./assets/img/cardImgs/homemade-tortilla-chips.png", "card-easy", "Easy"],
    ["Homemade Hot Chocolate Mix", "./assets/img/cardImgs/homemade-hot-chocolate-mix.png", "card-easy", "Easy"],
    ["Spinnach Artichoke Dip", "./assets/img/cardImgs/spinach-artichoke-dip.png", "card-medium", "Medium"],
    ["Blueberry Mango Smoothie", "./assets/img/cardImgs/blueberry-mango-smoothie.png", "card-easy", "Easy"],
    ["Overnight Oatmeal", "./assets/img/cardImgs/overnight-oatmeal.png", "card-easy", "Easy"],
    ["Country Whole Wheat Bread", "./assets/img/cardImgs/country-whole-wheat-bread.png", "card-easy", "Easy"]
];


const recipeShow = document.querySelector(".all-recipes");
if (recipeShow) {
    recipeSite.forEach(function(rShow){
    recipeShow.innerHTML +=`
    <article>
            <div class=${rShow[2]}>
              <p>${rShow[3]}</p>
              <div class="imgAndText">
                <img
                  src="${rShow[1]}"
                  alt=""
                />
                <h3>${rShow[0]}</h3>
              </div>
            </div>
          </article>
    `
    })
}

document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      header.classList.toggle('active');
  
      const content = header.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
        header.querySelector("span").textContent = "+";
      } else {
        content.style.display = "block";
        header.querySelector("span").textContent = "-";
      }
    });
  });
  


const domain = "https://api.finnw.dk/";
const postsEndpoint = "wp-json/wp/v2/posts";
const getRealImageUrls = "&acf_format=standard";
const authEndpoint = "wp-json/jwt-auth/v1/token";

const resultEl = document.querySelector(".result");

init();

async function init() {
    try {
        const token = await getToken();
        const recipes = await getPublicRecipes(token);
        renderRecipes(recipes);

        // Lyt efter ændringer på radiobuttons
        const radioButtons = document.querySelectorAll('.tilberedningstid');
        radioButtons.forEach(button => {
            button.addEventListener('change', async (event) => {
                // henter den valgte værdi fra radioknap
                const selectedValue = event.target.value;
                // kalderefter getsPrivateRecipes som henter opskrifterne med selectedValue
                const recipes = await getPublicRecipes(token, selectedValue);
                // vises på siden
                renderRecipes(recipes);
            });
        });

    } catch (err) {
        console.log('err:', err);
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

async function getPublicRecipes(token, tilberedningstidId = "all") {
    const filter = tilberedningstidId === "all" ? "" : `&
    tilberedningstid=${tilberedningstidId}`;
    const options = {
        headers: {
            Authorization: "Bearer " + token
        }
    };

    const res = await fetch(domain + postsEndpoint + "?status=publish" + filter + getRealImageUrls, options);
    console.log('res:', res);
    const recipes = await res.json();
    return recipes;
}


function renderRecipes(data) {
    resultEl.innerHTML = "";

    console.log("Fetched recipes:", data);

    if (Array.isArray(data) && data.length > 0) {
        data.forEach(recipe => {
            const acf = recipe.acf || {};
            console.log("ACF:", acf);

            resultEl.innerHTML += `
                <article>
                    <h2>${recipe.title.rendered}</h2>
                    ${recipe.content.rendered}
                    <p><strong>Ingredienser:</strong> ${acf.ingredienser}</p>
                    <p><strong>Fremgangsmåde:</strong> ${acf.fremgangsmaade}
                    <p><strong>Varighed:</strong> ${acf.varighed_i_minutter}</p>
                    <img src="${acf.opskrift_billede.url}"</img>
                </article>
            `;
        });
    } else {
        resultEl.innerHTML = "<p>Ingen opskrifter fundet for den valgte varighed.</p>";
    }
}