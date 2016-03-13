function Material() {
    var self = this;
    self.materialTable = $("#material");
    

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
                        var tr = $("<tr></tr>");
                        $(tr).append("<td>" + value.kho.stt + "</td>");
                        $(tr).append("<td>" + value.kho.ten_vt + "</td>");
                        $(tr).append("<td>" + value.kho.so_luong + "</td>");
                        $(tr).append("<td>" + value.kho.sl_hop + "</td>");
                        $(tr).append("<td>" + (value.kho.sl_hop * (value.dmvt == null ? 0 : value.dmvt.sl_td1)) + "</td>");
                        $("#material tbody").append(tr);
                    });
                    parent.HideLoading();
                }
            }
        });
    });


    // ấn nút sửa trong bảng
    $(self.materialTable).on('dblclick', 'tr', function (e) {
        var $row = $(this);
        // Get row data
        var data = self.table.row($row).data();
        // Get row ID
        var rowId = data["id"];
        $.ajax({
            url: Config.Url + 'Department/GetDepartmentById',
            async: false,
            data: { 'id': rowId },
            type: "Get",
            success: function (result) {
                if (result.Status == true) {
                    $("#hdId").val(rowId);
                    $('#txtCode').val(result.data.mabophan);
                    $('#txtName').val(result.data.tenbophan);
                    $('#cbSanXuat').attr('checked', result.data.isProduct);
                }
            }
        });
        $("#departmentModal").modal('show');
    });
}