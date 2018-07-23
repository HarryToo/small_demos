var imgArr = ['images/pidan.jpg', 'images/heiniu.jpg', 'images/xiaoqiang.jpg', 'images/pangdun.jpg', 'images/congtou.jpg', 'images/baobao.jpg'];
var currCard = null, eliminateNum = 0;

// 初始化
function init() {
    var html = '';
    for (var i = 0; i < 2; i++) {
        // 打乱牌序
        imgArr.sort(function () {
            return (0.5 - Math.random());
        });
        for (var j = 0; j < imgArr.length; j++) {
            html += '<li class="animated"><div class="animated"></div><img src="' + imgArr[j] + '" class="animated"></li>';
        }
    }
    // 发牌
    $('ul').html(html);
    handle();
}

init();

// 点击事件处理
function handle() {
    $('ul').on('click', 'li div', function () {
        var $this = $(this).parent();
        openCard($this);
        if (currCard === null) {
            // 记录下翻到的第一张牌
            currCard = $this;
        } else {
            // 翻第二张牌
            if (currCard.find('img').attr('src') === $this.find('img').attr('src')) {
                // 若匹配为一对，则消除这两张牌
                eliminateCard($this, currCard);
            } else {
                // 如不匹配，则重新盖上这两张牌
                closeCard(currCard);
                closeCard($this);
            }
            // 无论如何，翻开二张后重置之前翻到的牌
            currCard = null;
        }
    });
}

// 翻开
function openCard(item) {
    item.find('div').removeClass('flipInY').addClass('flipOutY');
    setTimeout(function () {
        item.find('img').removeClass('flipOutY').addClass('flipInY');
    }, 250);
}

// 盖上
function closeCard(item) {
    setTimeout(function () {
        item.find('img').removeClass('flipInY').addClass('flipOutY');
        setTimeout(function () {
            item.find('div').removeClass('flipOutY').addClass('flipInY');
        }, 250);
    }, 400);
}

// 消除
function eliminateCard(item1, item2) {
    // 消除数量
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