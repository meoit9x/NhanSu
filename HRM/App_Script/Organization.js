function Organization() {
    var self = this;

    self.organizationTable = $("#company");
    self.table = {};
    self.rows_selected = [];

    // chạy khi page nó load
    self.init = function () {
        self.table = $(self.organizationTable).DataTable({
            "bDestroy": true,
            "bProcessing": true,
            "oSearch": { "bSmart": false, "bRegex": true },
            "sDom": 't<pl>',
            "sAjaxSource": Config.Url + 'Organization/GetAllOrganization',
            "pagingType": "full_numbers",
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "aoColumns": [
                {
                    mData: "id",
                    'width': '15px',
                    searchable: false,
                    orderable: false,
                    render: function (data, type, row, meta) {
                        var index = meta.row + 1;
                        return index;
                    },
                    className: "dt-body-center"
                },
                { "mData": "macongty" },
                { "mData": "tencongty" }
            ],
            "language": {
                "emptyTable": "Không có bản ghi nào."
            }
        });
    }

    self.RefreshTableUser = function (tableId, urlData) {
        $.getJSON(urlData, null, function (json) {
            organizationTable = $(tableId).dataTable();
            oSettings = organizationTable.fnSettings();

            organizationTable.fnClearTable(this);

            for (var i = 0; i < json.data.length; i++) {
                organizationTable.oApi._fnAddData(oSettings, json.data[i]);
            }

            oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
            organizationTable.fnDraw();
        });
    }

    self.DeleteMulti = function () {
        $.ajax({
            url: Config.Url + 'Organization/DeleteMultiPosition',
            async: false,
            traditional: true,
            data: {
                ids: self.rows_selected
            },
            dataType: "json",
            type: "POST",
            success: function (result) {
                if (result.Status == true) {
                    alert("Xóa chức vụ công ty này !");
                    self.rows_selected = [];
                    self.RefreshTableUser($(self.organizationTable), Config.Url + 'Position/GetAllPosition');
                }
            }
        });
    }

    $("#addOrganization").click(function () {
        $("#hdId").val("");
        $("#txtCode").val("");
        $("#txtName").val("");
        $("#organizationModal").modal('show');
    });

    

    // nút lưu
    $('#saveOrganization').click(function () {
        var id = $("#hdId").val();
        var macongty = $("#txtCode").val();
        var tencongty = $("#txtName").val();

        if (!id) {
            $.ajax({
                url: Config.Url + 'Organization/AddOrganization',
                async: false,
                data: {
                    macongty: macongty, tencongty: tencongty
                },
                type: "POST",
                success: function (result) {
                    if (result.Status == true) {
                        alert("Cập nhật thông tin thành công !");

                        self.RefreshTableUser($(self.organizationTable), '/Organization/GetAllOrganization');
                        $("#organizationModal").modal('hide');
                    }
                }
            });
        }
        else {
            $.ajax({
                url: Config.Url + 'Organization/EditOrganization',
                async: false,
                data: {
                    id: id, macongty: macongty, tencongty: tencongty
                },
                type: "POST",
                success: function (result) {
                    if (result.Status == true) {
                        alert("Cập nhật thông tin thành công !");
                        self.RefreshTableUser($(self.organizationTable), '/Organization/GetAllOrganization');
                        $("#organizationModal").modal('hide');
                    }
                }
            });
        }
    });

   

    // ấn nút xóa trong bảng
    $("#deleteOrganization").click(function (e) {
        var id = $("#hdId").val();
        bootbox.confirm("Bạn muốn xóa những đối tượng vừa chọn?", function (result) {
            if (result == true) {
                $.ajax({
                    url: Config.Url + 'Organization/DeleteOrganization',
                    async: false,
                    data: { 'id': id },
                    type: "POST",
                    success: function (result) {
                        if (result.Status == true) {
                            $.gritter.add({ title: "Công ty", text: "Xóa công ty thành công !", image: "/Images/success.png", class_name: "clean", time: "1500" });
                            self.RefreshTableUser($(self.organizationTable), Config.Url + 'Organization/GetAllOrganization');
                            $("#organizationModal").modal('hide');
                        }
                    }
                });
            }
        })
    });

    $(self.organizationTable).on('click', 'tr', function () {
        self.table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    });

    // ấn nút sửa trong bảng
    $(self.organizationTable).on('dblclick', 'tr', function (e) {
        var $row = $(this);
        // Get row data
        var data = self.table.row($row).data();
        // Get row ID
        var rowId = data["id"];
        $.ajax({
            url: Config.Url + 'Organization/GetOrganizationById',
            async: false,
            data: { 'id': rowId },
            type: "Get",
            success: function (result) {
                if (result.Status == true) {
                    $("#hdId").val(rowId);
                    $('#txtCode').val(result.data.macongty);
                    $('#txtName').val(result.data.tencongty);
                }
            }
        });
        $("#organizationModal").modal('show');
    });
}