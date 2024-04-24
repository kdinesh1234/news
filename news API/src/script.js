
const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");


let newsDataArr = [];


const API_KEY = "f9e0ce1e323042eda598324bfc9ff78b"; 

const BASE_URL = "https://newsapi.org/v2/top-headlines?country=in";
                  

window.onload = function () {
  newsType.innerHTML = "<h4>Headlines</h4>";
  fetchNews(BASE_URL+"&apiKey="+ API_KEY);
};

generalBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>General news</h4>";
  fetchNews(BASE_URL+"&apiKey="+ API_KEY);
});

businessBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Business</h4>";
  fetchNews(BASE_URL + "&category=business&apiKey=" + API_KEY);
});

sportsBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Sports</h4>";
  fetchNews(BASE_URL + "&category=sports&apiKey=" + API_KEY);
});

entertainmentBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Entertainment</h4>";
  fetchNews(BASE_URL + "&category=entertainment&apiKey=" + API_KEY);
});

technologyBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Technology</h4>";
  fetchNews(BASE_URL + "&category=technology&pageSize=8&apiKey=" + API_KEY);
});

searchBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Search : " + newsQuery.value + "</h4>";
  fetchNews("https://newsapi.org/v2/everything?q=" + encodeURIComponent(newsQuery.value) + "&apiKey=" + API_KEY);
});


const fetchNews = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    newsDataArr = data.articles || [];
    displayNews();
  } catch (error) {
    console.error('Error fetching news:', error.message);
    newsdetails.innerHTML = "<h5>No data found.</h5>";
  }
};

function displayNews() {
  newsdetails.innerHTML = "";

  if (newsDataArr.length === 0) {
    newsdetails.innerHTML = "<h5>No data found.</h5>";
    return;
  }

  newsDataArr.forEach(news => {
    const col = document.createElement('div');
    col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";

    const card = document.createElement('div');
    card.className = "p-2";

    const image = document.createElement('img');
    image.setAttribute("height", "matchparent");
    image.setAttribute("width", "100%");
    image.setAttribute("alt", "Image Error");
    image.src = news.urlToImage;

    const cardBody = document.createElement('div');

    const newsHeading = document.createElement('h5');
    newsHeading.className = "card-title";
    newsHeading.innerHTML = news.title;

    const dateHeading = document.createElement('h6');
    dateHeading.className = "text-primary";
    dateHeading.innerHTML = news.publishedAt;

    const description = document.createElement('p');
    description.className = "text-muted";
    description.innerHTML = news.description;

    const link = document.createElement('a');
    link.className = "btn btn-dark";
    link.setAttribute("target", "_blank");
    link.href = news.url;
    link.innerHTML = "Read more";

    cardBody.appendChild(newsHeading);
    cardBody.appendChild(dateHeading);
    cardBody.appendChild(description);
    cardBody.appendChild(link);

    card.appendChild(image);
    card.appendChild(cardBody);

    col.appendChild(card);

    newsdetails.appendChild(col);
  });
}
