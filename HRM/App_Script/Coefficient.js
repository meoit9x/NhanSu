function Coefficient() {
    var self = this;

    self.coefficientTable = $("#coefficient");
    self.table = {};
    self.rows_selected = [];
    self.ListDetail = [];

    // chạy khi page nó load
    self.init = function () {
        self.table = $(self.coefficientTable).DataTable({
            "bDestroy": true,
            "bProcessing": true,
            "oSearch": { "bSmart": false, "bRegex": true },
            "sDom": 't<pl>',
            "sAjaxSource": Config.Url + 'Coefficient/GetAllCoefficient',
            "pagingType": "full_numbers",
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "aoColumns": [
                {
                    mData: "id",
                    'width': '15px',
                    searchable: false,
                    orderable: false,
                    render: function (data, type, row) {
                        if (type === 'display') {
                            return '<input type="checkbox" class="editor-active">';
                        }
                        return data;
                    },
                    className: "dt-body-center"
                },
                { "mData": "tenheso" },
                { "mData": "thongso" },
                { "mData": "bophan" },
                { "mData": "nguoitao" },
                { "mData": "ngaytao" }
            ],
            "order": [1, 'asc'],
            "language": {
                "emptyTable": "Không có bản ghi nào."
            }
        });
    }

    self.RefreshTableUser = function (tableId, urlData) {
        $.getJSON(urlData, null, function (json) {
            coefficientTable = $(tableId).dataTable();
            oSettings = coefficientTable.fnSettings();

            coefficientTable.fnClearTable(this);

            for (var i = 0; i < json.data.length; i++) {
                coefficientTable.oApi._fnAddData(oSettings, json.data[i]);
            }

            oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
            coefficientTable.fnDraw();
        });
    }

    self.DeleteMulti = function () {
        $.ajax({
            url: Config.Url + 'Coefficient/DeleteMultiCoefficient',
            async: false,
            traditional: true,
            data: {
                ids: self.rows_selected
            },
            dataType: "json",
            type: "POST",
            success: function (result) {
                if (result.Status == true) {
                    alert("Xóa Quy cách thành công !");
                    self.rows_selected = [];
                    self.RefreshTableUser($(self.coefficientTable), Config.Url + 'Coefficient/GetAllCoefficient');
                }
            }
        });
    }

    $("#addCoefficient").click(function () {
        $("#hdId").val("");
        $("#txtName").val("");
        $("#txtDepartment").val("");
        $("#txtCoefficient").val("");
        self.ListDetail = [];
        $("#coefficientModal").modal('show');
    });

    $("#addDetail").click(function () {
        $("#hdIdDetail").val("");
        $("#txtFrom").val("");
        $("#txtTo").val("");
        $("#detailModal").modal('show');
    });

    // nút lưu
    $("#deleteMultiCoefficient").click(function () {
        // Confirm user want to delete record: Xác nhận người dùng muốn xóa
        if (self.rows_selected.length > 0) {
            bootbox.confirm("Bạn muốn xóa những đối tượng vừa chọn?", function (result) {
                if (result == true) {
                    self.DeleteMulti();
                }
            });
        }
        else {
            alert("Bạn vui lòng chọn bản ghi cần xóa !");
        }
    });

    // nút lưu
    $('#saveCoefficient').click(function () {
        var id = $("#hdId").val();
        var tenheso = $("#txtName").val();
        var idbophan = $("#txtDepartment").val();
        var thongso = $("#txtCoefficient").val();

        if (!id) {
            $.ajax({
                url: Config.Url + 'Coefficient/AddCoefficient',
                async: false,
                data: {
                    tenquycach: tenquycach
                },
                type: "POST",
                success: function (result) {
                    if (result.Status == true) {
                        alert("Cập nhật thông tin thành công !");
                        self.RefreshTableUser($(self.coefficientTable), '/Coefficient/GetAllCoefficient');
                        $("#coefficientModal").modal('hide');
                    }
                }
            });
        }
        else {
            $.ajax({
                url: Config.Url + 'Coefficient/EditCoefficient',
                async: false,
                data: {
                    id: id, tenquycach: tenquycach
                },
                type: "POST",
                success: function (result) {
                    if (result.Status == true) {
                        alert("Cập nhật thông tin thành công !");
                        self.RefreshTableUser($(self.coefficientTable), '/Coefficient/GetAllCoefficient');
                        $("#coefficientModal").modal('hide');
                    }
                }
            });
        }


    });

    // nút lưu detail
    $('#saveDetail').click(function () {
        var item = {};
        item.id = $("#hdIdDetail").val();
        item.from = $("#txtFrom").val();
        item.to = $("#txtTo").val();

        self.ListDetail.push(item);

        $("#detailModal").modal('hide');
    });

    // Handle click on checkbox: khi người dùng click vào checkbox trên tbody
    $(self.coefficientTable).on('click', 'input[type="checkbox"]', function (e) {

        var $row = $(this).closest('tr');
        // Get row data
        var data = self.table.row($row).data();
        // Get row ID
        var rowId = data["id"];

        // Determine whether row ID is in the list of selected row IDs
        var index = $.inArray(rowId, self.rows_selected);

        // If checkbox is checked and row ID is not in list of selected row IDs
        if (this.checked && index === -1) {
            self.rows_selected.push(rowId);

            // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
        } else if (!this.checked && index !== -1) {
            self.rows_selected.splice(index, 1);
        }

        if (this.checked) {
            $row.addClass('selected');
        } else {
            $row.removeClass('selected');
        }
        if (self.rows_selected.length > 0) {
            $('#deleteCoefficient').removeAttr("disabled");
        } else {
            $('#deleteCoefficient').attr("disabled", "disabled");
        }
        // Prevent click event from propagating to parent
        e.stopPropagation();
    });

    // ấn nút xóa trong dialog
    $("#deleteCoefficient").click(function (e) {
        var id = $("#hdId").val();
        bootbox.confirm("Bạn muốn xóa những đối tượng vừa chọn?", function (result) {
            if (result == true) {
                $.ajax({
                    url: Config.Url + 'Coefficient/DeleteCoefficient',
                    async: false,
                    data: { 'id': id },
                    type: "POST",
                    success: function (result) {
                        if (result.Status == true) {
                            $.gritter.add({ title: "Quy cách", text: "Xóa Quy cách thành công !", image: "/Images/success.png", class_name: "clean", time: "1500" });
                            self.RefreshTableUser($(self.coefficientTable), Config.Url + 'Coefficient/GetAllCoefficient');
                            $("#coefficientModal").modal('hide');
                        }
                    }
                });
            }
        })
    });

    $(self.coefficientTable).on('click', 'tr', function () {
        self.table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    });

    // ấn nút xóa trong bảng
    $(self.coefficientTable).on('dblclick', 'tr', function (e) {
        var $row = $(this);
        // Get row data
        var data = self.table.row($row).data();
        // Get row ID
        var rowId = data["id"];
        $.ajax({
            url: Config.Url + 'Coefficient/GetCoefficientById',
            async: false,
            data: { 'id': rowId },
            type: "Get",
            success: function (result) {
                if (result.Status == true) {
                    $("#hdId").val(rowId);
                    $('#txtCode').val(result.data.tenquycach);
                }
            }
        });
        $("#coefficientModal").modal('show');
    });
}