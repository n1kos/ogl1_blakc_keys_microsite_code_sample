/**
 * Created by nik on 11/4/2015.
 */
//this was used to scroll on the first page, but a hyperlink will be used instead with the relevant code
/*(function($) {
    $.fn.goTo = function() {
        $('html, body').animate({
            scrollTop: $(this).offset().top + 'px'
        }, 'fast');
        return this; // for chaining...
    }
})(jQuery);*/
var lastClicked = "";


function evaluateUpload(){
    var result = false;
    if ($($("input[name='whatsapnumber']")[0]).val() != "" && $("input[name='acceptterms']")[0].checked) {
        result = true;
    }
    return result;
}

function validateInput() {
    if (evaluateUpload())  {//if more controls are added, this will not reference them coorectrly, never mind for now
        $("button[name='submitall']").removeAttr('disabled');
    } else {
        $("button[name='submitall']").attr('disabled', 'disabled');
    }
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 190 && charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        (charCode < 96 || charCode > 105) &&
        (charCode < 37 || charCode > 40) &&
        charCode != 110 && charCode != 8 && charCode != 46) {
        return false;
    } else {
        return true;
    }
}


$( document ).ready(function() {
   /*$(".arrow-down-img").on("click", function(evt) {
      $(".section2").goTo();
   });*/
    //replaced with below
    $('a.scrolling[href^=#]').on("click",function(e){
    var t= $(this.hash);
    var t=t.length&&t||$('[name='+this.hash.slice(1)+']');
    if(t.length){
        var tOffset=t.offset().top;
        $('html,body').animate({scrollTop:tOffset-20},'slow');
        e.preventDefault();
    }
    });

    function addScroll() {
        $("a.extraBehaviourOn").on("click", function(e){
            //alert("clicked");
            $('html,body').css('overflow-y','hidden');
        });

        $("a.close").on("click", function(e){
            $('html,body').css('overflow-y','auto');
        });
    }

    //if (window.webkitURL) {//no need to add it for ff, we ll see for ie
        addScroll();//so if we are having two separate popups, obviously we either wrap both in a div and add the event there (makes sense) or add a second or more) listener
    //}

    Dropzone.autoDiscover = true;

    Dropzone.options.myAwesomeDropzone  = {
        //previewTemplate: document.querySelector('#preview-template').innerHTML,
        parallelUploads: 1,
        uploadMultiple: false,
        maxFiles: 1,
        previewsContainer: "div.dropzone-previews",
        acceptedFiles: "image/*",
        //paramName : "the name the server accepts as the post parameter"
        autoProcessQueue : false,
        thumbnailHeight: 290,
        thumbnailWidth: 390,
        maxFilesize: 1,
        clickable : "span#fileupload",
        previewTemplate : document.querySelector('#preview-template').innerHTML,
        filesizeBase: 1000000,

        init: function() {
            this.on("addedfile", function(file) {
                //alert(file.size + "/" +  this.options.maxFilesize * this.options.filesizeBase);
                if (file.size >= this.options.maxFilesize * this.options.filesizeBase){
                    alert("Added file is too large. Max filesize is " + this.options.maxFilesize * this.options.filesizeBase + "kB");
                    this.reset();//force it to break
                }
            });
            this.on("thumbnail", function(file, dataUrl) { $(".popup .c1 > div:first-child").css("margin-top", "-" +  $(".popup .c1 > div:first-child").height() + "px");});
            this.on("complete", function(file) {
                //alert("wfjnfwuhfuiwfwhuifhwifwnefuin")
                $(".popup .c1 > div:first-child").css("margin-top", "-" +  $(".popup .c1 > div:first-child").height()*2 + "px");
            });

            this.on("sending", function(file, xhr, formData) {
                // Will send the filesize along with the file as POST data. could it be thie simple????
                formData.append("whatsapnumber",  $("input[name='whatsapnumber']:first-child").val());
            });

            this.on("success", function(file) {
                //$(".popup .c1 > div:first-child").remove();
                //$(".popup .c1 > div:first-child").remove();
            });

        }
    };

    $("input[name='acceptterms']").on("click", function() {
        if (evaluateUpload()) {
            $("button[name='submitall']").removeAttr('disabled');
        } else {
            $("button[name='submitall']").attr('disabled', 'disabled');
        }
    });

    $("button[name='submitall']").on("click", function(evt){
        var myDropzone = Dropzone.forElement("#my-awesome-dropzone");//which is very well documented (not even mutherfucke
        evt.preventDefault();
        evt.stopPropagation();
        myDropzone.processQueue();
    });

    //otan tre3ei to event to ready

    $(".swiper-slide ").each(function( index, value ) {
        var fulldata =  $(this).data("info");
        var namedata = fulldata.substr(0, fulldata.search("#"));
        var datedata = fulldata.substr(fulldata.search("#")+1, fulldata.length);
        $(this).prepend('<span class="infodata">' + namedata + '<br><span>' +  datedata + '</span></span>');
    });
    /*
    $( ".swiper-slide" ).hover(
        function() {
            $( this ).addClass( "hovered" );
            $(this).children().eq(1).addClass( "hovered" );
        }, function() {
            $( this ).removeClass( "hovered" );
            $(this).children().eq(1).removeClass( "hovered" );
        }
    );


    $( ".swiper-slide" ).on("click", function (evt) {
        $( this ).removeClass( "hovered" );
        $(this).children().eq(1).removeClass( "hovered" );
        $(this).children().eq(1)[0].click();
    });*/

    function appendData(theSource, theInfo) {
        var namedata = theInfo.substr(0, theInfo.search("#"));
        var datedata = theInfo.substr(theInfo.search("#")+1, theInfo.length);
        var theInfoMerge = namedata + '<br><span>' +  datedata + '</span>';
        document.querySelector(".infoImage_mini").src = theSource;
        document.querySelector(".infodata_mini").innerHTML = theInfoMerge;
    }

    function getInfoToPopup(currentElement){
        var theSource = currentElement.src;
        var theInfo = currentElement.parentNode.getAttribute("data-info");
        appendData(theSource, theInfo);
    };

    function cleanAllGalleryHovers() {
        $(".hovered").removeClass("hovered");
    }

    function showGalleryImages(currentElement) {
        getInfoToPopup(currentElement);
    }

    function overGallery(evt, that){
        var clickedElement = evt.target;
        //alert(clickedElement);
        if (clickedElement.parentNode.classList.contains("swiper-slide")){
            cleanAllGalleryHovers();
            $(clickedElement.parentNode).addClass("hovered");
        }
    }

    function clickGallery(evt, that){
        var clickedElement = evt.target;
        //alert(clickedElement);
        if (clickedElement.parentNode.classList.contains("swiper-slide")){
            cleanAllGalleryHovers();
            //prepare the content of the popup
            //force the clicked element to always be the image
            if (clickedElement.nodeName != "IMG") {
                lastClicked = clickedElement.parentNode.querySelector("img");
            } else {
                lastClicked = clickedElement;
            }
            //$(clickedElement.parentNode).addClass("hovered");
        } else if (clickedElement.classList.contains("galarrows")) {
            if (clickedElement.classList.contains("next")) {
                lastClicked = lastClicked.parentNode.nextSibling.childNodes(2);
            } else {
                lastClicked = lastClicked.parentNode.previousSibling.childNodes(2);
            }
        }
        showGalleryImages(lastClicked);
        $("a.clickImage")[0].click();
    }


    document.querySelector(".swiper-wrapper").addEventListener("click", function(evt) { clickGallery(evt, this); });
    document.querySelector(".swiper-wrapper").addEventListener("mouseover", function(evt) { overGallery(evt, this); });
    document.querySelector(".swiper-wrapper").addEventListener("mouseleave", function(evt) { cleanAllGalleryHovers(evt, this); });
});

