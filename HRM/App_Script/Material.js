function Material() {
    var self = this;
    self.materialTable = $("#material");
    self.materials = [];
    var donGiaBQ1 = [];
    var donGiaBQ2 = [];
    var donGiaBQ3 = [];
    var donGiaBQ = [];
    var item;
    var tienThoiNgayThuong, tienThoiNgayCN, tienKiemNgayThuong, tienKiemNgayCN, tienCatDanNgayThuong, tienCatDanNgayCN = 0;
    var day = new Date();
    var ngay = day.getDate();
    var code;
    var from;
    var sumTienThoiNgayThuong = 0;
    var sumTienThoiNgayCN = 0;
    var sumTienKiemNgayThuong = 0;
    var sumTienKiemNgayCN = 0;
    var sumTienCDNgayThuong = 0;
    var sumTienCDNgayCN = 0;
    var sumSLKGNgayThuong = 0;
    var sumSLKGNgayCN = 0;
    var sumSLCaiNgayThuong = 0;
    var sumSLCaiNgayCN = 0;
    var sumTienThoi = 0;
    var sumTienKiem = 0;
    var sumTienCD = 0;
    var sumSLKG = 0;
    var sumSLCai = 0;
    var sumDonGiaThoi = 0;
    $("#search").click(function () {
        $("#material tbody").html("");
        from = $("#txtFrom").val();
        var to = $("#txtTo").val();
        var d = new Date();
        var n = d.getFullYear();
        var loi = 0;
        code = $("#txtCode").val();
        if (isNaN($("#txtTo").val())) {
            $("#errorYear").html("Bạn phải nhập số");
            loi++;
        }
        if ($("#txtTo").val() == "" || $("#txtTo").length == 0) {
            $("#errorYear").html("Bạn không được để rỗng");
            loi++;
        }
        if ($("#txtTo").val() < 2007 || $("#txtTo").val() > n) {
            $("#errorYear").html("Bạn phải nhập trong khoảng từ 2007 đến " + n);
            loi++;
        }
        if (loi != 0) {
            return false;
        }
        else {
            parent.ShowLoading();
            $.ajax({
                url: Config.Url + 'Material/Search',
                async: false,
                data: { from: from, to: to, code: code },
                type: "Get",
                success: function (result) {
                    if (result.Status == true) {
                        
                        var sl_cai = 0;
                        var i = 0;
                        
                        result.data.forEach(function (value) {
                            var tr = $("<tr  data-detail='" + value.masp + "'></tr>");
                            $(tr).append("<td>" + (i + 1) + "</td>");
                            $(tr).append("<td>" + value.tensp + "</td>");
                            $(tr).append("<td>" + (value.soluongkg + value.sdsoluongkg) + "</td>");
                            sl_cai = (value.sdsoluonghop + value.soluonghop) * value.sl_td;
                            $(tr).append("<td>" + sl_cai + "</td>");
                            $(tr).append("<td>" + (value.tienthoi + value.sdtienthoi) + "</td>");
                            $(tr).append("<td>" + (value.tienkiem + value.sdtienkiem) + "</td>");
                            $(tr).append("<td>" + (value.tiencatdan + value.sdtiencatdan) + "</td>");
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
        $(tr).append("<td class='remove'>" + (item.tienthoi == null ? 0 : item.tienthoi) + "</td>");
        $(tr).append("<td class='remove'>" + (item.tienkiem == null ? 0 : item.tienkiem) + "</td>");
        $(tr).append("<td class='remove'>" + (item.tiencatdan == null ? 0 : item.tiencatdan) + "</td>");
        $("#smaterial tbody").append(tr);

        var tr = $("<tr id='ngaychunhat' data-detail='ngaychunhat'></tr>");
        $(tr).append("<td>Ngày chủ nhật</td>");
        $(tr).append("<td>" + sdsoluongkg + "</td>");
        $(tr).append("<td>" + sdsoluonghop * sl_td + "</td>");
        $(tr).append("<td class='remove'>" + (item.sdtienthoi == null ? 0 : item.sdtienthoi) + "</td>");
        $(tr).append("<td class='remove'>" + (item.sdtienkiem == null ? 0 : item.sdtienkiem) + "</td>");
        $(tr).append("<td class='remove'>" + (item.sdtiencatdan == null ? 0 : item.sdtiencatdan) + "</td>");
        $("#smaterial tbody").append(tr);


        $("#materialModal").modal('show');

        $('#btnSaveSMaterial').click(function () {

            //$('input[type="number"]').val("");
            //$('#materialHsThoi').val("");
            var hsThoi = $('#materialHsThoi').val();
            var hsKiem = $('#materialHsKiem').val();
            var hsCatDan = $('#materialHsCatDan').val();
            var dgThoi = $('#materialDgThoi').val();
            var dgKiem = $('#materialDgKiem').val();
            var dgCatDan = $('#materialDgCatDan').val();
            if (hsThoi.length == 0 || hsKiem.length == 0 || hsCatDan.length == 0 || dgThoi.length == 0 || dgKiem.length == 0 || dgCatDan.length == 0) {
                alert("Phải nhập đầy đủ thông tin");
                return false;
            }
            else {
                $.ajax({
                    url: Config.Url + 'Material/SaveDataList',
                    async: false,
                    data: {
                        lstKho: self.materials,
                        masp: item.masp,
                        hsthoi: hsThoi,
                        hskiem: hsKiem,
                        hscatdan: hsCatDan,
                        dongiathoi: dgThoi,
                        dgkiem: dgKiem,
                        dongiacatdan: dgCatDan,
                        soluongkg: soluongkg,
                        sdsoluongkg: sdsoluongkg,
                        soluonghop: soluonghop,
                        sdsoluonghop: sdsoluonghop,
                        sl_td: sl_td,
                        
                        idcty: code,
                        luongthang: from,
                        

                    },
                    type: "POST",
                    success: function (result) {
                        if (result.Status == true) {
                            self.materials = null;
                            self.materials = result.ssLstKhoSearch;

                            var maspRes = result.masp;
                            var itemRes = self.materials.filter(function (itemRes) {
                                return itemRes.masp == maspRes;
                            })[0];
                            $("#ngaythuong .remove").remove();
                            $("#ngaychunhat .remove").remove();
                            $("#ngaythuong").append("<td class='remove'>" + itemRes.tienthoi + "</td>");
                            $("#ngaythuong").append("<td class='remove'>" + itemRes.tienkiem + "</td>");
                            $("#ngaythuong").append("<td class='remove'>" + itemRes.tiencatdan + "</td>");

                            $("#ngaychunhat").append("<td class='remove'>" + itemRes.sdtienthoi + "</td>");
                            $("#ngaychunhat").append("<td class='remove'>" + itemRes.sdtienkiem + "</td>");
                            $("#ngaychunhat").append("<td class='remove'>" + itemRes.sdtiencatdan + "</td>");
                        }
                    }
                });

            }



        });

        $('#saveDepartment').click(function () {

            $("#material tbody").html("");
            var i = 1;
            self.materials.forEach(function (value) {
                var tr = $("<tr  data-detail='" + value.masp + "'></tr>");
                $(tr).append("<td>" + i + "</td>");
                $(tr).append("<td>" + value.tensp + "</td>");
                $(tr).append("<td>" + value.soluongkg + value.sdsoluongkg + "</td>");
                sl_cai = (value.sdsoluonghop + value.soluonghop) * value.sl_td;
                $(tr).append("<td>" + sl_cai + "</td>");
                $(tr).append("<td>" + (value.tienthoi + value.sdtienthoi) + "</td>");
                $(tr).append("<td>" + (value.tienkiem + value.sdtienkiem) + "</td>");
                $(tr).append("<td>" + (value.tiencatdan + value.sdtiencatdan) + "</td>");
                $("#material tbody").append(tr);
                i++;

                $("#material tbody").append(tr);

            });
            $("#materialModal").modal('hide');

        });
    });

    $('#viewSum').click(function () {
        $.ajax({
            url: Config.Url + 'Material/ViewSum',
            async: false,
            data: {
                lstKho: self.materials,
                idcty: code,
                luongthang: from
            },
            type: "POST",
            success: function (result) {
                if (result.Status == true) {
                    $(".sum").remove();
                    
                    var tr = $("<tr class='sum' ></tr>");
                    $(tr).append("<td>Tổng</td>");
                    $(tr).append("<td>" + result.donGiaBQNTong.slkg + "</td>");
                    $(tr).append("<td>" + result.donGiaBQNTong.slcai + "</td>");
                    $(tr).append("<td>" + (result.donGiaBQNTong.tongtienthoi == null ? 0 : result.donGiaBQNTong.tongtienthoi) + "</td>");
                    $(tr).append("<td>" + (result.donGiaBQNTong.tongtienkiem == null ? 0 : result.donGiaBQNTong.tongtienkiem) + "</td>");
                    $(tr).append("<td>" + (result.donGiaBQNTong.tongtiencatdan == null ? 0 : result.donGiaBQNTong.tongtiencatdan) + "</td>");
                    
                    $("#smaterialSum tbody").append(tr);

                    
                    var tr = $("<tr class='sum' ></tr>");
                    $(tr).append("<td>Tổng ngày thường</td>");
                    $(tr).append("<td>" + result.donGiaBQNgayThuong.slkg + "</td>");
                    $(tr).append("<td>" + result.donGiaBQNgayThuong.slcai + "</td>");
                    $(tr).append("<td>" + (result.donGiaBQNgayThuong.tongtienthoi == null ? 0 : result.donGiaBQNgayThuong.tongtienthoi) + "</td>");
                    $(tr).append("<td>" + (result.donGiaBQNgayThuong.tongtienkiem == null ? 0 : result.donGiaBQNgayThuong.tongtienkiem) + "</td>");
                    $(tr).append("<td>" + (result.donGiaBQNgayThuong.tongtiencatdan == null ? 0 : result.donGiaBQNgayThuong.tongtiencatdan) + "</td>");
                   
                    $("#smaterialSum tbody").append(tr);

                   
                    var tr = $("<tr class='sum' ></tr>");
                    $(tr).append("<td>Tổng ngày chủ nhật</td>");
                    $(tr).append("<td>" + result.donGiaBQNgayCN.slkg + "</td>");
                    $(tr).append("<td>" + result.donGiaBQNgayCN.slcai + "</td>");
                    $(tr).append("<td>" + (result.donGiaBQNgayCN.tongtienthoi == null ? 0 : result.donGiaBQNgayCN.tongtienthoi) + "</td>");
                    $(tr).append("<td>" + (result.donGiaBQNgayCN.tongtienkiem == null ? 0 : result.donGiaBQNgayCN.tongtienkiem) + "</td>");
                    $(tr).append("<td>" + (result.donGiaBQNgayCN.tongtiencatdan == null ? 0 : result.donGiaBQNgayCN.tongtiencatdan) + "</td>");
                    donGiaBQ.push(result.donGiaBQNgayCN, result.donGiaBQNTong, result.donGiaBQNgayThuong);
                    $("#smaterialSum tbody").append(tr);



                    $("#materialModalSumView").modal("show");
                }
            }
        });
        //self.materials.forEach(function (value) {
        //    sumTienThoiNgayThuong += value.tienthoi;
        //    sumTienThoiNgayCN += value.sdtienthoi;
        //    sumTienKiemNgayThuong += value.tienkiem;
        //    sumTienKiemNgayCN += value.sdtienkiem;
        //    sumTienCDNgayThuong += value.tiencatdan;
        //    sumTienCDNgayCN += value.sdtiencatdan;
        //    sumSLKGNgayThuong += value.soluongkg;
        //    sumSLKGNgayCN += value.sdsoluongkg;
        //    sumSLCaiNgayThuong += (value.soluonghop*value.sl_td);
        //    sumSLCaiNgayCN += (value.sdsoluonghop * value.sl_td);
        //    sumTienThoi = (sumTienThoiNgayThuong + sumTienThoiNgayCN);
        //    sumTienKiem = (sumTienKiemNgayThuong + sumTienKiemNgayCN);
        //    sumTienCD = (sumTienCDNgayThuong + sumTienCDNgayCN);
        //    sumSLKG = (sumSLKGNgayThuong + sumSLKGNgayCN);
        //    sumSLCai = (sumSLCaiNgayThuong + sumSLCaiNgayCN);
        //});

        //$(".sum").remove();

        //var tr = $("<tr class='sum' ></tr>");
        //$(tr).append("<td>Tổng</td>");
        //$(tr).append("<td>" + sumSLKG + "</td>");
        //$(tr).append("<td>" + sumSLCai + "</td>");
        //$(tr).append("<td>" + (sumTienThoi == null ? 0 : sumTienThoi) + "</td>");
        //$(tr).append("<td>" + (sumTienKiem == null ? 0 : sumTienKiem) + "</td>");
        //$(tr).append("<td>" + (sumTienCD == null ? 0 : sumTienCD) + "</td>");
        //donGiaBQ1.push(sumSLKG, sumSLCai, sumTienThoi, sumTienKiem, sumTienCD);
        //$("#smaterialSum tbody").append(tr);


        //var tr = $("<tr class='sum' ></tr>");
        //$(tr).append("<td>Tổng ngày thường</td>");
        //$(tr).append("<td>" + sumSLKGNgayThuong + "</td>");
        //$(tr).append("<td>" + sumSLCaiNgayThuong + "</td>");
        //$(tr).append("<td>" + (sumTienThoiNgayThuong == null ? 0 : sumTienThoiNgayThuong) + "</td>");
        //$(tr).append("<td>" + (sumTienKiemNgayThuong == null ? 0 : sumTienKiemNgayThuong) + "</td>");
        //$(tr).append("<td>" + (sumTienCDNgayThuong == null ? 0 : sumTienCDNgayThuong) + "</td>");
        //donGiaBQ2.push(sumSLKGNgayThuong, sumSLCaiNgayThuong, sumTienThoiNgayThuong, sumTienKiemNgayThuong, sumTienCDNgayThuong);
        //$("#smaterialSum tbody").append(tr);

        //var tr = $("<tr class='sum' ></tr>");
        //$(tr).append("<td>Tổng ngày chủ nhật</td>");
        //$(tr).append("<td>" + sumSLKGNgayCN + "</td>");
        //$(tr).append("<td>" + sumSLCaiNgayCN + "</td>");
        //$(tr).append("<td>" + (sumTienThoiNgayCN == null ? 0 : sumTienThoiNgayCN) + "</td>");
        //$(tr).append("<td>" + (sumTienKiemNgayCN == null ? 0 : sumTienKiemNgayCN) + "</td>");
        //$(tr).append("<td>" + (sumTienCDNgayCN == null ? 0 : sumTienCDNgayCN) + "</td>");
        //donGiaBQ3.push(sumSLKGNgayCN, sumSLCaiNgayCN, sumTienThoiNgayCN, sumTienKiemNgayCN, sumTienCDNgayCN);
        //$("#smaterialSum tbody").append(tr);

        //$("#materialModalSumView").modal("show");


    });

    $('#saveDataKho').click(function () {

        $.ajax({
            url: Config.Url + 'Material/SaveDataDonGiaBQKho',
            async: false,
            data: {
                lstKho: self.materials,
                lstDonGiaBQ: donGiaBQ,


            },
            type: "POST",
            success: function (result) {
                if (result.Status == true) {
                    alert("Lưu thành công");
                }
            }
        });
    });
}
