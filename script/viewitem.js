'use strict';

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetchData(id)
async function fetchData(id) {
    try {
        let response = await fetch(`https://seido-webservice-307d89e1f16a.azurewebsites.net/api/MusicGroup/ReadItem?id=${id}&flat=false`);
        let data = await response.json();
        renderData(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function renderData(data) {
    let name = document.getElementById("groupName");
    name.value = data.name;
    let genere = document.getElementById("genre");
    genere.value = data.strGenre;
    let birthyear = document.getElementById("established");
    birthyear.value = data.establishedYear;
    renderArtists(data.artists);
    renderAlbums(data.albums);
    console.log(data);

}
function renderArtists(artists) {
    const container = document.getElementById("artists");
    container.innerHTML = ""; // Clear existing content

    // Header
    const header = document.createElement("h3");
    header.classList.add("pb-2");
    header.textContent = "Artists";
    container.appendChild(header);

    // Table Header
    const headerRow = document.createElement("div");
    headerRow.classList.add("row", "mb-2", "text-center");

    const headerCol = document.createElement("div");
    headerCol.classList.add("col-md-12", "themed-grid-head-col");
    headerCol.textContent = "Name";

    headerRow.appendChild(headerCol);
    container.appendChild(headerRow);

    // Artist Rows
    artists.forEach(artist => {
        const artistRow = document.createElement("div");
        artistRow.classList.add("row", "mb-2", "text-center");

        const artistCol = document.createElement("div");
        artistCol.classList.add("col-md-12", "themed-grid-col");
        artistCol.textContent = `${artist.firstName} ${artist.lastName}`;

        artistRow.appendChild(artistCol);
        container.appendChild(artistRow);
    });
}
function renderAlbums(albums) {
    const container = document.getElementById("albums");
    container.innerHTML = ""; // Clear existing content

    // Header
    const header = document.createElement("h3");
    header.classList.add("pb-2");
    header.textContent = "Albums";
    container.appendChild(header);

    // Table Header
    const headerRow = document.createElement("div");
    headerRow.classList.add("row", "mb-2", "text-center");

    const nameHeader = document.createElement("div");
    nameHeader.classList.add("col-md-10", "themed-grid-head-col");
    nameHeader.textContent = "Name";

    const yearHeader = document.createElement("div");
    yearHeader.classList.add("col-md-2", "themed-grid-head-col");
    yearHeader.textContent = "Year";

    headerRow.appendChild(nameHeader);
    headerRow.appendChild(yearHeader);
    container.appendChild(headerRow);

    // Album Rows
    albums.forEach(album => {
        const albumRow = document.createElement("div");
        albumRow.classList.add("row", "mb-2", "text-center");

        const albumName = document.createElement("div");
        albumName.classList.add("col-md-10", "themed-grid-col");
        albumName.textContent = album.name;

        const albumYear = document.createElement("div");
        albumYear.classList.add("col-md-2", "themed-grid-col");
        albumYear.textContent = album.releaseYear;

        albumRow.appendChild(albumName);
        albumRow.appendChild(albumYear);
        container.appendChild(albumRow);
    });
}





