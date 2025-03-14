function removeActiveBtn() {
   const activeButtons = document.getElementsByClassName("active");
   
   for (const btn of activeButtons) {
      btn.classList.remove("active");
   }
}

function loadCategories() {
   fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
      .then((res) => res.json())
      .then((data) => displayCategories(data.categories));
}

function loadVideos() {
   fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
      .then((res) => res.json())
      .then((data) => {
         removeActiveBtn();
         document.getElementById("allVideos").classList.add('active');
         displayVideos(data.videos)
      });
}

const loadCategoriesVideos = (id) => {
   const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
   fetch(url)
      .then((res) => res.json())
      .then((data) => {
         removeActiveBtn();
         const clickableBtn = document.getElementById(`${id}`);
         clickableBtn.classList.add("active");
         displayVideos(data.category);
      });
};

function displayCategories(categories) {
   const navContainer = document.getElementById("category-container");
   for (const category of categories) {
      const btn = document.createElement("button");
      btn.setAttribute(
         "onclick",
         `loadCategoriesVideos(${category.category_id})`
      );

      btn.setAttribute("id", `${category.category_id}`);

      btn.classList.add(
         "btn",
         "btn-sm",
         "hover:bg-[#FF1F3D]",
         "hover:text-white"
      );
      btn.innerText = `${category.category}`;
      navContainer.appendChild(btn);
   }
}

const displayVideos = (videos) => {
   const videoContainer = document.getElementById("video-container");
   videoContainer.innerHTML = "";

   if (videos.length == 0) {
      videoContainer.innerHTML = `
         <div class="col-span-full flex flex-col justify-center items-center text-center pt-16">
            <img src="./asset/Icon.png" alt="Icons">
            <h2 class="text-[#171717] text-3xl font-bold leading-10 mt-8">Oops!! Sorry, There is no <br> content here</h2>
         </div>
      `;
      return;
   }

   videos.forEach((video) => {
      const videoCard = document.createElement("div");
      videoCard.innerHTML = `
         <div class="card bg-gray-200">
            <figure class="relative">
               <img
                  src="${video.thumbnail}"
                  alt="Shoes"
                  class="h-40 w-full object-cover"
               />

               <span
                  class="absolute bottom-2 right-2 text-white text-[11px] bg-[#171717] rounded px-2 py-[3px]"
                  >3hrs 56 min ago</span
               >
            </figure>

            <div class="p-1">
               <div class="flex gap-3">
                  <div>
                     <img
                        src="${video.authors[0].profile_picture}"
                        alt="Tailwind-CSS-Avatar-component"
                        class="w-10 h-10 rounded-full"
                     />
                  </div>

                  <div>
                     <h2 class="text-[#171717] font-bold leading-6">
                        ${video.title}
                     </h2>
                     <div class="my-[10px]">
                        <p class="flex gap-2 text-sm text-[rgba(66,57,57,0.7)]">${video.authors[0].profile_name}
                        
                        <img 
                           class="w-5 h-5"
                           src="https://img.icons8.com/?size=48&id=QMxOVe0B9VzG&format=png"
                           alt="Blue Verified"
                           />
                        </p>
                     </div>
                     <p class="text-sm text-[rgba(23,23,23,0.70)] mb-2">${video.others.views} view</p>
                  </div>
               </div>
            </div>
         </div>
      `;
      videoContainer.append(videoCard);
   });
};

loadCategories();
// loadVideos();
