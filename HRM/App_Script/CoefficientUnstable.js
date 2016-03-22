function CoefficientUnstable() {
    var self = this;

    self.coefficientDiv = $("#coefficientData");
    self.table = {};
    self.rows_selected = [];
    var id = [];
    var heso = [];
    var rowId;
    self.coefficientUnstable = [];
    self.currentRowDetail = {};

    // chạy khi page nó load
    self.init = function () {
        self.LoadSpecification();
        
    }

    

    self.LoadSpecification = function () {
        $.ajax({
            url: Config.Url + 'CoefficientUnstable/GetAllCoefficienUnstable',
            async: false,
            type: "Get",
            success: function (result) {
                if (result.Status == true) {
                    result.data.forEach(function (value) {
                        
                        id.push(value.id);
                        self.coefficientUnstable.push(value);
                    })
                    
                    
                }
            }
        });
    }

    self.GetHeSo = function () {

        $('.heso').each(function (index) {
            
            valu = $(this).val();
            heso.push(valu);
        });
    }


    self.EditMulti = function () {
        $.ajax({
            url: Config.Url + 'CoefficientUnstable/UpdateMultiCoefficientUnstable',
            async: false,
            traditional: true,
            data: {
                ids: id,
                heso: heso
            },
            dataType: "json",
            type: "POST",
            success: function (result) {
                if (result.Status == true) {
                    alert("Cập nhật thành công");
                }
            }
        });
    }

    $("#btnSaveSCoefficientUnstable").click(function () {
        heso = [];
        self.GetHeSo();
        self.EditMulti();
    });

    //$(self.coefficientDiv).on('dblclick', '.row-heSoKON', function (e) {
    //     rowId = $(this).data("detail");
    //    item = self.coefficientUnstable.filter(function (item) {
    //        return item.id == rowId;
    //    })[0];
    //    var tenHeSoItem = item.tenheso;
    //    var heSoItem = item.heso;
    //    $("#coefficientUnstableModal").modal('show');
    //    $("#tenHeSo").html(tenHeSoItem);
    //    $("#heSo").val(heSoItem);
       

    //    $('#btnSaveSMaterial').click(function () {
    //        var heSoTbVal = $('#heSo').val();
    //        if (heSoTbVal.length == 0 ) {
    //            alert("Phải nhập đầy đủ thông tin");
    //            return false;
    //        }
    //        else
    //        {
    //            $.ajax({
    //                url: Config.Url + 'CoefficientUnstable/SaveCoefficientUnstable',
    //                async: false,
    //                data: {
    //                    id : rowId,
    //                    heSoTbVal: heSoTbVal,
    //                },
    //                type: "POST",
    //                success: function (result) {
    //                    if (result.Status == true) {
    //                        alert("Update " + result.Message);
    //                        self.coefficientUnstable = null;
    //                        self.coefficientUnstable = result.lstHeSoKON;
    //                        $("#coefficientData").html("");
    //                        self.coefficientUnstable.forEach(function (value) {
    //                            var tr1 = $("<div class='form-group row-heSoKON' data-detail='" + value.id + "'> </div>");
    //                            $(tr1).append("<label class='col-md-4 control-label'>" + value.tenheso + "</label>");
    //                            var tr2 = $(" <div class='col-md-8'></div>");
    //                            tr2.append("<input type='text' class='heso' class='form-control'  value=" + value.heso + ">");
    //                            $(tr1).append(tr2);
    //                            $("#coefficientData").append(tr1);
    //                            id.push(value.id);
    //                            self.coefficientUnstable.push(value);
    //                        })
    //                        $("#coefficientUnstableModal").modal('hide');
    //                    }
    //                }
    //            });
    //        }
    //    });
        
    //});

    
}