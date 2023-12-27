function generateCards(deck, startingPoint, loopTimes) {
    for (let i = startingPoint; i < startingPoint + loopTimes; i++) {
        const card = deck[i];
        const uprightLinkId = `card-link-upright-${card.number}`;
        const reverseLinkId = `card-link-reverse-${card.number}`;

        document.write(`
          <div class="card-deck">
            <div class="card mb-3" style="width: 540px">
                <div class="row no-gutters align-items-center">
                    <div class="col-md-4">
                        <img src="${card.img}" class="card-img-top p-2" alt="${card.name}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${card.name} 正位</h5>
                            <br>
                            <p class="card-text"><strong>关键词：</strong>${card.kw}</p>
                            <br>
                            <footer>
                                <a href="#" class="card-link" id="${uprightLinkId}">查看详情</a>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mb-3" style="width: 540px">
                <div class="row no-gutters align-items-center">
                    <div class="col-md-4">
                        <img src="${card.img}" class="card-img-top p-2" alt="${card.name} reverse" style="transform: scaleY(-1);">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${card.name} 逆位</h5>
                            <br>
                            <p class="card-text"><strong>关键词：</strong>${card.rkw}</p>
                            <br>
                            <a href="#" class="card-link text-bottom" id="${reverseLinkId}">查看详情</a>
                        </div>
                    </div>
                </div>
            </div>
          </div>          
        `);

        const openUpright = document.getElementById(uprightLinkId);
        const openReverse = document.getElementById(reverseLinkId);

        openUpright.addEventListener('click', () => generatePages(card, '正位'));
        openReverse.addEventListener('click', () => generatePages(card, '逆位'));

    }

}


function generatePages(card, orientation) {
    const curPosition = window.scrollY;

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
        integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">

        <script src="js/styles.js"></script>
        <link rel="stylesheet" href="css/intro_style.css">

        <title>${card.name} - ${orientation}</title>

    </head>

    <body>
    <style>
        @font-face {
            font-family: 'STZhongsong';
            src: url(font/chinese.stzhongs.ttf);
        }

        .card-link {
            cursor: pointer;
        }
    </style>
        <div id="background">
            <canvas id="canvas"></canvas>
        </div>


        <div class="row justify-content-center align-items-center">        
            <div class="card p-3 m-3 card-test" style="max-width: 1000px;">
                <div class="row no-gutters">
                    <div class="col-md-4 d-flex align-items-center">
                        <img src="${card.img}" alt="${card.name}" style="${orientation === '正位' ? "" : "transform: scaleY(-1)"}" class="img-fluid p-4">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h1 class="card-title">${card.name} - ${orientation}</h1>
                            <br>
                            <p class="card-text">
                                <strong>关键词：</strong>
                            <p>${orientation === '正位' ? card.kw : card.rkw}</p>
                            </p>
                            <br>
                            <p class="card-text"><strong>释义：</strong>
                            <p>
                                ${orientation === '正位' ? card.desc : card.rdesc}
                            </p>
                            </p>
                            <br>
                            <a id="closeWindow" class="card-link">返回</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script>
            backgroundParticles();

            document.getElementById('closeWindow').addEventListener('click', function() {
                window.close();
            });

        </script>

    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct"
        crossorigin="anonymous"></script>

</body>

</html>
    `;

    const newWindow = window.open();
    newWindow.document.write(htmlContent);
    newWindow.document.close();

    // remain the same position after closing the window
    setTimeout(() => {
        window.scrollTo(0, curPosition);
    }, 100);
}