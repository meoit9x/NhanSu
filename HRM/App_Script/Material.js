function Material() {
    var self = this;

    // chạy khi page nó load
    self.init = function () {
        self.LoadSpecification();
    }

    $("#search").click(function () {
        var from = $("#txtFrom").val();
        var to = $("#txtTo").val();
        var code = $("#txtCode").val();

        $.ajax({
            url: Config.Url + 'Material/Search',
            async: false,
            data: { from: from, to: to, code: code },
            type: "Get",
            success: function (result) {
                if (result.Status == true) {
                    result.data.forEach(function (value) {
                        var tr = $("<tr></tr>");
                        $(tr).append("<td>" + value.kho.stt + "</td>");
                        $(tr).append("<td>" + value.kho.ten_vt + "</td>");
                        $(tr).append("<td>" + value.kho.so_luong + "</td>");
                        $(tr).append("<td>" + value.kho.so_luong + "</td>");
                        $(tr).append("<td>" + value.kho.tien_nt + "</td>");
                        $(tr).append("<td>" + value.kho.sl_hop + "</td>");
                        $(tr).append("<td>" + (value.dmvt == null ? "" : value.dmvt.ma_td1) + "</td>");
                        $(tr).append("<td>" + (value.dmvt == null ? "" : value.dmvt.sl_td1) + "</td>");
                        $(tr).append("<td>" + (value.dmvt == null ? "" : value.dmvt.packs) + "</td>");
                        $(tr).append("<td>" + (value.dmvt == null ? "" : value.dmvt.tlc) + "</td>");
                        $("#material tbody").append(tr);
                    });
                }
            }
        });
    })

}