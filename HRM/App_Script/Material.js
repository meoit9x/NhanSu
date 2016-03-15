function Material() {
    var self = this;
    self.materialTable = $("#material");
    self.materials = [];

    $("#search").click(function () {
        parent.ShowLoading();
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
                        var tr = $("<tr data-detail='" + value.kho.ma_vt + "'></tr>");
                        $(tr).append("<td>" + value.kho.stt + "</td>");
                        $(tr).append("<td>" + value.kho.ten_vt + "</td>");
                        $(tr).append("<td>" + value.kho.so_luong + "</td>");
                        $(tr).append("<td>" + value.kho.sl_hop + "</td>");
                        $(tr).append("<td>" + (value.kho.sl_hop * (value.dmvt == null ? 0 : value.dmvt.sl_td1)) + "</td>");
                        $("#material tbody").append(tr);
                        self.materials.push(value);
                    });
                    parent.HideLoading();
                }

            }
        });
    });

    // ấn nút sửa trong bảng
    $(self.materialTable).on('dblclick', 'tr', function (e) {
        var rowId = $(this).data("detail");

        var item = self.materials.filter(function (item) {
            return item.kho.ma_vt == rowId;
        })[0];

        $('#materialName').text(item.kho.ten_vt);
        $('#quanlityKG').text(item.kho.so_luong);
        $('#quanlityBox').text(item.kho.sl_hop);
        $('#quanlity').text((item.kho.sl_hop * (item.dmvt == null ? 0 : item.dmvt.sl_td1)));
        $('#materialName').text(item.kho.ten_vt);

        
        $("#materialModal").modal('show');
    });
}