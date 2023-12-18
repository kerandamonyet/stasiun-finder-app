export class SearchBar extends HTMLElement {
    connectedCallback() {
      this.render();
    }
    
    set clickEvent(event) {
      this._clickEvent = event;
      this.render();
    }
   
    get value() {
      return this.querySelector('#search-input').value;
    } 
   
    render() {
      this.innerHTML = `
            <section class="content-search">
                    <h1 class="mb-4">Temukan Stasiun Kereta dengan Mudah!</h1>
                    <p class="mb-2"> Cari Stasiun:  </p>
                    <form class="d-flex " role="search" id="search-form">
                        <input id="search-input" class="form-control me-2" type="search" placeholder="Contoh: Jatinegara " aria-label="Search">
                        <button id="searchButtonElement" class="btn btn-outline-success" type="submit"><i class="fa-solid fa-magnifying-glass fa-sm" style="color: white;"></i></button>
                    </form>
            </section>
      `;
   
      this.querySelector('#searchButtonElement').addEventListener('click', this._clickEvent);
    }
  }
  customElements.define('content-search', SearchBar);