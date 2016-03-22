using HRM.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRM.Controllers
{
    public class CoefficientUnstableController : Controller
    {
        // GET: CoefficientUnstable
        public ActionResult Index()
        {
            var db = new HRMContext();
            return View(db.dHeSoKONs.ToList());
        }

        [HttpGet]
        public ActionResult GetAllCoefficienUnstable()
        {
            var db = new HRMContext();
            var lstHesoKON = db.dHeSoKONs.Select(x => new
            {
                x.id,
                x.tenheso,
                x.heso
            }).ToList();
            return Json(new { data = lstHesoKON, Status = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult UpdateMultiCoefficientUnstable(int[] ids,int[] heso)
        {
            try
            {
                var db = new HRMContext();
                

                for(int i=0;i<ids.Length;i++)
                {
                    var id = ids[i];
                    var entity = db.dHeSoKONs.FirstOrDefault(x => x.id == id);
                    entity.heso = heso[i];
                    db.SaveChanges();
                }

                return Json(new { Status = true, Message = "Success" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }

        }


        //[HttpPost]
        //public ActionResult SaveCoefficientUnstable(int heSoTbVal,int id)
        //{
        //    try
        //    {
        //        var db = new HRMContext();
        //        var entity = db.dHeSoKONs.FirstOrDefault(x => x.id == id);
        //        entity.heso = heSoTbVal;
        //        db.SaveChanges();
        //        var lstHeSoKON = db.dHeSoKONs.ToList();               
        //        return Json(new { Status = true,lstHeSoKON = lstHeSoKON, Message = "Success" }, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
        //    }

        //}
    }
}