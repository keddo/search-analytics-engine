document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    let content = ''
    content += `
       <div class="container">
          <form>
            <input type="search" id="search-box" placeholder="Search Articles..."/>
          </form>
         
          <div class="article-insight">
            <div id="article-list">
                <h2>Article List</h2>
            </div>
            <div id="article-analytics">
                <h2>Article Analytics</h2>
            </div>
          <div>
       </div>
     `
    body.innerHTML = content;
})