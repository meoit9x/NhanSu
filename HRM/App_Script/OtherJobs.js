function OtherJobs() {
    var self = this;
    self.init = function () {

    }
    $('#sel1').change(function () {
        if ($('#sel1 option:selected').val() == "nhap") {

            $("#nhapSL").html("");
            var lblSoLuong = $("<label class='col-md-4 control-label'>Số lượng:</label>");
            var nhapSL = $("<div class='col-md-4'></div>");
            nhapSL.append("<input type='text' class='form-control' >");
            
            $("#nhapSL").html(lblSoLuong);
            $("#nhapSL").append(nhapSL);
            }
       
    });
   
    $("#closeDialog").click(function () {
        
        $("#nhapSL").html("");
        var lblSoLuong = $("<label class='col-md-4 control-label'>Số lượng:</label>");
        var nhapSL = $('<select class="form-control col-md-4" id="sel1" style="width:initial;margin-left:15px;"></select>');
        nhapSL.append('<option>Số lượng KG</option>');
        nhapSL.append('<option>Số lượng cái</option>');
        nhapSL.append('<option value="nhap" id="nhap">Nhập</option>');

        $("#nhapSL").html(lblSoLuong);
        $("#nhapSL").append(nhapSL);
        
    });

    $("#otherJobs").on('dblclick', 'tr', function (e) {
       
        $("#otherJobModal").modal('show');
    });
}