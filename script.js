document.addEventListener('DOMContentLoaded', function () {
    limparCacheECookies();
    var cookiesAceitos = localStorage.getItem('cookiesAceitos');
    if (cookiesAceitos === 'true') {
        console.log('Cookies já aceitos anteriormente. Escondendo o loader...');
        esconderLoader();
    } else {
        console.log('Aguardando 2 segundos antes de aceitar automaticamente os cookies...');
        setTimeout(function () {
            aceitarCookies();
        }, 2000);
    }
});

function aceitarCookies() {
    console.log('Aceitando cookies automaticamente...');
    if ('caches' in window) {
        var cacheName = 'CacheStyle';
        caches.open(cacheName).then(function (cache) {
            cache.clear().then(function () {
            console.log('Cache limpo com sucesso!');
            });
        });
    }
  
    localStorage.setItem('cookiesAceitos', 'true');
    esconderLoader();
}

function limparCacheECookies() {
    limparCache();
    limparCookies();
}

function limparCache() {
    console.log('Limpando cache...');
    if ('caches' in window) {
        var cacheName = 'CacheStyle';
        caches.open(cacheName).then(function (cache) {
            cache.keys().then(function (keys) {
                keys.forEach(function (key) {
                    cache.delete(key);
                });
                console.log('Cache limpo com sucesso!');
            });
        });
    } else {
        console.warn('A API Cache Storage não está disponível no navegador.');
    }
}

function limparCookies() {
    console.log('Limpando cookies...');
    localStorage.clear();
}
  
function esconderLoader() {
    console.log('Escondendo o loader...');
    document.getElementById('loader').style.display = 'none';
}