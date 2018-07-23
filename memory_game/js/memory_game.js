var imgArr = ['images/pidan.jpg', 'images/heiniu.jpg', 'images/xiaoqiang.jpg', 'images/pangdun.jpg', 'images/congtou.jpg', 'images/baobao.jpg'];
var currCard = null, eliminateNum = 0;

function init() {
    var html = '';
    for (var i = 0; i < 2; i++) {
        imgArr.sort(function () {
            return (0.5 - Math.random());
        });
        for (var j = 0; j < imgArr.length; j++) {
            html += '<li class="animated"><div class="animated"></div><img src="' + imgArr[j] + '" class="animated"></li>';
        }
    }
    $('ul').html(html);
    handle();
}

init();

function handle() {
    $('ul').on('click', 'li div', function () {
        var $this = $(this).parent();
        openCard($this);
        if (currCard === null) {
            currCard = $this;
        } else {
            if (currCard.find('img').attr('src') === $this.find('img').attr('src')) {
                eliminateCard($this, currCard);
            } else {
                closeCard(currCard);
                closeCard($this);
            }
            currCard = null;
        }
    });
}

function openCard(item) {
    item.find('div').removeClass('flipInY').addClass('flipOutY');
    setTimeout(function () {
        item.find('img').removeClass('flipOutY').addClass('flipInY');
    }, 250);
}

function closeCard(item) {
    setTimeout(function () {
        item.find('img').removeClass('flipInY').addClass('flipOutY');
        setTimeout(function () {
            item.find('div').removeClass('flipOutY').addClass('flipInY');
        }, 250);
    }, 400);
}

function eliminateCard(item1, item2) {
    eliminateNum += 2;
    setTimeout(function () {
        item1.addClass('flipOutY');
        item2.addClass('flipOutY');
        if (eliminateNum === $('ul li').length) {
            setTimeout(function () {
                alert('通过！');
                location.reload();
            }, 250);
        }
    }, 400);
}