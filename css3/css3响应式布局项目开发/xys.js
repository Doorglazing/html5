$('.btn').hover(function () {
    $('.btnList').show();
})
$('.btnList').on('mouseleave', function(){
    $('.btnList').hide();
})

$('#swiper').sliderImg({
    image:['./img/1.jpg','./img/2.jpg','./img/3.jpg'],
    href:['#','#','#']
})