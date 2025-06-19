const stations = [
    { name: "대곡", img: "/station_data/대곡역.jpg", url: "/station_data/review-daegok.html" },
    { name: "디지털미디어시티", img: "/station_data/디지털미디어시티역.jpg", url: "/station_data/review-dmc.html" },
    { name: "홍대입구", img: "/station_data/홍대입구역.jpg", url: "/station_data/review-hongdae.html" },
    { name: "공덕", img: "/station_data/공덕역.jpg", url: "/station_data/review-gongdeok.html" },
    { name: "용산", img: "/station_data/용산역.jpg", url: "/station_data/review-yongsan.html" },
    { name: "이촌", img: "/station_data/이촌역.jpg", url: "/station_data/review-ichon.html" },
    { name: "서빙고", img: "/station_data/서빙고역.jpg", url: "/station_data/review-seobinggo.html" },
    { name: "옥수", img: "/station_data/옥수역.jpg", url: "/station_data/review-oksu.html" },
    { name: "응봉", img: "/station_data/응봉역.jpg", url: "/station_data/review-eungbong.html" },
    { name: "왕십리", img: "/station_data/왕십리역.jpg", url: "/station_data/review-wangsimni.html" },
    { name: "청량리", img: "/station_data/청량리역.jpg", url: "/station_data/review-cheongnyangni.html" },
    { name: "상봉", img: "/station_data/상봉역.jpg", url: "/station_data/review-sangbong.html" },
    { name: "망우", img: "/station_data/망우역.jpg", url: "/station_data/review-mangwoo.html" },
    { name: "구리", img: "/station_data/구리역.jpg", url: "/station_data/review-guri.html" },
    { name: "지평", img: "/station_data/지평역.jpg", url: "/station_data/review-jipyeong.html" }
]

function renderStations() {
    const grid = document.getElementById('stationGrid');
    grid.innerHTML = '';

    stations.forEach(station => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.station = station.name;

       card.innerHTML = `
            <div class="header">
                <span>${station.name}역</span>
                <span class="heart" data-station="${station.name}">♡</span>
            </div>
            <a href="${station.url}">
                <img src="${station.img}" alt="${station.name}역" class="station-img">
            </a>
            <div class="rating">평균 평점: <span id="rate-${station.name}">0.0</span></div>
        `;
        grid.appendChild(card);
    });
}

function updateRatings() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    document.querySelectorAll('.card').forEach(card => {
        const name = card.dataset.station;
        const rateEl = card.querySelector('.rating span');
        const arr = reviews[name] || [];
        rateEl.textContent = arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : '0.0';
    });
}

document.getElementById('searchInput').addEventListener('input', function () {
    const term = this.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const name = card.dataset.station.toLowerCase();
        if (name.includes(term)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });

    const anyVisible = Array.from(cards).some(card => card.style.display !== 'none');
    document.getElementById('emptyMessage').style.display = anyVisible ? 'none' : '';
});

// 하트 상태 저장 및 불러오기
function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}
function setFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// 하트 토글 함수
function toggleHeart(stationName, el) {
    let favorites = getFavorites();
    const idx = favorites.indexOf(stationName);
    if (idx > -1) {
        favorites.splice(idx, 1);
        el.textContent = '♡';
        el.classList.remove('active');
    } else {
        favorites.push(stationName);
        el.textContent = '♥';
        el.classList.add('active');
    }
    setFavorites(favorites);
}

function attachHeartEvents() {
    document.querySelectorAll('.heart').forEach(heart => {
        heart.addEventListener('click', function(e) {
            e.stopPropagation();
            const stationName = this.dataset.station;
            toggleHeart(stationName, this);
        });
    });
}

function updateHearts() {
    const favorites = getFavorites();
    document.querySelectorAll('.heart').forEach(heart => {
        const stationName = heart.dataset.station;
        if (favorites.includes(stationName)) {
            heart.textContent = '♥';
            heart.classList.add('active');
        } else {
            heart.textContent = '♡';
            heart.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderStations();
    updateRatings();
    updateHearts();
    attachHeartEvents();
});