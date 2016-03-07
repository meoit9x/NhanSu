function Department() {
    var self = this;

    self.departmentTable = $("#department");
    self.table = {};
    self.rows_selected = [];

    // chạy khi page nó load
    self.init = function () {
        self.table = $(self.departmentTable).DataTable({
            "bDestroy": true,
            "bProcessing": true,
            "oSearch": { "bSmart": false, "bRegex": true },
            "sDom": 't<pl>',
            "sAjaxSource": Config.Url + 'Department/GetDepartment',
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
                { "mData": "mabophan" },
                { "mData": "tenbophan" },
                {
                    "mData": "isproduce",
                    render: function (data, type, row) {
                        if (type === 'display') {
                            return '<input type="checkbox" disabled ' + (row.isproduce ? 'checked' : '') + ' class="editor-active">';
                        }
                        return data;
                    },
                    className: "dt-body-center"
                }
            ],
            "language": {
                "emptyTable": "Không có bản ghi nào."
            }
        });
    }

    self.RefreshTableUser = function (tableId, urlData) {
        $.getJSON(urlData, null, function (json) {
            departmentTable = $(tableId).dataTable();
            oSettings = departmentTable.fnSettings();

            departmentTable.fnClearTable(this);

            for (var i = 0; i < json.data.length; i++) {
                departmentTable.oApi._fnAddData(oSettings, json.data[i]);
            }

            oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
            departmentTable.fnDraw();
        });
    }

    self.DeleteMulti = function () {
        $.ajax({
            url: Config.Url + 'Department/DeleteMultiDepartment',
            async: false,
            traditional: true,
            data: {
                ids: self.rows_selected
            },
            dataType: "json",
            type: "POST",
            success: function (result) {
                if (result.Status == true) {
                    alert("Xóa chức vụ thành công !");
                    self.rows_selected = [];
                    self.RefreshTableUser($(self.departmentTable), Config.Url + 'Department/GetDepartment');
                }
            }
        });
    }

    $("#addDepartment").click(function () {
        $("#hdId").val("");
        $("#txtCode").val("");
        $("#txtName").val("");
        $("#departmentModal").modal('show');
    });

    // nút lưu
    $("#deleteMultiDepartment").click(function () {
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
    $('#saveDepartment').click(function () {
        var id = $("#hdId").val();
        var mabophan = $("#txtCode").val();
        var tenbophan = $("#txtName").val();
        var isproduct = $('#cbSanXuat').is(':checked');
        if (!id) {
            $.ajax({
                url: Config.Url + 'Department/AddDepartment',
                async: false,
                data: {
                    mabophan: mabophan, tenbophan: tenbophan, isproduct: isproduct
                },
                type: "POST",
                success: function (result) {
                    if (result.Status == true) {
                        alert("Cập nhật thông tin thành công !");
                        self.RefreshTableUser($(self.departmentTable), '/Department/GetDepartment');
                        $("#departmentModal").modal('hide');
                    }
                }
            });
        }
        else {
            $.ajax({
                url: Config.Url + 'Department/EditDepartment',
                async: false,
                data: {
                    id: id, mabophan: mabophan, tenbophan: tenbophan, isproduct: isproduct
                },
                type: "POST",
                success: function (result) {
                    if (result.Status == true) {
                        alert("Cập nhật thông tin thành công !");
                        self.RefreshTableUser($(self.departmentTable), '/Department/GetDepartment');
                        $("#departmentModal").modal('hide');
                    }
                }
            });
        }
    });

    // Handle click on checkbox: khi người dùng click vào checkbox trên tbody
    $(self.departmentTable).on('click', 'input[type="checkbox"]', function (e) {

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
            $('#deleteDepartment').removeAttr("disabled");
        } else {
            $('#deleteDepartment').attr("disabled", "disabled");
        }
        // Prevent click event from propagating to parent
        e.stopPropagation();
    });

    // ấn nút xóa trong bảng
    $("#deleteDepartment").click(function (e) {
        var id = $("#hdId").val();
        bootbox.confirm("Bạn muốn xóa những đối tượng vừa chọn?", function (result) {
            if (result == true) {
                $.ajax({
                    url: Config.Url + 'Department/DeleteDepartment',
                    async: false,
                    data: { 'id': id },
                    type: "POST",
                    success: function (result) {
                        if (result.Status == true) {
                            $.gritter.add({ title: "Bộ phận", text: "Xóa chức vụ thành công !", image: "/Images/success.png", class_name: "clean", time: "1500" });
                            self.RefreshTableUser($(self.departmentTable), Config.Url + 'Department/GetDepartment');
                            $("#departmentModal").modal('hide');
                        }
                    }
                });
            }
        })
    });

    $(self.departmentTable).on('click', 'tr', function () {
        self.table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    });

    // ấn nút sửa trong bảng
    $(self.departmentTable).on('dblclick', 'tr', function (e) {
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
                    $('#cbSanXuat').prop('checked', result.data.isproduce);
                }
            }
        });
        $("#departmentModal").modal('show');
    });
}