function shuffleDeck(deck) {
    // Fisher-Yates shuffle algorithm
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function drawThreeNumbers() {
    const uniqueNumbers = new Set(); // set保证无重复

    while (uniqueNumbers.size < 3) {
        const randomNumber = Math.floor(Math.random() * 78);
        uniqueNumbers.add(randomNumber);
    }

    return Array.from(uniqueNumbers);
}

function generateDrawnCard(deck, drawnNum, isReversed) {
    const card = deck[drawnNum];

    const drawnCardsContainer = document.getElementById('card-container');

    const cardDiv = document.createElement('div');

    // 格式改这里面
    cardDiv.className = 'card col-md-4 mb-3';

    if (isReversed) {
        cardDiv.innerHTML = `
            
                    <div class="card-body">
                        <h5 class="card-title">
                        <a href="#" class="card-link" id="card-link-reverse-${card.number}">${card.name} 逆位</a>
                        </h5>
                        <p class="card-text"><strong>关键词：</strong>${card.rkw}</p>
                    </div>
                    <img src="${card.img}" class="card-img-top py-2" alt="${card.name} reverse" style="transform: scaleY(-1);">

        `;
    } else {
        cardDiv.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">
                        <a href="#" class="card-link" id="card-link-upright-${card.number}">${card.name} 正位</a>
                        </h5>
                        <p class="card-text"><strong>关键词：</strong>${card.kw}</p>
                    </div>
                    <img src="${card.img}" class="card-img-top py-2" alt="${card.name}">
        `;
    }

    drawnCardsContainer.appendChild(cardDiv);

    const openDetails = document.getElementById(`card-link-${isReversed ? 'reverse' : 'upright'}-${card.number}`);
    openDetails.addEventListener('click', () => generatePages(card, isReversed ? '逆位' : '正位'));

}