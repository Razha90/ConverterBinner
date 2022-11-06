const getVal = document.querySelectorAll('.wrap-binner p');
getVal[0].addEventListener('click', (e) => {
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    e.target.style.color = '#'+randomColor;
});

getVal[1].addEventListener('click', (e) => {
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    e.target.style.color = '#'+randomColor;
});

getVal[2].addEventListener('click', (e) => {
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    e.target.style.color = '#'+randomColor;
});

getVal[3].addEventListener('click', (e) => {
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    e.target.style.color = '#'+randomColor;
});