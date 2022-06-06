'use strict'

// Добавление и удаление классов
function toggleGray (event) {
    event.classList.toggle('gray');
}
function toggleDisTop (event) {
    event.classList.toggle('disTop')
}
function toggleDisBottom (event) {
    event.classList.toggle('disBottom')
}

// Получил все кнопки
const btnsTop = document.querySelectorAll('.btnsTop');
const btnsBottom = document.querySelectorAll('.btnsBottom');
const btns = document.querySelectorAll('.btns');
const exchangeBtn = document.querySelector('.exchangeBtn')
// Получил поля ввода и сделал их неактивными
let topInput = document.querySelector('.topInput');
let bottonInput = document.querySelector('.bottonInput');
topInput.disabled = true;
bottonInput.disabled = true;


let rate = [1, 0, 0 ]; // Записываю значения валют в массив

let a = 0; // Значение верхней выбранной валюты
let b = 0; //Значение нижней выбранной валюты

// Вешаю обработчик события на кнопку конвертировать
exchangeBtn.addEventListener('click', function () {
    if (topInput.value != ""){
        bottonInput.value = (a/b)*topInput.value
    };
});

    
//  Выбор верхней валюты для конвертации 
btnsTop.forEach((item, index) => {
    item.addEventListener('click', function clickBtn () {
        toggleDisTop(item);
        toggleGray(item);
        
        if (item.classList.contains('disTop')) {
            let dis = document.querySelectorAll('.disTop');
            for (let i=0; i < dis.length; i++) {        //Этот цикл делает активными
                dis[i].disabled = false;                //все кнопки
            };
            topInput.disabled = true;                   //Блокирую поле ввода
        } else {
                let dis = document.querySelectorAll('.disTop');             
                 for (let i=0; i < dis.length; i++) {   //Этот цикл делает не активными
                    dis[i].disabled = true;             // все кнопки 
                };                                      //кроме нажатой
                topInput.disabled = false;              //Активирую поле ввода 
                a = rate[index];                        
        };
        
    });
})

//  Выбор нижней валюты для конвертации 
btnsBottom.forEach((item, index) => {
    item.addEventListener('click', function clickBtn () {
        toggleDisBottom(item);
        toggleGray(item);
        
        if (item.classList.contains('disBottom')) {
            let dis = document.querySelectorAll('.disBottom');
            for (let i=0; i < dis.length; i++) {        //Этот цикл делает активными
                dis[i].disabled = false;                //все кнопки
            };
            bottonInput.disabled = true;                //Блокирую поле ввода
                
        } else {
                let dis = document.querySelectorAll('.disBottom');             
                 for (let i=0; i < dis.length; i++) {   //Этот цикл делает не активными
                    dis[i].disabled = true;             //все кнопки
                }                                       //кроме нажатой
                bottonInput.disabled = false;           //Активирую поле ввода
                b = rate[index];
        };
        
    });
})

// Получение курсов и запись их в масив
getExchangeRate();

async function getExchangeRate () {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    const result = await data;

    rate[1] = result.Valute.USD.Value ;
    rate[2] = result.Valute.EUR.Value ;
};









