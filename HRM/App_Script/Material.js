﻿function Material() {
    var self = this;
    self.materialTable = $("#material");
    self.materials = [];

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
        if($("#txtTo").val() == "")
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
                        var i = 0;
                        var sl_cai = 0;
                        result.data.forEach(function (value) {
                            var tr = $("<tr data-detail='" + value.masp + "'></tr>");
                            $(tr).append("<td>" + i + "</td>");
                            $(tr).append("<td>" + value.tensp + "</td>");
                            $(tr).append("<td>" + value.soluongkg + value.sdsoluongkg + "</td>");
                            sl_cai = (value.sdsoluonghop + value.soluonghop) * value.sl_td;
                            $(tr).append("<td>" + sl_cai + "</td>");
                            $(tr).append("<td>" + (value.tienthoi + value.hscn * value.dongiathoi * value.hsthoi * value.sdsoluongkg) + "</td>");
                            $(tr).append("<td>" + (value.tienkiem + value.hscn * value.dongiakiem * value.hskiem * sl_cai) + "</td>");
                            $(tr).append("<td>" + (value.tiencatdan + value.hscn * value.dongiacatdan * value.hscatdan * sl_cai) + "</td>");
                            $("#material tbody").append(tr);
                            self.materials.push(value);
                            i++;
                        });
                        parent.HideLoading();
                    }

                }
            });
        }
        

        
    });

    // ấn nút sửa trong bảng
    $(self.materialTable).on('dblclick', 'tr', function (e) {
        var rowId = $(this).data("detail");

        var item = self.materials.filter(function (item) {
            return item.masp == rowId;
        })[0];

        $('#materialName').text(item.tensp);
        $('#sl').text(item.tensp);
        $('#materialName').text(item.tensp);
        
        var tr = $("<tr data-detail='ngaythuong'></tr>");
        $(tr).append("<td>Ngày thường</td>");
        $(tr).append("<td>" + item.soluongkg + "</td>");
        $(tr).append("<td>" + item.soluonghop * item.sl_td + "</td>");
        $("#smaterial tbody").append(tr);

        var tr = $("<tr data-detail='ngaychunhat'></tr>");
        $(tr).append("<td>Ngày chủ nhật</td>");
        $(tr).append("<td>" + item.sdsoluongkg + "</td>");
        $(tr).append("<td>" + item.sdsoluonghop * item.sl_td + "</td>");
        $("#smaterial tbody").append(tr);
        
        
        $("#materialModal").modal('show');

        $('#btnSaveSMaterial').click(function (){
            var hsThoi = $('#materialHsThoi').val();
            var hsKiem = $('#materialHsKiem').val();
            var hsCatDan = $('#materialHsCatDan').val();
            var dgThoi = $('#materialDgThoi').val();
            var dgKiem = $('#materialDgKiem').val();
            var dgCatDan = $('#materialDgCatDan').val();
            if(hsThoi == null || hsKiem  == null|| hsCatDan  == null|| dgThoi  == null|| dgKiem  == null|| dgCatDan  == null)
            {
                alert("Phải nhập đầy đủ thông tin");
            }else
            {
                $.ajax({
                    url: Config.Url + 'Material/SaveDataList',
                    async: false,
                    data: {
                        hsthoi: hsThoi,
                        hskiem:hsKiem,
                        hscatdan:hsCatDan,
                        dgthoi:dgThoi,
                        dgkiem:dgKiem,
                        dgcatdan:dgCatDan
                    },
                    type: "POST",
                    success: function (result) {
                        if (result.Status == true) {
                            alert("Cập nhật thông tin thành công !");

                        }
                    }
                });
            }
       
        });
    }
    }
    