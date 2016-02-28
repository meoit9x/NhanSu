using HRM.Data;
using HRM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRM.Controllers
{
    public class CoefficientController : Controller
    {
        // GET: Coefficient
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// lấy tất cả hệ số
        /// </summary>
        /// <returns></returns>
        public ActionResult GetAllCoefficient()
        {
            var db = new HRMContext();
            var lstHeso = db.dHeSoes.Where(x => x.isDelete != true).ToList();
            return Json(new { data = lstHeso, Status = true }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// thêm mới quy cách
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult AddCoefficient(CoefficientModel model)
        {
            var db = new HRMContext();
            var entity = new dHeSo();
            entity.idbophan = model.idbophan;
            entity.thongso = model.thongso;
            entity.tenheso = model.tenheso;

            var quycach = db.dHeSoes.Add(entity);
            db.SaveChanges();

            return Json(new { data = quycach, Status = true }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// lấy quy cách theo id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult GetCoefficientById(int id)
        {
            try
            {
                var db = new HRMContext();
                List<CoefficientDetailModel> lstDetail = new List<CoefficientDetailModel>();
                var Coefficient = db.dQuyCaches.FirstOrDefault(x => x.id == id);
                foreach (var item in Coefficient.dHeSoCTs)
                {
                    CoefficientDetailModel modelDetail = new CoefficientDetailModel();
                    modelDetail.id = item.id;
                    modelDetail.tuthongso = item.tuthongso;
                    modelDetail.denthongso = item.denthongso;

                    if (item.dQuyCach != null)
                    {
                        modelDetail.idquycach = item.idquycach;
                        modelDetail.quycachName = item.dQuyCach.tenquycach;
                    }

                    modelDetail.isDelete = item.isDelete;

                    lstDetail.Add(modelDetail);
                }
                return Json(new { data = Coefficient, Details = lstDetail, Status = true, Message = "Success" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Sửa quy cách    
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult EditCoefficient(CoefficientModel model)
        {
            try
            {
                var db = new HRMContext();
                var entity = db.dHeSoes.FirstOrDefault(x => x.id == model.id);
                entity.idbophan = model.idbophan;
                entity.thongso = model.thongso;
                entity.tenheso = model.tenheso;

                db.SaveChanges();

                return Json(new { data = entity, Status = true, Message = "Success" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Xóa quy cách    
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult DeleteCoefficient(CoefficientModel model)
        {
            try
            {
                var db = new HRMContext();
                var entity = db.dQuyCaches.FirstOrDefault(x => x.id == model.id);
                entity.isDelete = true;
                db.SaveChanges();

                return Json(new { data = entity, Status = true, Message = "Success" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }

        }
    }
}