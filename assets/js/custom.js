(function($){
    $(document).ready(function() {

        var owl = $("#owl-demo").owlCarousel({

            navigation : true,
            slideSpeed : 300,
            paginationSpeed : 400,
            singleItem:true,
            autoPlay: false,
            pagination: false,
            navigationText : false
        });

        $(".menu-trigger").click(function () {
            $(this).toggleClass("active");
            $("nav,body").toggleClass("active");
            setTimeout(
                function(){
                    var currentitem = $("#owl-demo").data('owlCarousel').currentItem;
                    $("#owl-demo").data('owlCarousel').reinit();
                    $("#owl-demo").data('owlCarousel').jumpTo(currentitem);
                },
                1000);
        });

        $(".text button").click(function () {
            $(".text_wrapper").stop(true,true).toggleClass("open");
        });
    });

})(this.jQuery);