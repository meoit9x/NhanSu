function Coefficient() {
    var self = this;

    self.coefficientTable = $("#coefficient");
    self.table = {};
    self.rows_selected = [];
    self.listDetail = [];
    self.currentRowDetail = {};

    // chạy khi page nó load
    self.init = function () {
        self.LoadSpecification();
        self.LoadDepartment();

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
                    render: function (data, type, row, meta) {
                        var index = meta.row + 1;
                        return index;
                    },
                    className: "dt-body-center"
                },
                { "mData": "tenheso" },
                { "mData": "thongso" },
                { "mData": "bophan" }
            ],
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

    self.LoadSpecification = function (){
        $.ajax({
            url: Config.Url + 'Specification/GetAllSpecification',
            async: false,
            type: "Get",
            success: function (result) {
                if (result.Status == true) {
                    result.data.forEach(function (item) {
                        var option = $("<option value='" + item.id + "'>" + item.tenquycach + "</option>");
                        $("#txtIdSpecification").append(option);
                    })
                }
            }
        });
    }

    self.LoadDepartment = function () {
        $.ajax({
            url: Config.Url + 'Department/GetAllDepartment',
            async: false,
            type: "Get",
            success: function (result) {
                if (result.Status == true) {
                    result.data.forEach(function (item) {
                        var option = $("<option value='" + item.id + "'>" + item.tenbophan + "</option>");
                        $("#txtDepartment").append(option);
                    })
                }
            }
        });
    }

    $("#addCoefficient").click(function () {
        $("#hdId").val("");
        $("#txtName").val("");
        $("#txtDepartment").val("");
        $("#txtCoefficient").val("");
        self.listDetail = [];
        $("#detailCoefficient tbody").empty();
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
        var thongso = $("#txtCoefficient").val();
        var idbophan = $("#txtDepartment").val();
        
        if (!id) {
            $.ajax({
                url: Config.Url + 'Coefficient/AddCoefficient',
                async: false,
                data: {
                    tenheso: tenheso, thongso: thongso, idbophan: idbophan, detailModel: self.listDetail
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
                    id: id, tenheso: tenheso, thongso: thongso, idbophan: idbophan, detailModel: self.listDetail
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
        var index = $("#hdRowIndex").val();
        item.id = $("#hdIdDetail").val();
        item.tuthongso = $("#txtFrom").val();
        item.denthongso = $("#txtTo").val();
        item.idquycach = $("#txtIdSpecification").val();

        if (index != "") {
            var currentItem = self.listDetail.filter(function (value) {
                return value.id = item.id;
            })[0];
            currentItem.tuthongso = item.tuthongso;
            currentItem.denthongso = item.denthongso;
            currentItem.idquycach = item.idquycach;

            var current = $("#detailUnitPrice tr").eq(index);
            debugger;
            $(current).find(".lbFrom").text(currentItem.tuthongso);
            $(current).find(".lbTo").text(currentItem.denthongso);
            $(current).find(".hdSpecification").val($("#txtIdSpecification").val());
            $(current).find(".lbSpecification").text($("#txtIdSpecification option:selected").text());
        }
        else {
            // add item vào list
            self.listDetail.push(item);

            var tr = $("<tr></tr>");
            var tdFrom = $("<td><label class='.lbFrom'>" + item.tuthongso + "</label></td>");
            var tdTo = $("<td><label class='.lbTo'>" + item.denthongso + "</label></td>");
            var tdSpecification = $("<td></td>");
            var lbSpecification = $("<label class='.lbSpecification'>" + $("#txtIdSpecification option:selected").text() + "</label>");
            var hdSpecification = $("<input type='hidden' class='.hdSpecification' value='" + $("#txtIdSpecification").val() + "'></label>");
            $(tdSpecification).append(lbSpecification);
            $(tdSpecification).append(hdSpecification);
            $(tr).append(tdFrom);
            $(tr).append(tdTo);
            $(tr).append(tdSpecification);
            $("#detailCoefficient tbody").append(tr);
        }
        
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

    $("#deleteDetail").click(function (e) {
        var id = $("#hdIdDetail").val();
        bootbox.confirm("Bạn muốn xóa những đối tượng vừa chọn?", function (result) {
            if (result == true) {
                var detail = self.listDetail.filter(function (item) {
                    return item.id == id;
                })[0];

                detail.isDelete = true;
            }
        })
    });

    $(self.coefficientTable).on('click', 'tr', function () {
        self.table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    });

    // show modal sửa
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
                    $("#detailCoefficient tbody").empty();
                    $("#hdId").val(rowId);
                    $("#txtName").val(result.data.tenheso);
                    $("#txtDepartment").val(result.data.idbophan);
                    $("#txtCoefficient").val(result.data.thongso);

                    result.Details.forEach(function (item) {
                        var tr = $("<tr data-detail='" + item.id + "'></tr>");
                        var tdFrom = $("<td><label class='lbFrom'>" + item.tuthongso + "</label></td>");
                        var tdTo = $("<td><label class='lbTo'>" + item.denthongso + "</label></td>");
                        var tdSpecification = $("<td></td>");
                        var lbSpecification = $("<label class='lbSpecification'>" + item.quycachName + "</label>");
                        var hdSpecification = $("<input type='hidden' class='hdSpecification'>" + item.idquycach + "</label>");

                        $(tdSpecification).append(lbSpecification);
                        $(tdSpecification).append(hdSpecification);
                        $(tr).append(tdFrom);
                        $(tr).append(tdTo);
                        $(tr).append(tdSpecification);

                        $("#detailCoefficient tbody").append(tr);
                    })
                }
            }
        });
        $("#coefficientModal").modal('show');
    });

    // show modal sửa
    $("#detailCoefficient").on('dblclick', 'tr', function (e) {
        var rowId = $(this).data("detail");
        var rowIndex = e.currentTarget.rowIndex;
        var from = $(this).find(".lbFrom").text();
        var to = $(this).find(".lbTo").text();
        var hdIdSpecification = $(this).find(".hdSpecification").val();
        var txtSpecification = $(this).find(".lbSpecification").val();
        $("#hdIdDetail").val(rowId);
        $("#hdRowIndex").val(rowIndex);
        $("#txtFrom").val(from);
        $("#txtTo").val(to);
        $("#txtIdSpecification").val(hdIdSpecification);
        
        $("#detailModal").modal('show');
    });
}