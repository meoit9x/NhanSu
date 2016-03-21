function Material() {
    var self = this;
    self.materialTable = $("#material");
    self.materials = [];
    var item;
    var i = 0;
    $("#search").click(function () {
        
        var from = $("#txtFrom").val();
        var to = $("#txtTo").val();
        var d = new Date();
        var n = d.getFullYear();
        var loi = 0;
        var code = $("#txtCode").val();
        if (isNaN($("#txtTo").val()))
        {
            $("#errorYear").html("Bạn phải nhập số");
            loi++;
        }
        if ($("#txtTo").val() == "" || $("#txtTo").length==0)
        {
            $("#errorYear").html("Bạn không được để rỗng");
            loi++;
        }
        if ($("#txtTo").val() < 2007 || $("#txtTo").val() > n)
        {
            $("#errorYear").html("Bạn phải nhập trong khoảng từ 2007 đến " + n);
            loi++;
        }
        if (loi != 0)
        {
            return false;
        }
        else
        {
            parent.ShowLoading();
            $.ajax({
                url: Config.Url + 'Material/Search',
                async: false,
                data: { from: from, to: to, code: code },
                type: "Get",
                success: function (result) {
                    if (result.Status == true) {
                        
                        var sl_cai = 0;
                        result.data.forEach(function (value) {
                            var tr = $("<tr  data-detail='" + value.masp + "'></tr>");
                            $(tr).append("<td>" + i + "</td>");
                            $(tr).append("<td>" + value.tensp + "</td>");
                            $(tr).append("<td>" + value.soluongkg + value.sdsoluongkg + "</td>");
                            sl_cai = (value.sdsoluonghop + value.soluonghop) * value.sl_td;
                            $(tr).append("<td>" + sl_cai + "</td>");
                            $(tr).append("<td>" + (value.tienthoi + value.hscn * value.dongiathoi * value.hsthoi * value.sdsoluongkg) + "</td>");
                            $(tr).append("<td>" + (value.tienkiem + value.hscn * value.dongiakiem * value.hskiem * sl_cai) + "</td>");
                            $(tr).append("<td>" + (value.tiencatdan + value.hscn * value.dongiacatdan * value.hscatdan * sl_cai) + "</td>");
                            $("#material tbody").append(tr);
                            i++;
                            self.materials.push(value);
                            
                        });
                        parent.HideLoading();
                    }

                }
            });
        }
        

        
    });
    
     //ấn nút sửa trong bảng
    $(self.materialTable).on('dblclick', 'tr', function (e) {
        
         

        $("#smaterial tbody").html("");
        var rowId = $(this).data("detail");
        
        item = self.materials.filter(function (item) {
            return item.masp == rowId;
        })[0];
        
        var soluongkg = item.soluongkg;
        var sdsoluongkg = item.sdsoluongkg;
        var soluonghop = item.soluonghop;
        var sdsoluonghop = item.sdsoluonghop;
        var sl_td = item.sl_td;
        $('#materialName').text(item.tensp);
       
        var tr = $("<tr id='ngaythuong' data-detail='ngaythuong'></tr>");
        $(tr).append("<td>Ngày thường</td>");
        $(tr).append("<td>" + soluongkg + "</td>");
        $(tr).append("<td>" + soluonghop * sl_td + "</td>");
        $("#smaterial tbody").append(tr);

        var tr = $("<tr id='ngaychunhat' data-detail='ngaychunhat'></tr>");
        $(tr).append("<td>Ngày chủ nhật</td>");
        $(tr).append("<td>" + sdsoluongkg + "</td>");
        $(tr).append("<td>" + sdsoluonghop * sl_td + "</td>");
        $("#smaterial tbody").append(tr);
        
        
        $("#materialModal").modal('show');
        
        $('#btnSaveSMaterial').click(function () {
           
            var hsThoi = $('#materialHsThoi').val();
            var hsKiem = $('#materialHsKiem').val();
            var hsCatDan = $('#materialHsCatDan').val();
            var dgThoi = $('#materialDgThoi').val();
            var dgKiem = $('#materialDgKiem').val();
            var dgCatDan = $('#materialDgCatDan').val();
            if (hsThoi.length == 0 || hsKiem.length == 0 || hsCatDan.length == 0 || dgThoi.length == 0 || dgKiem.length == 0 || dgCatDan.length == 0)
            {
                alert("Phải nhập đầy đủ thông tin");
                return false;
            }
            else
            {
                $.ajax({
                    url: Config.Url + 'Material/SaveDataList',
                    async: false,
                    data: {
                        lstKho: self.materials,
                        masp: item.masp,
                        hsthoi: hsThoi,
                        hskiem:hsKiem,
                        hscatdan:hsCatDan,
                        dongiathoi:dgThoi,
                        dgkiem:dgKiem,
                        dongiacatdan: dgCatDan,
                        soluongkg:soluongkg,
                        sdsoluongkg: sdsoluongkg,
                        soluonghop: soluonghop,
                        sdsoluonghop: sdsoluonghop,
                        sl_td:sl_td
                    },
                    type: "POST",
                    success: function (result) {
                        if (result.Status == true) {
                            $("#ngaythuong .remove").remove();
                            $("#ngaychunhat .remove").remove();
                            $("#ngaythuong").append("<td class='remove'>" + result.ngayThuongTienThoi + "</td>");
                            $("#ngaythuong").append("<td class='remove'>" + result.ngayThuongTienKiem + "</td>");
                            $("#ngaythuong").append("<td class='remove'>" + result.ngayThuongTienCD + "</td>");
                            $("#ngaychunhat").append("<td class='remove'>" + result.ngayCNTienThoi + "</td>");
                            $("#ngaychunhat").append("<td class='remove'>" + result.ngayCNTienKiem + "</td>");
                            $("#ngaychunhat").append("<td class='remove'>" + result.ngayCNTienCD + "</td>");
                            self.materials = null;
                            self.materials = result.ssLstKhoSearch;
                        }
                    }
                });
                
            }

            
       
        });

        $('#saveDepartment').click(function () {
            
            $("#material tbody").html("");
            self.materials.forEach(function (value) {
                var tr = $("<tr  data-detail='" + value.masp + "'></tr>");
                $(tr).append("<td>" + i + "</td>");
                $(tr).append("<td>" + value.tensp + "</td>");
                $(tr).append("<td>" + value.soluongkg + value.sdsoluongkg + "</td>");
                sl_cai = (value.sdsoluonghop + value.soluonghop) * value.sl_td;
                $(tr).append("<td>" + sl_cai + "</td>");
                $(tr).append("<td>" + (value.tienthoi) + "</td>");
                $(tr).append("<td>" + (value.tienkiem) + "</td>");
                $(tr).append("<td>" + (value.tiencatdan) + "</td>");
                $("#material tbody").append(tr);
                i++;
               
                $("#material tbody").append(tr);
                
            });
            $("#materialModal").modal('hide');

        });
    });
}
    