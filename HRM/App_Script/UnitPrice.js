function UnitPrice() {
    var self = this;

    self.unitPriceTable = $("#unitPrice");
    self.table = {};
    self.rows_selected = [];
    self.listDetail = [];
    self.currentRowDetail = {};

    // chạy khi page nó load
    self.init = function () {
        self.LoadSpecification();
        self.LoadDepartment();

        self.table = $(self.unitPriceTable).DataTable({
            "bDestroy": true,
            "bProcessing": true,
            "oSearch": { "bSmart": false, "bRegex": true },
            "sDom": 't<pl>',
            "sAjaxSource": Config.Url + 'UnitPrice/GetAllUnitPrice',
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
                { "mData": "madongia" },
                { "mData": "dongia" },
                { "mData": "bophan" }
            ],
            "language": {
                "emptyTable": "Không có bản ghi nào."
            }
        });
    }

    self.RefreshTableUser = function (tableId, urlData) {
        $.getJSON(urlData, null, function (json) {
            UnitPriceTable = $(tableId).dataTable();
            oSettings = UnitPriceTable.fnSettings();

            UnitPriceTable.fnClearTable(this);

            for (var i = 0; i < json.data.length; i++) {
                UnitPriceTable.oApi._fnAddData(oSettings, json.data[i]);
            }

            oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
            UnitPriceTable.fnDraw();
        });
    }

    self.DeleteMulti = function () {
        $.ajax({
            url: Config.Url + 'UnitPrice/DeleteMultiUnitPrice',
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
                    self.RefreshTableUser($(self.unitPriceTable), Config.Url + 'UnitPrice/GetAllUnitPrice');
                }
            }
        });
    }

    self.LoadSpecification = function () {
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

    $("#addUnitPrice").click(function () {
        $("#hdId").val("");
        $("#txtCode").val("");
        $("#txtDepartment").val("");
        $("#txtUnitPrice").val("");
        self.listDetail = [];
        $("#detailUnitPrice tbody").empty();
        $("#unitPriceModal").modal('show');
    });

    $("#addUnitPriceDetail").click(function () {
        $("#hdIdDetail").val("");
        $("#txtFrom").val("");
        $("#txtTo").val("");
        $("#unitPriceDetailModal").modal('show');
    });

    // nút lưu
    $("#deleteMultiUnitPrice").click(function () {
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
    $('#saveUnitPrice').click(function () {
        parent.ShowLoading();
        var id = $("#hdId").val();
        var madongia = $("#txtCode").val();
        var dongia = $("#txtUnitPrice").val();
        var idbophan = $("#txtDepartment").val();

        if (!id) {
            $.ajax({
                url: Config.Url + 'UnitPrice/AddUnitPrice',
                async: false,
                data: {
                    madongia: madongia, dongia: dongia, idbophan: idbophan, detailModel: self.listDetail
                },
                type: "POST",
                success: function (result) {
                    if (result.Status == true) {
                        alert("Cập nhật thông tin thành công !");
                        self.RefreshTableUser($(self.unitPriceTable), '/UnitPrice/GetAllUnitPrice');
                        $("#unitPriceModal").modal('hide');
                        parent.HideLoading();
                    }
                }
            });
        }
        else {
            $.ajax({
                url: Config.Url + 'UnitPrice/EditUnitPrice',
                async: false,
                data: {
                    id: id, madongia: madongia, dongia: dongia, idbophan: idbophan, detailModel: self.listDetail
                },
                type: "POST",
                success: function (result) {
                    if (result.Status == true) {
                        alert("Cập nhật thông tin thành công !");
                        self.RefreshTableUser($(self.unitPriceTable), '/UnitPrice/GetAllUnitPrice');
                        $("#unitPriceModal").modal('hide');
                        parent.HideLoading();
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
            var remove = self.listDetail.indexOf(currentItem)
            self.listDetail.splice(remove, 1);

            var current = $("#detailUnitPrice tr").eq(index);
            $(current).find(".lbFrom").text(item.tuthongso == null ? "" : item.tuthongso);
            $(current).find(".lbTo").text(item.denthongso == null ? "" : item.denthongso);
            $(current).find(".hdSpecification").val($("#txtIdSpecification").val());
            $(current).find(".lbSpecification").text($("#txtIdSpecification option:selected").text());
        }
        else {
            var tr = $("<tr></tr>");
            var tdFrom = $("<td><label class='.lbFrom'>" + item.tuthongso + "</label></td>");
            var tdTo = $("<td><label class='.lbTo'>" + item.denthongso + "</label></td>");
            var tdSpecification = $("<td></td>");
            var lbSpecification = $("<label class='.lbSpecification'>" + $("#txtIdSpecification option:selected").text() + "</label>");
            var hdSpecification = $("<input type='hidden' class='.hdSpecification' value='" + $("#txtIdSpecification").val() + "'></input>");
            $(tdSpecification).append(lbSpecification);
            $(tdSpecification).append(hdSpecification);
            $(tr).append(tdFrom);
            $(tr).append(tdTo);
            $(tr).append(tdSpecification);
            $("#detailUnitPrice tbody").append(tr);
        }
        self.listDetail.push(item);
        $("#unitPriceDetailModal").modal('hide');
    });

    // Handle click on checkbox: khi người dùng click vào checkbox trên tbody
    $(self.unitPriceTable).on('click', 'input[type="checkbox"]', function (e) {

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
            $('#deleteUnitPrice').removeAttr("disabled");
        } else {
            $('#deleteUnitPrice').attr("disabled", "disabled");
        }
        // Prevent click event from propagating to parent
        e.stopPropagation();
    });

    // ấn nút xóa trong dialog
    $("#deleteUnitPrice").click(function (e) {
        var id = $("#hdId").val();
        bootbox.confirm("Bạn muốn xóa những đối tượng vừa chọn?", function (result) {
            if (result == true) {
                $.ajax({
                    url: Config.Url + 'UnitPrice/DeleteUnitPrice',
                    async: false,
                    data: { 'id': id },
                    type: "POST",
                    success: function (result) {
                        if (result.Status == true) {
                            self.RefreshTableUser($(self.unitPriceTable), Config.Url + 'UnitPrice/GetAllUnitPrice');
                            $("#unitPriceModal").modal('hide');
                        }
                    }
                });
            }
        })
    });

    $("#deleteDetail").click(function (e) {
        var id = $("#hdIdDetail").val();
        var index = $("#hdRowIndex").val();
        
        bootbox.confirm("Bạn muốn xóa những đối tượng vừa chọn?", function (result) {
            if (result == true) {
                var detail = self.listDetail.filter(function (item) {
                    return item.id == id;
                })[0];
                var remove = self.listDetail.indexOf(detail);
                self.listDetail.splice(remove, 1);

                var item = {};
                item.id = $("#hdIdDetail").val();
                item.tuthongso = $("#txtFrom").val();
                item.denthongso = $("#txtTo").val();
                item.idquycach = $("#txtIdSpecification").val();
                item.isDelete = true;
                
                self.listDetail.push(item);
                $("#unitPriceDetailModal").modal('hide');
                $("#detailUnitPrice tr").eq(index).remove();
            }
        })
    });

    $(self.unitPriceTable).on('click', 'tr', function () {
        self.table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    });

    // show modal sửa
    $(self.unitPriceTable).on('dblclick', 'tr', function (e) {
        parent.ShowLoading();
        var $row = $(this);
        // Get row data
        var data = self.table.row($row).data();
        // Get row ID
        var rowId = data["id"];
        $.ajax({
            url: Config.Url + 'UnitPrice/GetUnitPriceById',
            async: false,
            data: { 'id': rowId },
            type: "Get",
            success: function (result) {
                if (result.Status == true) {
                    self.listDetail = [];
                    $("#detailUnitPrice tbody").empty();
                    $("#hdId").val(rowId);
                    $("#txtCode").val(result.data.madongia);
                    $("#txtDepartment").val(result.data.idbophan);
                    $("#txtUnitPrice").val(result.data.dongia);
                    result.data.DetailModel.forEach(function (item) {
                        var tr = $("<tr data-detail='" + item.id + "'></tr>");
                        var tdFrom = $("<td><label class='lbFrom'>" + (item.tuthongso == null ? "" : item.tuthongso) + "</label></td>");
                        var tdTo = $("<td><label class='lbTo'>" + (item.denthongso == null ? "" : item.denthongso) + "</label></td>");
                        var tdSpecification = $("<td></td>");
                        var lbSpecification = $("<label class='lbSpecification'>" + item.quycachName + "</label>");
                        var hdSpecification = $("<input type='hidden' class='hdSpecification' value='" + item.idquycach + "'></input>");

                        self.listDetail.push(item);
                        $(tdSpecification).append(lbSpecification);
                        $(tdSpecification).append(hdSpecification);
                        $(tr).append(tdFrom);
                        $(tr).append(tdTo);
                        $(tr).append(tdSpecification);

                        $("#detailUnitPrice tbody").append(tr);
                    });

                    parent.HideLoading();
                }
            }
        });
        $("#unitPriceModal").modal('show');
    });

    // show modal sửa
    $("#detailUnitPrice").on('dblclick', 'tr', function (e) {
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

        $("#unitPriceDetailModal").modal('show');
    });
}