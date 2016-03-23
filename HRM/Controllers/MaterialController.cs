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
            var db = new HRMContext();
            string firstOD = HRM.Unit.Unit.FirstDayOfMonth(Convert.ToInt32(from), Convert.ToInt32(to));
            List<dKho> listKhoSearch = db.dKhoes.Where(x => x.luongthang == firstOD && x.idcty == code).ToList();
            if(listKhoSearch.Count()>0)
            {
                return Json(new { data = listKhoSearch, Status = true }, JsonRequestBehavior.AllowGet);
            }
            FirstService s = new FirstService();
            List<DataResult> list = s.GetData(firstOD, HRM.Unit.Unit.LastDayOfMOnth(Convert.ToInt32(from), Convert.ToInt32(to)), code).ToList();
            
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
                objKho.luongthang = firstOD;
                objKho.idcty = code;
                listKhoSearch.Add(objKho);
            }
            return Json(new { data = listKhoSearch, Status = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult ViewSum(MaterialModels models)
        {
            var db = new HRMContext();
            List<dDonGiaBQ> lstDonGia = new List<dDonGiaBQ>();
            List<dKho> lKho = new List<dKho>();
            lKho = models.lstKho;


            dDonGiaBQ donGiaBQNgayThuong = new dDonGiaBQ();
            donGiaBQNgayThuong.tongtienthoi = (from kho in lKho select Convert.ToDouble(kho.tienthoi == null ? 0 : kho.tiencatdan)).Sum();
            donGiaBQNgayThuong.tongtienkiem = (from kho in lKho select Convert.ToDouble(kho.tienkiem == null ? 0 : kho.tiencatdan)).Sum();
            donGiaBQNgayThuong.tongtiencatdan = (from kho in lKho select Convert.ToDouble(kho.tiencatdan == null ? 0 : kho.tiencatdan)).Sum();
            donGiaBQNgayThuong.slkg = (from kho in lKho select Convert.ToDouble(kho.soluongkg == null ? 0 : kho.soluongkg)).Sum();
            donGiaBQNgayThuong.slcai = (from kho in lKho select Convert.ToDouble(kho.soluonghop.GetValueOrDefault(0)*kho.sl_td.GetValueOrDefault(0))).Sum();
            donGiaBQNgayThuong.isSunDay = 0;
            donGiaBQNgayThuong.idcty = models.idcty;
            donGiaBQNgayThuong.luongthang = models.luongthang;
            donGiaBQNgayThuong.postion = 1;
            lstDonGia.Add(donGiaBQNgayThuong);

            dDonGiaBQ donGiaBQNgayCN = new dDonGiaBQ();
            donGiaBQNgayCN.tongtienthoi = (from kho in lKho select Convert.ToDouble(kho.sdtienthoi == null ? 0 : kho.sdtienthoi)).Sum();
            donGiaBQNgayCN.tongtienkiem = (from kho in lKho select Convert.ToDouble(kho.sdtienkiem == null ? 0 : kho.sdtienkiem)).Sum();
            donGiaBQNgayCN.tongtiencatdan = (from kho in lKho select Convert.ToDouble(kho.sdtiencatdan == null ? 0 : kho.sdtiencatdan)).Sum();
            donGiaBQNgayCN.slkg = (from kho in lKho select Convert.ToDouble(kho.sdsoluongkg == null ? 0 : kho.sdsoluongkg)).Sum();
            donGiaBQNgayCN.slcai = (from kho in lKho select Convert.ToDouble(kho.sdsoluonghop.GetValueOrDefault(0) * kho.sl_td.GetValueOrDefault(0))).Sum();
            donGiaBQNgayCN.isSunDay = 1;
            donGiaBQNgayCN.idcty = models.idcty;
            donGiaBQNgayCN.luongthang = models.luongthang;
            donGiaBQNgayCN.postion = 2;
            lstDonGia.Add(donGiaBQNgayCN);

            dDonGiaBQ donGiaBQNTong = new dDonGiaBQ();
            donGiaBQNTong.tongtienthoi = donGiaBQNgayCN.tongtienthoi + donGiaBQNgayThuong.tongtienthoi;
            donGiaBQNTong.tongtienkiem = donGiaBQNgayCN.tongtienkiem + donGiaBQNgayThuong.tongtienkiem;
            donGiaBQNTong.tongtiencatdan = donGiaBQNgayCN.tongtiencatdan + donGiaBQNgayThuong.tongtiencatdan;
            donGiaBQNTong.slkg = donGiaBQNgayCN.slkg + donGiaBQNgayThuong.slkg;
            donGiaBQNTong.slcai = (donGiaBQNgayCN.slcai + donGiaBQNgayThuong.slcai);
            donGiaBQNTong.isSunDay = 1;
            donGiaBQNTong.idcty = models.idcty;
            donGiaBQNTong.luongthang = models.luongthang;
            donGiaBQNTong.postion = 3;
            lstDonGia.Add(donGiaBQNTong);

            return Json(
                        new
                        {
                            donGiaBQNgayThuong = donGiaBQNgayThuong,
                            donGiaBQNgayCN = donGiaBQNgayCN,
                            donGiaBQNTong = donGiaBQNTong,
                            Status = true,
                           
                        }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult SaveDataList(MaterialModels models)
        {
            var db = new HRMContext();
            var slCaiNgayThuong = models.soluonghop * models.sl_td;

            var slCaiCN = models.sdsoluonghop * models.sl_td;


            List<dKho> ssLstKhoSearch = models.lstKho;
            var dKho = ssLstKhoSearch.Find(x => x.masp == models.masp);
            dKho.soluongkg = models.soluongkg;
            dKho.ngaynhap = DateTime.Now;
            dKho.soluonghop = models.soluonghop;
            dKho.sl_td = models.sl_td;
            dKho.hsthoi = models.hsthoi;
            dKho.dongiathoi = models.dongiathoi;
            dKho.hskiem = models.hskiem;
            dKho.dgkiem = models.dgkiem;
            dKho.hscatdan = models.hscatdan;
            dKho.dongiacatdan = models.dongiacatdan;
            dKho.status = 0;
            dKho.sdsoluongkg = models.sdsoluongkg;
            dKho.sdsoluonghop = models.sdsoluonghop;
            dKho.idcty = models.idcty;
           
            dKho.hscn = db.dHeSoKONs.FirstOrDefault(x => x.id == 1).heso;
            dKho.tienthoi = models.soluongkg * models.hsthoi * models.dongiathoi;
            dKho.tienkiem = slCaiNgayThuong * models.hskiem * models.dgkiem;
            dKho.tiencatdan = slCaiNgayThuong * models.hscatdan * models.dongiacatdan;
            dKho.sdtienthoi = models.sdsoluongkg * models.hsthoi * models.dongiathoi;
            dKho.sdtienkiem = slCaiCN * models.hskiem * models.dgkiem;
            dKho.sdtiencatdan = slCaiCN * models.hscatdan * models.dongiacatdan;
            if (dKho.sdsoluongkg != 0 && dKho.sdsoluonghop != 0)
            {
                dKho.isSunDay = 1;
            }
            else
            {
                dKho.isSunDay = 0;
            }
            return Json(
                        new
                        {
                            ssLstKhoSearch = ssLstKhoSearch,
                            Status = true,
                            masp = models.masp
                        }, JsonRequestBehavior.AllowGet);
        }

        public List<dDonGiaBQ> SaveDataSum(string luongthang, string code)
        {
            var db = new HRMContext();
            var ldgbq = (from dgbq in db.dDonGiaBQ where dgbq.luongthang == luongthang where dgbq.idcty == code select dgbq).ToList();

            return ldgbq;
        }

        [HttpPost]
        public ActionResult SaveDataDonGiaBQKho(MaterialModels models)
        {
            var db = new HRMContext();
            if (models.lstKho[0].id != 0) ;
            else
            {
                db.dKhoes.AddRange(models.lstKho);
                db.dDonGiaBQ.AddRange(models.lstDonGiaBQ);
                db.SaveChanges();
            }
            return Json(
                        new
                        {

                            Status = true,

                        }, JsonRequestBehavior.AllowGet);
        }


    }
}