(function () {
    var logo = document.getElementById('logo');

    window.addEventListener('resize', resize, false);

    function resize() {        
        var mw = Math.min(window.innerWidth, window.innerHeight);
        
        logo.width = mw / 2;
        logo.height = mw / 2;
        logo.style.left = ((window.innerWidth - logo.width) / 2) + "px";
        logo.style.top = logo.height / 4 + "px";
    }
    resize();
})();