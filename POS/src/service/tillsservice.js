const config = require('../config');
const localStorage = require('electron-settings');

async function tillsSearch(e){
    e.preventDefault();
    let searchVal = e.target.value;
    if(searchVal.length >= 2){
        console.log(config.TILLS_BARCODE_SEARCH + "?barCode=" + searchVal);
        await fetch(config.TILLS_BARCODE_SEARCH + "?barCode=" + searchVal, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getSync("accessToken")
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
        });
    }
}

module.exports = {
    tillsSearch
}