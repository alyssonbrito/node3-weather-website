"use strict";

const weatherForm = document.querySelector('form');
const searchText = document.querySelector('input');
const message01 = document.querySelector('#message01');
const message02 = document.querySelector('#message02');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    message01.textContent = '';
    message02.textContent = '';
    console.log(searchText.value);
    console.log('/weather?address=' + searchText.value);
    fetch('/weather?address=' + searchText.value).then((response) => {
        response.json().then((data) => {
            console.log(data);
            if (data.error) {
                message01.textContent = 'Error: ' + data.error;
            } else {
                message01.textContent = data.location;
                message02.textContent = data.forecast;
            }

        });

    });
});