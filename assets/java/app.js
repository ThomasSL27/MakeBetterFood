const recipeSite = [
    ["Sesame Noodles with Chicken", "./assets/img/cardImgs/sesame-noodles-with-chicken-and-cucumbers.png", "card-easy", "Easy","Quick","30 min"],
    ["Spanakoptia", "./assets/img/cardImgs/spanakopita.png", "card-medium", "Medium","Spring","60 min"],
    ["Vegetarian Chili", "./assets/img/cardImgs/vegetarian-chili.png", "card-hard", "Hard","Vegan","4 hours"],
    ["Vegetarian Soft Tacos", "./assets/img/cardImgs/vegetarian-soft-tacos.png", "card-easy", "Easy","Quick","20 min"],
    ["Gluten-Free Cornbread", "./assets/img/cardImgs/gluten-free-cornbread.png", "card-medium", "Medium","Bread","50 min"],
    ["Greek Salad", "./assets/img/cardImgs/greek-salad.png", "card-easy", "Easy","Spring","20 min"],
    ["Rainbow Birthday Cake", "./assets/img/cardImgs/rainbow-birthday-cake.png", "card-hard", "Hard","Birthday","3 hours"],
    ["Baked Kale Chips", "./assets/img/cardImgs/baked-kale-chips.png", "card-easy", "Easy","Quick", "25 min"],
    ["Apple Cinnamon Pancakes", "./assets/img/cardImgs/apple-cinnamon-pancakes.png", "card-easy", "Easy","Birthday","30 min"],
    ["Stacked Enchiladas", "./assets/img/cardImgs/stacked-enchiladas.png", "card-easy", "Easy","Quick","30 min"],
    ["Pasta Primavera", "./assets/img/cardImgs/pasta-primavera.png", "card-easy", "Easy","Vegan", "60 min"],
    ["Carrot Ginger Soup", "./assets/img/cardImgs/carrot-ginger-soup.png", "card-medium", "Medium","Spring","35-40 min"],
    ["Better Sloppy Joes", "./assets/img/cardImgs/sloppy-joes.png", "card-easy", "Easy","Quick","20 min"],
    ["Epic Vegetable Pie", "./assets/img/cardImgs/vegetable-pie.png", "card-easy", "Easy","Vegan","1 hour 25 min"],
    ["Better Banana Bread", "./assets/img/cardImgs/banana-bread.png", "card-medium", "Medium","Bread","60 min"],
    ["Cinnamon Pinwheels", "./assets/img/cardImgs/cinnamon-pinwheels.png", "card-easy", "Easy","Birthday","1 hour 15 min"],
    ["Maple Pecan Ice Cream", "./assets/img/cardImgs/maple-pecan-ice-cream.png", "card-easy", "Easy","Desserts","8 hours 30 min"],
    ["Baked Avocado Fries", "./assets/img/cardImgs/baked-avocado-fries.png", "card-medium", "Medium","Apetizers", "40 min"],
    ["Homemade Tortilla Chips", "./assets/img/cardImgs/homemade-tortilla-chips.png", "card-easy", "Easy","Apetizers","25 min"],
    ["Homemade Hot Chocolate Mix", "./assets/img/cardImgs/homemade-hot-chocolate-mix.png", "card-easy", "Easy","Birthday", "10 min"],
    ["Spinnach Artichoke Dip", "./assets/img/cardImgs/spinach-artichoke-dip.png", "card-medium", "Medium","Apetizers","35 min"],
    ["Blueberry Mango Smoothie", "./assets/img/cardImgs/blueberry-mango-smoothie.png", "card-easy", "Easy","Drinks","5 min"],
    ["Overnight Oatmeal", "./assets/img/cardImgs/overnight-oatmeal.png", "card-easy", "Easy","Breakfast","5 min"],
    ["Country Whole Wheat Bread", "./assets/img/cardImgs/country-whole-wheat-bread.png", "card-easy", "Easy","Bread","3 hours 20 min"]
];

// Target containers
const recipeContainers = {
  ".all-recipes": () => true,
  ".vegan-recipes": r => r.includes("Vegan"),
  ".quick-recipes": r => r.includes("Quick"),
  ".spring-recipes": r => r.includes("Spring"),
  ".birthday-recipes": r => r.includes("Birthday"),
};
const homeContainer = document.querySelector(".home-recipes");

// Reusable card template
function createRecipeCard(rShow) {
  return `
    <article>
      <div class="${rShow[2]}">
        <p class="tags">${rShow[3]}</p>
        <div class="imgAndText">
          <img src="${rShow[1]}" alt="${rShow[0]}" />
          <section>
            <h3>${rShow[0]}</h3>
            <div class="tagsOgIndhild">
              <p>${rShow[4]}</p>
              <p>${rShow[5]}</p>
            </div>
          </section>
        </div>
      </div>
    </article>
  `;
}
if (homeContainer) {
  const easy = recipeSite.find(r => r[3] === "Easy");
  const medium = recipeSite.find(r => r[3] === "Medium");
  const hard = recipeSite.find(r => r[3] === "Hard");

  [easy, medium, hard].forEach(recipe => {
    if (recipe) {
      homeContainer.innerHTML += createRecipeCard(recipe);
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

const desiredRecipeSlug = "sesame-noodles-with-chicken";

init();

async function init() {
    try {
        const token = await getToken();
        const recipe = await getRecipeBySlug(token, desiredRecipeSlug);
        if (recipe) {
            renderRecipes([recipe]);
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
                    <p><strong>Ingredienser:</strong><br> ${Object.values(acf.ingredienser).filter(val => val.trim() !== "").join("<br> ")}</p>
                    <p><strong>Fremgangsmåde:</strong><br> ${Object.values(acf.fremgangsmaade).filter(val => val.trim() !== "").join("<br> ")}</p>
                    <p><strong>Varighed:</strong> ${acf.varighed_i_minutter} min </p>
                    <img src="${acf.opskrift_billede?.url}" alt="Opskrift billede" />
                </article>
            `;
        });
    } else {
        resultEl.innerHTML = "<p>Ingen opskrift fundet.</p>";
    }
}



