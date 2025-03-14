function loadCategories() {
   fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
      .then((res) => res.json())
      .then((data) => displayCategories(data.categories));
}

function displayCategories(categories) {
   const navContainer = document.getElementById("category-container");
   for (const category of categories) {
      const btn = document.createElement("button");
      btn.classList.add("btn", "btn-sm", "hover:bg-[#FF1F3D]", "hover:text-white");
      btn.innerText = `${category.category}`;
      navContainer.appendChild(btn);
   }
}

loadCategories();
