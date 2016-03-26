using HRM.Data;
using HRM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
namespace HRM.Controllers
{
    public class OtherJobsController : Controller
    {
        // GET: Specification
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// lấy tất cả công việc khác
        /// </summary>
        /// <returns></returns>
        public ActionResult GetAllOtherJobs()
        {
            var db = new HRMContext();
            var lstQuyCach = db.dCongViecKhacs.Where(x => x.isdelete != true).Select(x => new {
                
                x.id,
                x.tencongviec,
                x.soluong,
                x.dongia,
                x.heso,
                x.thanhtien
            }).ToList();
            return Json(new { data = lstQuyCach, Status = true }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// thêm mới công việc khác
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult AddOtherJobs(OtherJobs model)
        {
            var db = new HRMContext();
            var entity = new dCongViecKhac();
            entity.tencongviec = model.tencongviec;
            entity.soluong = model.soluong;
            entity.heso = model.heso;
            entity.dongia = model.dongia;
            entity.thanhtien = model.soluong * model.dongia * model.heso;
            var otherJobs = db.dCongViecKhacs.Add(entity);
            db.SaveChanges();

            return Json(new { data = otherJobs, Status = true }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// cập nhật công việc khác
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult EditOtherJobs(OtherJobs model)
        {
            try
            {
                var db = new HRMContext();
                var entity = db.dCongViecKhacs.FirstOrDefault(x => x.id == model.id);
                entity.tencongviec = model.tencongviec;
                entity.soluong = model.soluong;
                entity.heso = model.heso;
                entity.dongia = model.dongia;
                entity.thanhtien = model.thanhtien;
                db.SaveChanges();

                return Json(new { data = entity, Status = true, Message = "Success" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// lấy công việc theo id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult GetOtherJobById(int id)
        {
            try
            {
                var db = new HRMContext();
                var otherJobs = db.dCongViecKhacs.FirstOrDefault(x => x.id == id);
                return Json(new { data = otherJobs, Status = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// lấy công việc theo id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult DeleteOtherJobs(int id)
        {
            try
            {
                var db = new HRMContext();
                var otherJobs = db.dCongViecKhacs.FirstOrDefault(x => x.id == id);
                otherJobs.isdelete = true;
                db.SaveChanges();
                return Json(new {  Status = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


    }
}