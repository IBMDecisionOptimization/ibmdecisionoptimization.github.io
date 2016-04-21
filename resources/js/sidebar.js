$('#sidebar-wrapper .collapsible-menu').on('shown.bs.collapse', function (e) {
    $(this).find(".glyphicon").removeClass("glyphicon glyphicon-plus").addClass("glyphicon glyphicon-minus");
});

$('#sidebar-wrapper .collapsible-menu').on('hidden.bs.collapse', function (e) {
    $(this).find(".glyphicon").removeClass("glyphicon glyphicon-minus").addClass("glyphicon glyphicon-plus");
});
