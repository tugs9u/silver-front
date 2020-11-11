const config = require('../config');
const localStorage = require('electron-settings');

async function logout(){
    let accTkn = '';

    await localStorage.get('accessToken')
    .then(accessTkn => {
        accTkn = accessTkn;
    });

    return await fetch(config.LOGOUT, {
        method: 'GET',
        headers: {
            'Authorization': 'bearer ' + accTkn
        }
    }).then(response => {
        return response.json();
    }).then(data => {
        localStorage.unsetSync("accessToken");
        localStorage.unsetSync("refreshToken");
        return data;
    });
}

function login(username, password){
    if(localStorage.hasSync("accessToken")){
        localStorage.unsetSync("accessToken");
        localStorage.unsetSync("refreshToken");
    }

    return getAccessToken(username, password);
}

async function getAccessToken(username, password){
    const body = {
        'username': username,
        'password': password,
        'grant_type': 'password'
    }

    const tokens = {
        accessToken: '',
        refreshToken: '',
        errorMsg: '',
    }

    await fetch(config.LOGIN, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(`${config.BASIC_USERNAME}:${config.BASIC_PASSWORD}`),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(body),
    }).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        if(data['error_description'] != undefined || data['error_description'] != null) {
            tokens.errorMsg = data.error_description;
        } else {
            tokens.accessToken = data.access_token;
            tokens.refreshToken = data.refresh_token;
            localStorage.setSync('accessToken', tokens.accessToken);
            localStorage.setSync('refreshToken', tokens.refreshToken);
        }
    });

    return tokens;
}

async function getRefreshToken(refreshToken){

    var tokens = getNewToken(refreshToken);

    return {
        "access":"dsa",
        "refresh": "dsa"
    }
}

async function getNewToken(refreshToken){
    const body = {
        'grant_type': 'refresh_token',
        'refresh_token': refreshToken
    }

    fetch(config.LOGIN, {
        method: 'POST',
        headers: {
            'Authorization': 'basic ' + btoa(`${config.BASIC_USERNAME}:${config.BASIC_PASSWORD}`),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(body),
    }).then(response => {
        if(response.status === 200 || response.status === 202){
            return response.json();
        } else {
            throw 'BadCredential';
        }
    }).then(data => {
        return data;
    });
}

module.exports = {
    login, logout
}