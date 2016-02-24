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
            var lstChucVu = db.dChucVus.ToList();
            return Json(new { data = lstChucVu, Status = true }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// thêm mới chức vụ
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
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
            var db = new HRMContext();
            var position = db.dChucVus.FirstOrDefault(x => x.id == id);
            return Json(new { data = position, Status = true }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Sửa chức vụ    
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ActionResult EditPosition(PositionModel model)
        {
            
            var db = new HRMContext();
            var entity = db.dChucVus.FirstOrDefault(x => x.id == model.id);
            entity.machucvu = model.machucvu;
            entity.tenchucvu = model.tenchucvu;

            db.SaveChanges();

            return Json(new { data = entity, Status = true }, JsonRequestBehavior.AllowGet);
        }
    }
}