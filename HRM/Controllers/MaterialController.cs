using HRM.Data;
using HRM.FirstReference;
using HRM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRM.Controllers
{
    public class MaterialController : Controller
    {
        List<dKho> listKhoSearch = new List<dKho>();
        List<dKho> listKhoSaveData = new List<dKho>();

        // GET: Material
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Search(string from, string to, string code)
        {
            FirstService s = new FirstService();
            List<DataResult> list = s.GetData(HRM.Unit.Unit.FirstDayOfMonth(Convert.ToInt32(from), Convert.ToInt32(to)), HRM.Unit.Unit.LastDayOfMOnth(Convert.ToInt32(from), Convert.ToInt32(to)), code).ToList();

            foreach (var objResult in list)
            {
                dKho objKho = new dKho();
                objKho.tensp = objResult.dmvt.ten_vt;
                objKho.masp = objResult.dmvt.ma_vt;
                objKho.sl_td = Convert.ToDouble(objResult.dmvt.sl_td1 == null ? 0 : objResult.dmvt.sl_td1);
                objKho.sdsoluonghop = Convert.ToDouble(objResult.kho_sunday.sl_hop == null ? 0 : objResult.kho_sunday.sl_hop);
                objKho.sdsoluongkg = Convert.ToDouble(objResult.kho_sunday.so_luong == null ? 0 : objResult.kho_sunday.so_luong);
                objKho.soluonghop = Convert.ToDouble(objResult.kho.sl_hop == null ? 0 : objResult.kho.sl_hop);
                objKho.soluongkg = Convert.ToDouble(objResult.kho.so_luong == null ? 0 : objResult.kho.so_luong);
                listKhoSearch.Add(objKho);
            }

            return Json(new { data = listKhoSearch, Status = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult SaveDataList(MaterialModels models)
        {
            dKho objKhoNgayThuong = new dKho();
            var slCaiNgayThuong = models.soluonghop * models.sl_td;
            objKhoNgayThuong.tienthoi = models.soluongkg * models.hsthoi * models.dongiathoi;
            objKhoNgayThuong.tienkiem = slCaiNgayThuong * models.hskiem * models.dgkiem;
            objKhoNgayThuong.tiencatdan = slCaiNgayThuong * models.hscatdan * models.dongiacatdan;
           
            dKho objKhoCN = new dKho();
            var slCaiCN = models.sdsoluonghop * models.sl_td;
            objKhoCN.tienthoi = models.sdsoluongkg * models.hsthoi * models.dongiathoi;
            objKhoCN.tienkiem = slCaiCN * models.hskiem * models.dgkiem;
            objKhoCN.tiencatdan = slCaiCN * models.hscatdan * models.dongiacatdan;

            double ngayThuongTienThoi = objKhoNgayThuong.tienthoi.Value;
            double ngayThuongTienKiem = objKhoNgayThuong.tienkiem.Value;
            double ngayThuongTienCD = objKhoNgayThuong.tiencatdan.Value;

            double ngayCNTienThoi = objKhoCN.tienthoi.Value;
            double ngayCNTienKiem = objKhoCN.tienkiem.Value;
            double ngayCNTienCD = objKhoCN.tiencatdan.Value;

            return Json(
                        new {
                                ngayThuongTienThoi = ngayThuongTienThoi,
                                ngayThuongTienKiem = ngayThuongTienKiem,
                                ngayThuongTienCD = ngayThuongTienCD,
                                ngayCNTienThoi = ngayCNTienThoi,
                                ngayCNTienKiem = ngayCNTienKiem,
                                ngayCNTienCD = ngayCNTienCD,
                                Status = true
                        }, JsonRequestBehavior.AllowGet);
        }

    }
}