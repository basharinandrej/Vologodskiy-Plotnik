window.onload = function(){

    //Слайдер
    asNavFor: '.sl-nav'
    asNavFor: $('.sl-nav')[0]
    asNavFor: document.querySelector('.sl-nav')


    $('.sl-nav').flickity({
        pageDots: false
    });
    $('.sl-main').flickity({
        asNavFor: '.sl-nav',
        contain: true,
        pageDots: false,
        prevNextButtons: false,
    });


    // Dropdown
    let dropBtn = $('.dropdown-btn');

    for (let i = 0; i < dropBtn.length; i++) {
        dropBtn[i].onclick = function (e) {
            e.preventDefault();
            this.classList.toggle("active");
            let id = $(this).attr('data-dropdown');

            let panel = document.querySelector('#' + id);
            panel.classList.toggle("active");
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        }
    }

    // Video
    $('.video').click( function(e){
        e.preventDefault();
        $(this).children('iframe').show();
        $(this).toggleClass('video-opacity');
        $('.video__paragraph').hide();
        $('.video').css('background-image', 'none')
    })



    function imageComparison(selector) {

        let comparison = $(selector)
            .addClass('image-comparison')
            .prepend('<div class="image-comparison__before"></div>')
            .append('<button class="image-comparison__slider"></button>');

        let images = comparison
            .find('img')
            .addClass('image-comparison__image')
            .css('max-width', comparison.width());

        let before = comparison
            .find('.image-comparison__before')
            .append(images.eq(0));

        comparison
            .find('.image-comparison__slider')
            .on('dragstart', () => false) // отмена станд. drug&drop
            .on('mousedown touchstart', function(e) {
                console.log(this)
                let slider = $(this);
                let doc = $(document).on('mousemove touchmove', (e) => {
                    let offset = e.pageX - comparison.position().left;
                    let width = comparison.width();

                    // установим границы, чтобы ползунок не выходил
                    if (offset < 0) offset = 0;
                    if (offset > width) offset = width;

                    slider.css('left', offset + 'px');
                    before.css('width', offset + 'px');
                });

                doc.on('mouseup', () => doc.off('mousemove touchmove'));
            });
    }

    imageComparison('#image-comparison');

    $("[data-fancybox]").fancybox({ });

    // Плавный скролл до якоря
    $(function () {
        $('.anchor').click(function (e) {
            $('html,body').stop().animate({
                scrollTop: $('.place').offset().top
            }, 700);
            e.preventDefault();
        });
    });

    // Popup
    $('.modal-btn').click(function (e) {
        e.preventDefault();
        let modal = $(this).attr('data-modal');
        $('#' + modal).arcticmodal();
    });

    // Clone
    let aside = $('.aside').html();

    if (screen.width <= 1200 ) {
        $(aside).appendTo('.graphics-house__wrapper');
        $('.wrapper__aside.aside').hide();
    }

    // Burger
    $('.burger').click( function(e){
        e.preventDefault();
        $('.header').addClass('burger-active');
    })
    $('.header__box-link').click(function(e){
        e.preventDefault();
        $('.header').removeClass('burger-active');
    })

};