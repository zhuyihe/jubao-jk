(function () {
    var timeout = 10000;
    var btn = false;
    var timer = setTimeout(function () {
        var reload = document.getElementsByClassName('reload')[0];
        var cicle = document.getElementsByClassName('cicle')[0];
        reload.style.display = 'block';
        cicle.style.display = 'none';
        btn = true;
    },timeout);
    window.addEventListener('load',function () {
        if(!btn){
            var loading = document.getElementsByClassName('loading')[0];
            loading.style.display = 'none';
            clearTimeout(timer)
        }
    });
})();