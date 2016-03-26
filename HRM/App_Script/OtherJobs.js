function OtherJobs() {
    var self = this;

    self.otherJobTable = $("#otherJobs");
    self.table = {};
    self.rows_selected = [];

    // chạy khi page nó load
    self.init = function () {
        self.table = $(self.otherJobTable).DataTable({
            "bDestroy": true,
            "bProcessing": true,
            "oSearch": { "bSmart": false, "bRegex": true },
            "sDom": 't<pl>',
            "sAjaxSource": Config.Url + 'OtherJobs/GetAllOtherJobs',
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
                 { "mData": "tencongviec" },
                 { "mData": "soluong" },
                 { "mData": "dongia" },
                 { "mData": "heso" },
                 { "mData": "thanhtien" },
                
            ],
            "language": {
                "emptyTable": "Không có bản ghi nào."
            }
        });
    }

    self.RefreshTableUser = function (tableId, urlData) {
        $.getJSON(urlData, null, function (json) {
            self.otherJobTable = $(tableId).dataTable();
            oSettings = self.otherJobTable.fnSettings();

            self.otherJobTable.fnClearTable(this);

            for (var i = 0; i < json.data.length; i++) {
                self.otherJobTable.oApi._fnAddData(oSettings, json.data[i]);
            }

            oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
            self.otherJobTable.fnDraw();
        });
    }

    // ấn nút sửa trong bảng
    $(self.otherJobTable).on('dblclick', 'tr', function (e) {
        var $row = $(this);
        // Get row data
        var data = self.table.row($row).data();
        // Get row ID
        var rowId = data["id"];
        $.ajax({
            url: Config.Url + 'OtherJobs/GetOtherJobById',
            async: false,
            data: { 'id': rowId },
            type: "Get",
            success: function (result) {
                if (result.Status == true) {
                    $("#soLuong").val("");
                    $("#hdId").val(rowId);
                    $('#txtCongViec').val(result.data.tencongviec);
                    $('#txtDonGia').val(result.data.dongia);
                    $('#txtHeSo').val(result.data.heso);
                    if(result.data.soluong==1)
                    {
                        $("#nhapSL").html("");
                        var lblSoLuong = $("<label class='col-md-4 control-label'>Số lượng:</label>");
                        var nhapSL = $('<select class="form-control col-md-4" id="sel1" onchange="myFunction()" style="width:initial;margin-left:15px;">');
                        nhapSL.append('<option value="1">Số lượng KG</option>');
                        nhapSL.append('<option value="2">Số lượng cái</option>');
                        nhapSL.append('<option value="nhap">Nhập</option>');
                        $("#nhapSL").html(lblSoLuong);
                        $("#nhapSL").append(nhapSL);
                        $('#sel1 option[value=1]').attr('selected', 'selected');
                    }
                    else if(result.data.soluong==2)
                    {
                        $("#nhapSL").html("");
                        var lblSoLuong = $("<label class='col-md-4 control-label'>Số lượng:</label>");
                        var nhapSL = $('<select class="form-control col-md-4" id="sel1" onchange="myFunction()" style="width:initial;margin-left:15px;">');
                        nhapSL.append('<option value="1">Số lượng KG</option>');
                        nhapSL.append('<option value="2">Số lượng cái</option>');
                        nhapSL.append('<option value="nhap">Nhập</option>');
                        $("#nhapSL").html(lblSoLuong);
                        $("#nhapSL").append(nhapSL);
                        $('#sel1 option[value=2]').attr('selected', 'selected');
                    }
                    else
                    {
                        $("#nhapSL").html("");
                        var lblSoLuong = $("<label class='col-md-4 control-label'>Số lượng:</label>");
                        var nhapSL = $("<div class='col-md-4'></div>");
                        nhapSL.append("<input type='text' class='form-control txtSoLuong'  id='soLuong' value='" + result.data.soluong + "'>");

                        $("#nhapSL").html(lblSoLuong);
                        $("#nhapSL").append(nhapSL);
                    }
                }
            }
        });
        $("#otherJobModal").modal('show');
    });
    $(self.otherJobTable).on('click', 'tr', function () {
        self.table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    });
    $("#addOtherJobs").click(function () {
        $("#hdId").val("");
        $("#txtCongViec").val("");
        $("#soLuong").val("");
        $("#txtDonGia").val("");
        $("#txtHeSo").val("");
        $("#nhapSL").html("");
        var lblSoLuong = $("<label class='col-md-4 control-label'>Số lượng:</label>");
        var nhapSL = $('<select class="form-control col-md-4" id="sel1" onchange="myFunction()" style="width:initial;margin-left:15px;">');
        nhapSL.append('<option value="1">Số lượng KG</option>');
        nhapSL.append('<option value="2">Số lượng cái</option>');
        nhapSL.append('<option value="nhap">Nhập</option>');
        $("#nhapSL").html(lblSoLuong);
        $("#nhapSL").append(nhapSL);
        $("#otherJobModal").modal('show');
    });

    $('#saveOtherJobs').click(function () {
        var id = $("#hdId").val();
        var tencongviec = $("#txtCongViec").val();
        var soluong = 0;
        var dongia = $("#txtDonGia").val();
        var heso = $("#txtHeSo").val();
        if ($('#soLuong').hasClass('txtSoLuong')) {

           
            soluong = $(".txtSoLuong").val();
        }
        else
        {
            soluong =  $("#sel1").val();
        }
        if (tencongviec == 0 || soluong == 0 || dongia == 0 || heso==0) {
            alert("Phải nhập đầy đủ thông tin");
            return false;
        }
        else
        {
            if (!id) {
                $.ajax({
                    url: Config.Url + 'OtherJobs/AddOtherJobs',
                    async: false,
                    data: {
                        tencongviec: tencongviec, soluong: soluong, dongia: dongia, heso: heso
                    },
                    type: "POST",
                    success: function (result) {
                        if (result.Status == true) {
                            alert("Cập nhật thông tin thành công !");

                            self.RefreshTableUser(self.otherJobTable, 'OtherJobs/GetAllOtherJobs');
                            $("#otherJobModal").modal('hide');
                        }
                    }
                });
            }
            else {
                $.ajax({
                    url: Config.Url + 'OtherJobs/EditOtherJobs',
                    async: false,
                    data: {
                        id: id, soluong: soluong, dongia: dongia, heso: heso, tencongviec: tencongviec, thanhtien: (heso * soluong * dongia)
                    },
                    type: "POST",
                    success: function (result) {
                        if (result.Status == true) {
                            alert("Cập nhật thông tin thành công !");
                            self.RefreshTableUser(self.otherJobTable, '/OtherJobs/GetAllOtherJobs');
                            $("#otherJobModal").modal('hide');
                        }
                    }
                });
            }
        }
        
    });


    $("#deleteOtherJobs").click(function (e) {
        var id = $("#hdId").val();
        bootbox.confirm("Bạn muốn xóa những đối tượng vừa chọn?", function (result) {
            if (result == true) {
                $.ajax({
                    url: Config.Url + 'OtherJobs/DeleteOtherJobs',
                    async: false,
                    data: { 'id': id },
                    type: "POST",
                    success: function (result) {
                        if (result.Status == true) {
                            $.gritter.add({ title: "Công việc khác", text: "Xóa công việc thành công !", image: "/Images/success.png", class_name: "clean", time: "1500" });
                            self.RefreshTableUser(self.otherJobTable, '/OtherJobs/GetAllOtherJobs');
                            $("#otherJobModal").modal('hide');
                        }
                    }
                });
            }
        })
    });


    
   

  //  $( "select" )
  //.change(function () {
  //    /
      
  //})
  
  

    //$("#closeDialog").click(function () {

    //    location.reload();

    //});
   
    
    
}