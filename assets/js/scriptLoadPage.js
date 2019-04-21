var upPanel = document.getElementById('panelUp');
var downPanel = document.getElementById('panelDown');
var imgLoadPage = document.getElementById('imgloadPage');
function openPanel() {
    imgLoadPage.style.display = "none"
    upPanel.style.height = "0px";
    downPanel.style.height = "0px";
}
setTimeout(function () {
    openPanel();
}, 2000);

