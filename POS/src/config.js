const BASIC_USERNAME = 'browser';
const BASIC_PASSWORD = '';

const LOGIN = "http://127.0.0.1:5000/uaa/oauth/token";
const LOGOUT = "http://127.0.0.1:8082/mobile-api/preSignout";
const TILLS_BARCODE_SEARCH = "http://127.0.0.1:8093/pos/t/search";

module.exports = {
    BASIC_PASSWORD, 
    BASIC_USERNAME,
    LOGIN,
    LOGOUT,
    TILLS_BARCODE_SEARCH
}