using HRM.Data;
using HRM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
namespace HRM.Controllers
{
    public class SpecificationController : Controller
    {
        // GET: Specification
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// lấy tất cả quy cách
        /// </summary>
        /// <returns></returns>
        public ActionResult GetAllSpecification()
        {
            var db = new HRMContext();
            var lstQuyCach = db.dQuyCaches.Where(x => x.isDelete != true).ToList();
            return Json(new { data = lstQuyCach, Status = true }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// thêm mới quy cách
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult AddSpecification(SpecificationModel model)
        {
            var db = new HRMContext();
            var entity = new dQuyCach();
            entity.tenquycach = model.tenquycach;

            var quycach = db.dQuyCaches.Add(entity);
            db.SaveChanges();

            return Json(new { data = quycach, Status = true }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// lấy quy cách theo id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult GetSpecificationById(int id)
        {
            try
            {
                var db = new HRMContext();
                var specification = db.dQuyCaches.FirstOrDefault(x => x.id == id);
                return Json(new { data = specification, Status = true }, JsonRequestBehavior.AllowGet);
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
        public ActionResult EditSpecification(SpecificationModel model)
        {
            try
            {
                var db = new HRMContext();
                var entity = db.dQuyCaches.FirstOrDefault(x => x.id == model.id);
                entity.tenquycach = model.tenquycach;

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
        public ActionResult DeleteSpecification(SpecificationModel model)
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

        [HttpPost]
        public ActionResult DeleteMultiSpecification(int[] ids)
        {
            try
            {
                var db = new HRMContext();
                foreach (var id in ids)
                {
                    var entity = db.dQuyCaches.FirstOrDefault(x => x.id == id);
                    if (entity != null)
                    {
                        entity.isDelete = true;
                    }
                    db.SaveChanges();
                }

                return Json(new { Status = true, Message = "Success" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }

        }
    }
}