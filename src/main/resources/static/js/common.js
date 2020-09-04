function checkEmpty (str) {
    return (typeof str === 'undefined' || str === null || str === "");
}

function checkNotEmpty (str) {
    return !checkEmpty(str);
}

function checkHasLogin () {
    let tokenString = getCookie('tokenString');
    let expireMillTime = sessionStorage.getItem("expireMillTime");
    return tokenString && new Date().getTime() < expireMillTime;
}