const inpSearch = document.getElementById('inp-search');
const output = document.getElementById('output');

window.addEventListener('load', () => {
    loader();
    fetchCharcters();
});

inpSearch.addEventListener('change', () => {
    let searchQuery = inpSearch.value;
    loader();
    fetchCharcters(searchQuery);
});

function loader(){
    output.innerHTML = '<div class="gif-spinner mx-auto"><img src="img/loader.webp"></img></div>'
}

async function fetchCharcters(query){
    let res;
    let res2;

    if(query){
        res = await fetch(`https://www.breakingbadapi.com/api/characters?name=${query}`);
        res2 = await fetch(`https://www.breakingbadapi.com/api/quote?author=Jesse+Pinkman`).json();
    }else{
        res = await fetch('https://www.breakingbadapi.com/api/characters');
    }

    let results = await res.json();
    let results2 = await res2;

    output.innerHTML = "";

    results.map(result => {
        const htmlString = `<img src="${result.img}" class="img">
            <div class="info-display">
                <h5>Name: ${result.portrayed}</h5>
                <hr>
                <h6>Actor Name: <span>${result.name}</span></h6>
                <h6>Nickname: <span>${result.nickname}</span></h6>
                <h6>Birthday: <span>${result.birthday}</span></h6>
                <h6>Occupation: <span>${result.occupation}</span></h6>
                <h6>Status: <span>${result.status}</span></h6>
                <h6>Appearance: <span>${result.appearance}</span></h6>
            </div>`;

    let outputString = document.createElement('div');
    outputString.classList.add('col-md-3', 'mb-3', 'img-info');
    outputString.innerHTML = htmlString;
    output.appendChild(outputString);
    });
}