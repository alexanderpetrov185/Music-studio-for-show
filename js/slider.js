$(document).ready(sliderCount);

$(window).resize(function () {
    let slidesToShow;
    if ($(document).width() < 785) {
        slidesToShow = 2;
        if ($(document).width() < 500) {
            slidesToShow = 1;
        }
    }
    else {
        slidesToShow = 3;
    }

    const container = $('.slider__container');
    const item = $('.slider__item');
    const margin = parseInt($(item).css('margin-left')) + parseInt($(item).css('margin-right'));
    const fullItemWidth = container.width() / slidesToShow - margin;

    item.each(function (index, item) {
        $(item).css({
            minWidth: fullItemWidth,
        });
    });

    initSlider(slidesToShow);
});


function sliderCount() {
    if ($(document).width() < 900) {
        initSlider(2);
        if ($(document).width() < 600) {
            initSlider(1);
        }
    }
    else {
        initSlider(3);
    }
}

function initSlider(slidesCount) {
    // console.log("initSlider start")
    let position = 0; //start position
    let slidesToShow = slidesCount;
    const slidesToScroll = 1;
    const container = $('.slider__container');
    const track = $('.slider__track');
    const item = $('.slider__item');
    const btnPrev = $('.slider__btn-prev');
    const btnNext = $('.slider__btn-next');
    const itemsCount = item.length;
    const margin = parseInt($(item).css('margin-left')) + parseInt($(item).css('margin-right'));

    const itemWidth = container.width() / slidesToShow;
    const fullItemWidth = container.width() / slidesToShow - margin;
    const movePosition = slidesToScroll * itemWidth;

    item.each(function (index, item) {
        $(item).css({
            minWidth: fullItemWidth,
        });
    });

    btnNext.click(function () {
        const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth; // получаем оставшееся количество слайдов отнимая число проскролленных

        position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
        setPosition();
        checkBtns();
    });

    btnPrev.click(function () {
        const itemsLeft = Math.abs(position) / itemWidth;

        position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
        setPosition();
        checkBtns();
    });

    const setPosition = () => {
        track.css({
            transform: `translateX(${position}px)`
        });
    };

    const checkBtns = () => {
        btnPrev.prop('disabled', position === 0);
        btnNext.prop(
            'disabled',
            position <= -(itemsCount - slidesToShow) * itemWidth
        );
    };

    checkBtns();
}
