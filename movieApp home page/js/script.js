
const lightBoxContainer = document.querySelector('.light-box-container');
const lightBoxContent = document.querySelector('.light-box-content');
const lightBox=document.querySelector('.light-box')
const lightBoxImg = document.querySelector('.light-box__img >img');
const ligthBoxTitle = document.querySelector('.ligth-box__caption >h2');
const typeOfItem = document.querySelector('.icons > h3');
const releaseDate = document.querySelector('.release-date');
const rate = document.querySelector('.rate');
const voteCount = document.querySelector('.vote-count');
const overview = document.querySelector('.ligth-box__caption > h5');
const leftArrow = document.querySelector('.fa-circle-left');
const rightArrow = document.querySelector('.fa-circle-right');
const playBtn = document.querySelector('#play-btn');
const navLinks = document.querySelectorAll('.nav-link');
const searchInput=document.querySelector('#search')
// console.log(searchInput);


// console.log(navLinks);
let upcomingRes = [];
let newDataRes = [];
let trendDataRes = [];
let navDataRes = [];
let currentDataArr = [];
// let currentDataSet = [];
let popRes = [];
let dataRes = [];
let index = 0;
// let clickedItem;
navLinks.forEach(link=>{
  link.addEventListener('click',()=>{
    navLinks.forEach(nav=>{nav.classList.remove('active')})
    link.classList.add('active')
  })
})
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGQxMGQyYjhmNTJiYzBhNTMyMGQ1YzlkODhiZDFmZiIsIm5iZiI6MTU5Mjc1NTkwMS44MjgsInN1YiI6IjVlZWY4NmJkZWQyYWMyMDAzNTlkNGM4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NT77KLEZLjsgTMnyjJQBWADPa_t_7ydLLbvEABTxbwM'
  }
};
async function getData(type = 'trending/all/week') {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/${type}?language=en-US`, options);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
}


function displayData(dataArr, section) {
  let cartona = ``;
  dataArr.forEach((item, index) => {
    let title = item.name || item.original_title || 'No Title';
    let date = item.first_air_date || item.release_date || 'No Date';

    // console.log(id);

    cartona += `
      <div class="col-sm-4 col-md-2 trending-item" data-index="${index}">
        <figure><img src="https://image.tmdb.org/t/p/w500/${item.poster_path}" alt=""></figure>
        <h6>${title}</h6>
        <span class="fw-lighter">${date}</span>
      </div>`;

  });
  document.getElementById(section).innerHTML = cartona;
}

async function setPopularSec() {
  popRes = await getData('movie/popular');
  displayData(popRes, 'popular-data');
  setupPopularLightBox();
}

async function setUpcomingSec() {
 upcomingRes= await getData('movie/upcoming')
  displayData(upcomingRes, 'upcoming-data');
  setUpcomingLightBox();
}

function setUpcomingLightBox() {
  const upcomingItems = document.querySelectorAll('#upcoming-data .trending-item');
  upcomingItems.forEach((item) => {
    item.addEventListener('click', function () {
      index = parseInt(this.getAttribute('data-index'));
      // currentDataSet = upcomingRes;
      lightBoxContainer.classList.replace('d-none', 'd-flex');
      setLightBox(upcomingRes)

    })

  })


}
function setupPopularLightBox() {
  const popularItems = document.querySelectorAll('#popular-data .trending-item');
  popularItems.forEach(item => {
    item.addEventListener('click', function () {
      index = parseInt(this.getAttribute('data-index'));
      // currentDataSet = popRes;
      lightBoxContainer.classList.replace('d-none', 'd-flex');
      setLightBox(popRes);
    });

  });
}

async function displayLightBox() {
  await getData('trending/all/week', dataRes); // Fetch dataRes and populate items
  const trendingItems = document.querySelectorAll('.trending-item');

  trendingItems.forEach(item => {
    item.addEventListener('click', function () {
      index = parseInt(this.getAttribute('data-index'));
      // currentDataSet = dataRes;
      lightBoxContainer.classList.replace('d-none', 'd-flex');
      setLightBox(dataRes);
    });
  });
}
function setLightBox(dataArr,i=index) {
  // index =parseInt(i);
  currentDataArr = dataArr;
  // Set main image
  lightBoxImg.setAttribute('src', `https://image.tmdb.org/t/p/w500/${dataArr[index].poster_path}`);

  //set the title
  let title = dataArr[index].name || dataArr[index].original_title || 'No Title';
  let date = dataArr[index].first_air_date || dataArr[index].release_date || 'No Date';
  let year = date.slice(0, 4);
  console.log(year);


  ligthBoxTitle.innerHTML = `${title} (${year})`;
  //set type of
  let mediaType = dataArr[index].media_type ? dataArr[index].media_type.charAt(0).toUpperCase() + dataArr[index].media_type.slice(1) : 'Movie';
  typeOfItem.innerHTML = `<i class="fa-brands fa-medium fa-l"></i>  ${mediaType}`;
  //set date
  releaseDate.innerHTML = `<i class="fa-solid fa-code-merge fa-2xl"></i>  Release Date:  ${date}`
  // set rate 
  rate.innerHTML = `<i class="fa-solid fa-gauge fa-2xl"></i> Rate: ${dataArr[index].vote_average}/10`
  //set vote count
  voteCount.innerHTML = `<p class="vote-count"><i class="fa-solid fa-globe fa-2xl"></i> Vote Count: ${dataArr[index].vote_count}`
  // set overview
  overview.innerHTML = `Overview: ${dataArr[index].overview}`


  // Set background image
  lightBoxContent.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${dataArr[index].backdrop_path})`;
  let movieId = dataArr[index].id;
  // let seachedItem=dataArr[index].title
  // console.log(movieId);

  getTrailer(movieId);
}


(async function () {
  dataRes = await getData('trending/all/week');
  displayData(dataRes, 'row-data');
  displayLightBox(dataRes); // Sets up trending items

  await setPopularSec(); // Setup popular section
  await setUpcomingSec();

  document.getElementById('close-btn').addEventListener('click', closeSlider);
})();


function closeSlider() {
  lightBoxContainer.classList.replace('d-flex', 'd-none');

}

function slider(int) {
  index = index + int;
  if (index < 0) index = currentDataArr.length - 1;
  if (index >= currentDataArr.length) index = 0;
  setLightBox(currentDataArr);
}

document.addEventListener('keydown', function (e) {
  if (lightBoxContainer.classList.contains('d-flex')) {
    if (e.key === 'ArrowRight') slider(1);
    if (e.key === 'ArrowLeft') slider(-1);
    if (e.key === 'Escape') closeSlider();
  }
});
leftArrow.addEventListener('click', () => slider(-1));
rightArrow.addEventListener('click', () => slider(1));



async function getTrailer(id) {
  try {
    const trailerData = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options);
    const trailerRes = await trailerData.json();
    const trailers = trailerRes.results.filter((video) =>
      video.site === "YouTube" && video.type === "Trailer"
    );
    console.log(trailerRes.results);


    displayTrailer(trailers);
  } catch (error) {
    console.error(error);
  }
}

// function displayTrailer(trailers) {
//   let output = '';
//   trailers.forEach(video => {
//     output += `
//       <iframe width="800" height="450"
//         src="https://www.youtube.com/embed/${video.key}"
//         title="${video.name}"
//         frameborder="0"
//         allowfullscreen>
//       </iframe><br><br>
//     `;
//   });
//   document.getElementById('iframe-control').innerHTML = output;
// }
function displayTrailer(trailers) {
  let output = '';
  if (trailers.length > 0) {
    const video = trailers[0]; // use first trailer only
    output = `
      <iframe width="800" height="450"
        src="https://www.youtube.com/embed/${video.key}"
        title="${video.name}"
        frameborder="0"
        allowfullscreen
        class="d-none">
      </iframe>`;
  } else {
    output = `<p class="text-white">No trailer available.</p>`;
  }
  document.getElementById('iframe-control').innerHTML = output;
}

// playBtn.addEventListener('click', (e) => {
//   e.stopImmediatePropagation()
//   lightBoxContent.classList.add('d-none');
//   document.querySelector('iframe').classList.remove('d-none')
// })
playBtn.addEventListener('click', (e) => {
  e.stopImmediatePropagation();
  lightBoxContent.classList.add('d-none');
  const iframe = document.querySelector('#iframe-control iframe');
  if (iframe) {
    iframe.classList.remove('d-none');
  }
});


lightBoxContainer.addEventListener('click', (e) => {
  e.stopImmediatePropagation();
  const iframe = document.querySelector('#iframe-control iframe');
  if(iframe.classList.contains('.d-none')){
  lightBoxContainer.classList.add('d-none');
  }
  if (iframe) {
    iframe.classList.add('d-none');
  }
  lightBoxContent.classList.remove('d-none');
});



const homePage = document.querySelector('#home-page');
const navBarSec = document.querySelector('.navigation-bar');
const trendingSec = document.querySelector('.trending');
const PopularSec = document.querySelector('.Popular-sec');
const upcomingSec=document.querySelector('.upcoming-sec');
const pageControlSec = document.querySelector('.page-control');

function showHome(){

  navBarSec.classList.remove('d-none');
  trendingSec.classList.remove('d-none');
  PopularSec.classList.remove('d-none');
  upcomingSec.classList.remove('d-none')
  navBarSec.style.height = `33vh`;
  pageControlSec.classList.add('d-none')
}
homePage.addEventListener('click',showHome);



function hideHomePage() {
  navBarSec.style.height = `auto`;
  trendingSec.classList.add('d-none');
  PopularSec.classList.add('d-none');
  upcomingSec.classList.add('d-none')
  pageControlSec.classList.remove('d-none');
  // navBarSec.style.backgroundColor = 'transparent';
}
async function getNavData(field) {
  const navData = await fetch(`https://api.themoviedb.org/3/discover/${field}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`, options)
  navDataRes = await navData.json();
  // console.log(navDataRes.results);
};

// const tv=document.querySelector('#tv');
// const movie=document.querySelector('#movie');
// console.log(movie);
document.querySelector('.navbar-nav').addEventListener('click', async (e) => {
  const field = e.target.id; // 'tv' or 'movie'

  if (field === 'tv' || field === 'movie') {
    await getNavData(field);
    hideHomePage();
    displayNavData(navDataRes);
  }
});




function displayNavData(data) {
  let cartona = ``;
  data.results.forEach((item) => {
    let title = item.name || item.original_title || 'No Title';
    let date = item.first_air_date || item.release_date || 'No Date';
    let year = date.slice(0, 4);
    let profilePath = item.profile_path || item.poster_path;
    if (item.profile_path === null) {
      profilePath = `https://image.tmdb.org/t/p/original//eOh4ubpOm2Igdg0QH2ghj0mFtC.jpg`;
      title = `Tom Cruise`
    };
    if (year === 'No D') { year = `Actor` }
    let overview = item.overview;
    if (overview === undefined) { overview = `<img src="https://image.tmdb.org/t/p/original/${profilePath}" alt="">` }

    cartona += `
      <div class="col-sm-12 col-md-6 col-lg-4 item-hover">
            <img src="https://image.tmdb.org/t/p/w500/${profilePath}" alt="">
            <div class="overlay">
             <h3 class="text-white py-1 px-5">${title} (${year})</h3>
             <p>${overview}</p>
            </div>
          </div>`;
  });
  document.getElementById('nav-data').innerHTML = cartona;
}

async function getNewData(field) {
  const newData = await fetch(`https://api.themoviedb.org/3/movie/${field}?language=en-US&page=1`, options);
  newDataRes = await newData.json();
  console.log(newDataRes.results);
}

document.querySelector('#dropdown-menu-popular').addEventListener('click', async (e) => {
  console.log(e.target.id);
  const field = e.target.id;

  if (field === 'now_playing' || field === 'popular' || field === 'top_rated' || field === 'upcoming') {
    await getNewData(field);
    hideHomePage();
    displayNavData(newDataRes);
  }
})

async function getTrendData(field) {
  const trendData = await fetch(`https://api.themoviedb.org/3/trending/${field}/day?language=en-US`, options);
  trendDataRes = await trendData.json();
  console.log(trendDataRes.results);
}

document.querySelector('#dropdown-menu-trending').addEventListener('click', async (e) => {
  console.log(e.target.ariaCurrent);
  const field = e.target.ariaCurrent;
  if (field === 'tv' || field === 'movie' || field === 'person' || field === 'all')
    await getTrendData(field);
  hideHomePage();
  displayNavData(trendDataRes);
})
function searchItem(){

}
const searchDropdown = document.getElementById('search-dropdown');

searchInput.addEventListener('input', async()=>{
  const query=searchInput.value.trim();
if(query.length<2){
  searchDropdown.classList.add('d-none');
return;
}


  const response=await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US`, options)
  const data=await response.json();
  const results=data.results;
  if (results.length>0){
      searchDropdown.innerHTML=results.map((item,index)=>
    `<li class="dropdown-item" data-index="${index}">
  ${item.name||item.title}</li>`).join('');
  searchDropdown.classList.remove('d-none');

  document.querySelectorAll('#search-dropdown .dropdown-item').forEach(item=>{
    item.addEventListener('click',()=>{
      const index=item.getAttribute('data-index');
      searchDropdown.classList.add('d-none');
      showHome();
      lightBoxContainer.classList.replace('d-none','d-flex');
      setLightBox(results,index)
    })
  })
  }else{
    searchDropdown.classList.add('d-none')
  }
})

// AIzaSyCa2I3WBIdKlATMb-EuhtQz0oDUgjf4riU
const apiKey='AIzaSyCa2I3WBIdKlATMb-EuhtQz0oDUgjf4riU';
async function askGemini() {
const userInput=document.querySelector('#user-input');
try {
  const response= await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
  {method:'POST',
  headers:{'Content-Type': 'application/json'},
  body:JSON.stringify({contents:[{parts:[{text:userInput}]}]})
  });
  const data=await response.json();
  const result=data.candidates?.[0]?.content?.parts?.text ||'No response';
  document.getElementById('response').innerText=result;
} catch (error) {
  console.log(error);
  
}
}
document.querySelector('#gemini-btn').addEventListener('click',askGemini);

