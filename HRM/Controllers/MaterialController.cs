using HRM.Data;
using HRM.FirstReference;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRM.Controllers
{
    public class MaterialController : Controller
    {
        List<dKho> listKho = new List<dKho>();

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
                listKho.Add(objKho);
            }

            return Json(new { data = listKho, Status = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SaveDataList(string hsthoi
            ,string hskiem,string hscatdan,string dgthoi,string dgkiem,string dgcatdan,string masp)
        {
            
            return Json(new { data = listKho, Status = true }, JsonRequestBehavior.AllowGet);
        }

    }
}