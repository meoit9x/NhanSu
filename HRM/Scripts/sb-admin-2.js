$(function () {
    $('#side-menu').metisMenu();
});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function () {
    $(window).bind("load resize", function () {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
            $("#iframeContent").css("min-height", (height - 51) + "px");
        }
    });
    var url = window.location;

    $('#side-menu').on('click', 'a', function () {
        var href = $(this).attr('href');
        var id = $(this).data('iframe');
        var name = $(this).data('name');

        var tab = $('#iframeTab');
        var content = $('#iframeContent');

        $(tab).find('li').removeClass("active");
        $(content).find('div').removeClass("active in");

        var a = $(tab).find("a[href=#" + id + "]");
        var div = $(content).find("#" + id);

        if (a.length > 0) {
            $(a).parent().addClass("active");
            $(div).addClass("active in");
        }
        else {
            if (id) {
                var li = $("<li class='active'></li>");
                var a = $("<a href='#" + id + "' data-iframe='" + id + "' data-toggle='tab' aria-expanded='true'>" + name + "<span style='cursor: pointer;margin-left: 10px;' class='deleteTab glyphicon glyphicon-remove'></span></a>")
                $(li).append(a);
                $(tab).append(li);

                var iframe = $("<iframe width='100%' height='" + (height - 51) + "'></iframe>");
                var divContent = $("<div class='tab-pane fade active in' id='" + id + "'>");
                $(iframe).attr('src', href);
                $(divContent).append(iframe);
                $(content).append(divContent)
            }
        }
        return false;
    });
    $(".nav-tabs").on("click", "a", function (e) {
        e.preventDefault();
        if (!$(this).hasClass('add-contact')) {
            $(this).tab('show');
        }
    }).on('click', 'span', function () {
        var tab = $('#iframeTab');
        var content = $('#iframeContent');
        var id = $(this).parent().data('iframe');
        var div = $(content).find("#" + id);

        $(this).parent().parent().remove();
        $(div).remove();
        $(".nav-tabs li").children('a').first().click();
    });
});
