$(document).ready(function() {
    $('.section-team.employees .row .person-tile').click(function(item) {
        //$(item).data("linkedin-url")
        // console.log($(item))
        // console.log($(this))
        // alert($(this).data("linkedin-url"))
        window.open($(this).data("linkedin-url"), '_blank');
    })



    var $videoSrc;  
    $('.video-btn').click(function() {
        $videoSrc = $(this).data( "src" );
    });
      
    // autoplay when the modal is opened
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#landing-page .purple-button").addClass("hide")

        $("#video").attr("src",$videoSrc);

        $(".video-btn").css("opacity",0.0)
    })
    // stop playing the video modal is closed
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#landing-page .purple-button").removeClass("hide")

        $("#video").attr('src',""); 
        $(".video-btn").css("opacity",1.0)
    })




    $("#emailModal").on('shown.bs.modal', function (e) {
        console.log("WOOOO")
        
        $(".video-btn").css("opacity",0.0)
    })


    $("#emailModal").on('hide.bs.modal', function (e) {
        console.log("NOPE")

        $(".video-btn").css("opacity",1.0)
    })








})