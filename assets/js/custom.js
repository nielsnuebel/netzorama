(function($){
    $(document).ready(function() {
        $(".menu-trigger").click(function () {
            $(this).toggleClass("active");
            $("nav,body").toggleClass("active");
            });



        $('#main').click(function () {
            $("body,.menu-trigger").removeClass("active");
        });
    });
})(this.jQuery);