const baseurl = "https://hn.algolia.com/api/v1/search?query=";
const root = document.querySelector("#root");
const form = document.querySelector("form");

form.addEventListener("submit", submitHandler);

function submitHandler(event) {
  event.preventDefault();

  const searchText = event.target.searchText.value;

  if (!searchText) {
    alert("Search text is required");

    return false;
  }

  const localStories = JSON.parse(localStorage.stories);

  if (localStories[searchText]) {
    render(localStories[searchText]);

    return false;
  }

  fetchStories(searchText).then(stories => {
    localStories[searchText] = stories.hits;

    localStorage.setItem("stories", JSON.stringify(localStories));

    render(stories.hits);
  });
}

async function fetchStories(searchText) {
  const response = await fetch(`${baseurl}${searchText}`);

  return await response.json();
}

function render(stories) {
  root.innerHTML = "";

  for (const story of stories) {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.textContent = story.title;
    a.setAttribute("href", story.url);

    li.append(a);
    root.append(li);
  }
}
