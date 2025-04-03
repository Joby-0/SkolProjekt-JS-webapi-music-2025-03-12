'use strict';

let currentState = {
  pagenum: 0,
  pagecout: 0,
  filter: null,
  dbItemsCount: 0,
};

fetchData();
async function fetchData() {
  try {
    let url = `https://seido-webservice-307d89e1f16a.azurewebsites.net/api/MusicGroup/Read?seeded=true&flat=true&pageSize=10`;

    if (currentState.filter) {
      url += `&filter=${encodeURIComponent(currentState.filter)}`;
    }

    url += `&pageNr=${currentState.pagenum}`;
    console.log(url);
    
    let response = await fetch(url);

    let data = await response.json();
    currentState.pagecout = data.pageCount;
    currentState.dbItemsCount = data.dbItemsCount;
    if (currentState.dbItemsCount === 1) { sCount.innerText = `${currentState.dbItemsCount} hittad musik grupp` }
    else { sCount.innerText = `${currentState.dbItemsCount} hittade musik grupper` }



    await renderList(data.pageItems);
  } catch (error) {
    console.error('Error:', error);
  }
}


async function renderList(data) {

  const listContainer = document.getElementById("list");
  listContainer.innerHTML = "";
  data.forEach((artist) => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "row mb-2 text-center bg-light  align-items-center";

    const columnOne = document.createElement("div");
    columnOne.className = "col-md-10 p-2";
    const itemLink = document.createElement("a");
    itemLink.href = `/viewitem.html?id=${artist.musicGroupId}`;
    itemLink.textContent = artist.name;
    columnOne.appendChild(itemLink);

    const columnTwo = document.createElement("div");
    columnTwo.className = "col-md-2 p-2";

    const editButton = document.createElement("a");
    editButton.href = `/viewitem.html?id=${artist.musicGroupId}`;;
    editButton.className = "btn btn-secondary btn-sm m-1";
    editButton.textContent = "View";



    columnTwo.appendChild(editButton);

    rowDiv.appendChild(columnOne);
    rowDiv.appendChild(columnTwo);

    listContainer.appendChild(rowDiv);
  });
}



// sök funktionen //////////////////////////////////////////////////////
const sBtn = document.getElementById("searchBtn")
const sText = document.getElementById("searchinput")
const sCount = document.getElementById("searchCount")

sBtn.addEventListener('click', sSubmit);

function sSubmit(e) {
  e.preventDefault();
  updateFilter(sText.value);

}

function updateFilter(filter) {
  currentState.filter = filter;
  currentState.pagenum = 0; 
  fetchData(); 
}
///////////////////////////////////////////////////////////////////////////


//page change ///////////////////////////////////////////////////////////////
const items = document.querySelectorAll('#pagination-list li[data-row-id]');
const prev = document.getElementById("prevBtn");
const next = document.getElementById("nextBtn");

prev.addEventListener("click", () => {
  if (currentState.pagenum > 0) {
    currentState.pagenum--;
  }
  updatePage(currentState.pagenum);
});
next.addEventListener("click", () => {
  if (currentState.pagenum < currentState.pagecout - 1) {
    currentState.pagenum++;
  }
  updatePage(currentState.pagenum);

});

items.forEach(i => i.addEventListener('click', function (event) {
  event.preventDefault();
  console.log(i.dataset.rowId);
  updatePage(i.dataset.rowId);
}));

function updatePage(pagenum) {
  currentState.pagenum = pagenum;
  fetchData();  //nya data
}
///////////////////////////////////////////////////////////////////////////

