const showLoader = () => {
   document.getElementById("loader").classList.remove('hidden');
   document.getElementById("video-container").classList.add("hidden");
}

const hideLoader = () => {
   document.getElementById("loader").classList.add('hidden');
   document.getElementById("video-container").classList.remove("hidden");
}

function removeActiveClass() {
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

function loadVideos(searchText = "") {
   showLoader();
   fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
      .then((res) => res.json())
      .then((data) => {
         removeActiveClass();
         document.getElementById("allVideos").classList.add("active");
         displayVideos(data.videos);
      });
}

const loadCategoriesVideos = (id) => {
   showLoader();
   const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
   fetch(url)
      .then((res) => res.json())
      .then((data) => {
         removeActiveClass();
         const clickableBtn = document.getElementById(`${id}`);
         clickableBtn.classList.add("active");
         displayVideos(data.category);
      });
};

const loadVideoDetails = (videoId) => {
   url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
   fetch(url)
      .then((res) => res.json())
      .then((data) => displayVideoDetails(data.video));
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
      hideLoader();
      return;
   }

   videos.forEach((video) => {
      const videoCard = document.createElement("div");
      videoCard.innerHTML = `
         <div class="card">
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
                        <p class="flex gap-2 text-sm text-[rgba(66,57,57,0.7)]">${
                           video.authors[0].profile_name
                        }
                        
                        ${
                           video.authors[0].verified == true
                              ? `<img 
                              class="w-5 h-5"
                              src="https://img.icons8.com/?size=48&id=QMxOVe0B9VzG&format=png"
                              alt="Blue Verified"
                           />` : ""
                        }
                        
                        </p>
                     </div>
                     <p class="text-sm text-[rgba(23,23,23,0.70)] mb-2">${
                        video.others.views
                     } view</p>
                  </div>
               </div>
            </div>

            <button onclick=loadVideoDetails('${
               video.video_id
            }') class="btn btn-block mt-4">Show Details</button>
         </div>
      `;
      videoContainer.append(videoCard);
   });
   hideLoader();
};

const displayVideoDetails = (video) => {
   document.getElementById("video_details").showModal();
   const detailsContainer = document.getElementById("details-container");
   detailsContainer.innerHTML = `
      <div class="card bg-base-100 image-full shadow-sm">
         <figure>
            <img
               src="${video.thumbnail}"
               alt="${video.title}" />
         </figure>

         <div class="card-body">
            <h2 class="card-title font-bold">${video.title}</h2>
            <p class="text-justify">${video.description}</p>

            <div>
               <img src="${video.authors[0].profile_picture}" class="w-20 h-20 rounded-full my-3"/>
               <p>${video.authors[0].profile_name}</p>
            </div>
         </div>
      </div>
   `;
};

document.getElementById("search-input").addEventListener('keyup', (e) => {
   const input = e.target.value;
   loadVideos(input);
});

loadCategories();

