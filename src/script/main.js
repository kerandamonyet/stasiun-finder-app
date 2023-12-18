import "regenerator-runtime";

const main = () => {
  async function fetchStations() {
    try {
      const response = await fetch(`https://booking.kai.id/api/stations2`);
      const stations = await response.json();
      return stations;
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data stasiun: ", error);
      showResponseMessage();
    }
  }
  async function displayAllStations() {
    const stations = await fetchStations();
    if (!stations) {
      showResponseMessage();
      return;
    }

    const listAllStation_e = document.querySelector("#listStations");
    listAllStation_e.innerHTML = ""; 
    renderAllStations(stations);
  }

  function filterStations(stations, keyword) {
    return stations.filter((station) => {
      return station.name.toLowerCase().includes(keyword.toLowerCase());
    });
  }

  const renderAllStations = (filteredStations) => {
    const listAllStation_e = document.querySelector("#listStations");
    filteredStations.forEach((station) => {
      listAllStation_e.innerHTML += `
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${station.name} (${station.code})</h5>
                        <p class="card-text">City: ${station.city} <br> Cityname: ${station.cityname}</p>
                    </div>
                </div>
            </div>
            `;
    });
  };
  const showResponseMessage = () => {
    const errorMessage_e = document.querySelector("#rowErrorMessage");
    errorMessage_e.innerHTML = `
            <div class="col text-center mt-4">
                <i class="fa-solid fa-server icon-link icon"></i>
                <h5 class="mt-3">Kami tidak dapat menemukan hasil untuk kueri Anda</h5>
                <p>Apakah Anda ingin mencoba pencarian lain?</p>
            </div>
        `;
  };
  const validationForm = async () => {
    const searchInput = document
      .getElementById("search-input")
      .value.toUpperCase();
    const stations = await fetchStations();
    if (!stations || searchInput == "") {
      showResponseMessage();
    } else {
      const filteredStations = filterStations(stations, searchInput);

      if (filteredStations.length === 0) {
        showResponseMessage(); 
      } else {
        renderAllStations(filteredStations);
      }
    }
  }; 
  window.addEventListener("load", displayAllStations);

  document
    .getElementById("search-form")
    .addEventListener("submit", async function (e) {
      e.preventDefault();
      validationForm();
      document.getElementById("listStations").innerHTML = "";
      document.getElementById("search-input").value = "";
      document.getElementById("rowErrorMessage").innerHTML = "";
    });
  
}

export default main;