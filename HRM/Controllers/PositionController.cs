using HRM.Data;
using HRM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRM.Controllers
{
    public class PositionController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// lấy tất cả chức vụ
        /// </summary>
        /// <returns></returns>
        public ActionResult GetAllPosition()
        {
            var db = new HRMContext();
            var lstChucVu = db.dChucVus.Where(x => x.isDelete != true).ToList();
            return Json(new { data = lstChucVu, Status = true }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// thêm mới chức vụ
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult AddPosition(PositionModel model)
        {
            var db = new HRMContext();
            var entity = new dChucVu();
            entity.machucvu = model.machucvu;
            entity.tenchucvu = model.tenchucvu;

            var position = db.dChucVus.Add(entity);
            db.SaveChanges();

            return Json(new { data = position, Status = true }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// lấy chức vụ theo id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult GetPositionById(int id)
        {
            try
            {
                var db = new HRMContext();
                var position = db.dChucVus.FirstOrDefault(x => x.id == id);
                return Json(new { data = position, Status = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Sửa chức vụ    
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult EditPosition(PositionModel model)
        {
            try
            {
                var db = new HRMContext();
                var entity = db.dChucVus.FirstOrDefault(x => x.id == model.id);
                entity.machucvu = model.machucvu;
                entity.tenchucvu = model.tenchucvu;

                db.SaveChanges();

                return Json(new { data = entity, Status = true, Message = "Success" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// Xóa chức vụ    
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult DeletePosition(PositionModel model)
        {
            try
            {
                var db = new HRMContext();
                var entity = db.dChucVus.FirstOrDefault(x => x.id == model.id);
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
        public ActionResult DeleteMultiPosition(int[] ids)
        {
            try
            {
                var db = new HRMContext();
                foreach (var id in ids)
                {
                    var entity = db.dChucVus.FirstOrDefault(x => x.id == id);
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