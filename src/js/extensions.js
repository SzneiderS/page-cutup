function navbarsCollapseHandler() {
    var navbars = $("nav.navbar-expand-auto");
    for (var i = 0; i < navbars.length; i++) {
        var toggler = $(navbars[i]).find(".navbar-toggler")[0];
        var collapse = $(navbars[i]).find(".navbar-collapse")[0];
        $(collapse).addClass("show");
        var collapseWidth = collapse.scrollWidth;
        var navbarWidth = $(navbars[i]).width();
        $(collapse).removeClass("show");
        if ((navbarWidth > collapseWidth) || (navbarWidth.toFixed(2) === collapseWidth.toFixed(2))) {
            $(collapse).addClass("show");
            $(toggler).removeClass("show");
        }
        else {
            $(collapse).removeClass("show");
            $(toggler).addClass("show");
        }
    }
}

function getFloatData(object, property, defaultsTo) {
    var prop = object.dataset[property];
    if (prop === "") {
        return defaultsTo;
    }
    else {
        prop = parseFloat(prop);
        if (isNaN(prop)) {
            return defaultsTo;
        }
    }
    return prop;
}

function clamp(min, val, max) {
    if (val < min)
        return min;
    if (val > max)
        return max;
    return val;
}

function parallaxHandler() {
    var parallax_imgs = $("img.parallax");
    var top_scroll_pos = document.documentElement.scrollTop;
    var viewport_height = window.innerHeight;
    var client_pos_middle = top_scroll_pos + viewport_height * 0.5;
    for (var i = 0; i < parallax_imgs.length; i++) {

        var img = parallax_imgs[i];
        var img_rect = img.getBoundingClientRect();
        var parent = img.parentElement;

        var parallaxTransition = getFloatData(img, "parallaxTransition", 2);
        img.style.transition = "top " + parallaxTransition + "s";

        var parent_pos_start = $(parent).offset().top;
        var parent_pos_end = parent_pos_start + parent.clientHeight;
        var parent_pos_middle = (parent_pos_end - parent_pos_start) * 0.5 + parent_pos_start;

        var max_offset = parent.clientHeight - img_rect.height;

        if (client_pos_middle >= parent_pos_start && client_pos_middle <= parent_pos_end) {
            var offset = (parent_pos_start - client_pos_middle) * 0.5;
            img.style.top = clamp(max_offset, (parent_pos_start - client_pos_middle), 0) + "px";
        }
        else if (client_pos_middle < parent_pos_start) {
            img.style.top = "0px";
        }
        else if (client_pos_middle > parent_pos_end) {
            img.style.top = max_offset + "px";
        }
    }
}

$(document).ready(function () {
    navbarsCollapseHandler();
    parallaxHandler();
});

$(window).resize(function () {
    navbarsCollapseHandler();
    parallaxHandler();
});

$(window).scroll(function () {
    parallaxHandler();
});

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();
    var obj = $("a[name='" + $.attr(this, 'href').replace('#', '') + "']");

    var anchor_y_offset = 0;
    if (obj[0].dataset != undefined) {
        anchor_y_offset = getFloatData(obj[0], "anchorYOffset", 0.0);
    }

    $('html, body').animate({
        scrollTop: obj.offset().top - anchor_y_offset
    }, 500);
});
