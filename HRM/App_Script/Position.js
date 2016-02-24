function Position() {
    var self = this;

    self.positionTable = $("#position");
    self.table = {};
    self.rows_selected = [];
    self.init = function () {
        self.table = $(self.positionTable).DataTable({
            "bDestroy": true,
            "bProcessing": true,
            "oSearch": { "bSmart": false, "bRegex": true },
            "sDom": 't<pl>',
            "sAjaxSource": Config.Url + 'Position/GetAllPosition',
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
                { "mData": "machucvu" },
                { "mData": "tenchucvu" },
                {
                    mData: "id",
                    className: "dt-body-center",
                    bSortable: false,
                    mRender: function (o) {
                        return "<span style='white-space: nowrap;'>" +
                            "<a data-id='" + o + "' class='position_edit btn btn-primary btn-sm'><i class='fa fa-pencil'></i></a>" +
                            "&nbsp;" +
                            "<a data-id='" + o + "' class='position_del btn btn-danger btn-sm' data-toggle='modal' data-table='#modalconfirm'><i class='fa fa-times'></i></a>" +
                            "</span>";
                    }
                }
            ],
            "order": [1, 'asc'],
            "language": {
                "emptyTable": "Không có bản ghi nào."
            }
        });
    }

    self.RefreshTableUser = function (tableId, urlData) {
        $.getJSON(urlData, null, function (json) {
            positionTable = $(tableId).dataTable();
            oSettings = positionTable.fnSettings();

            positionTable.fnClearTable(this);

            for (var i = 0; i < json.data.length; i++) {
                positionTable.oApi._fnAddData(oSettings, json.data[i]);
            }

            oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
            positionTable.fnDraw();
        });
    }

    self.DeleteMulti = function () {
        $.ajax({
            url: Config.Url + 'Position/DeleteMultiPosition',
            async: false,
            data: {
                ids: self.rows_selected.toString()
            },
            type: "POST",
            success: function (result) {
                if (result.Status == true) {
                    alert("Xóa chức vụ thành công !");
                    self.RefreshTableUser($(self.positionTable), Config.Url + 'Position/GetAllPosition');
                }
            }
        });
    }

    $("#addPosition").click(function () {
        $("#hdId").val("");
        $("#txtCode").val("");
        $("#txtName").val("");
        $("#positionModal").modal('show');
    });

    // nút lưu
    $("#deletePosition").click(function () {
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
    $('#savePosition').click(function () {
        var id = $("#hdId").val();
        var machucvu = $("#txtCode").val();
        var tenchucvu = $("#txtName").val();

        if (!id) {
            $.ajax({
                url: Config.Url + 'Position/AddPosition',
                async: false,
                data: {
                    machucvu: machucvu, tenchucvu: tenchucvu
                },
                type: "POST",
                success: function (result) {
                    if (result.Status == true) {
                        alert("Cập nhật thông tin thành công !");
                        self.RefreshTableUser($(self.positionTable), '/Position/GetAllPosition');
                        $("#positionModal").modal('hide');
                    }
                }
            });
        }
        else {
            $.ajax({
                url: Config.Url + 'Position/EditPosition',
                async: false,
                data: {
                    id: id, machucvu: machucvu, tenchucvu: tenchucvu
                },
                type: "POST",
                success: function (result) {
                    if (result.Status == true) {
                        alert("Cập nhật thông tin thành công !");
                        self.RefreshTableUser($(self.positionTable), '/Position/GetAllPosition');
                        $("#positionModal").modal('hide');
                    }
                }
            });
        }

        
    });

    // Handle click on checkbox: khi người dùng click vào checkbox trên tbody
    $(self.positionTable).on('click', 'input[type="checkbox"]', function (e) {

        var $row = $(this).closest('tr');
        // Get row data
        var data = self.table.row($row).data();
        // Get row ID
        var rowId = data["Id"];

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
            $('#deletePosition').removeAttr("disabled");
        } else {
            $('#deletePosition').attr("disabled", "disabled");
        }
        // Prevent click event from propagating to parent
        e.stopPropagation();
    });


    // ấn nút xóa trong bảng
    $(self.positionTable).on('click', 'a.position_del', function (e) {
        e.preventDefault();
        
        var id = $(this).attr("data-id");
        bootbox.confirm("Bạn muốn xóa những đối tượng vừa chọn?", function (result) {
            if (result == true) {
                $.ajax({
                    url: Config.Url + 'Position/DeletePosition',
                    async: false,
                    data: { 'id': id },
                    type: "POST",
                    success: function (result) {
                        if (result.Status == true) {
                            $.gritter.add({ title: "Chức vụ", text: "Xóa chức vụ thành công !", image: "/Images/success.png", class_name: "clean", time: "1500" });
                            self.RefreshTableUser($(self.positionTable), Config.Url + 'Position/GetAllPosition');
                        }
                    }
                });
            }
        })
    });

    // ấn nút xóa trong sửa
    $(self.positionTable).on('click', 'a.position_edit', function (e) {
        e.preventDefault();
        var id = $(this).attr("data-id");
        $.ajax({
            url: Config.Url + 'Position/GetPositionById',
            async: false,
            data: { 'id': id },
            type: "Get",
            success: function (result) {
                if (result.Status == true) {
                    $("#hdId").val(id);
                    $('#txtCode').val(result.data.machucvu);
                    $('#txtName').val(result.data.tenchucvu);
                }
            }
        });
        $("#positionModal").modal('show');
    });
}