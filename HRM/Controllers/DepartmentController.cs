using HRM.Data;
using HRM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRM.Controllers
{
    public class DepartmentController : Controller
    {
        // GET: Department
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// lấy tất cả chức vụ
        /// </summary>
        /// <returns></returns>
        public ActionResult GetDepartment()
        {
            var db = new HRMContext();
            var lstChucVu = db.dBoPhans.Where(x => x.isDelete != true).Select(x => new { 
                x.id,
                x.mabophan,
                x.tenbophan,
                x.isproduce
            }).ToList();
            return Json(new { data = lstChucVu, Status = true }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// lấy tất cả chức vụ
        /// </summary>
        /// <returns></returns>
        public ActionResult GetAllDepartment()
        {
            var db = new HRMContext();
            var lstChucVu = db.dBoPhans.Where(x => x.isDelete != true).Select(x => new { x.id, x.tenbophan }).ToList();
            return Json(new { data = lstChucVu, Status = true }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// thêm mới chức vụ
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult AddDepartment(DepartmentModel model)
        {
            try
            {
                var db = new HRMContext();
                var entity = new dBoPhan();
                entity.mabophan = model.mabophan;
                entity.tenbophan = model.tenbophan;
                entity.isproduce = model.isProduct;

                var Department = db.dBoPhans.Add(entity);
                db.SaveChanges();

                return Json(new { data = Department, Status = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
            
        }

        /// <summary>
        /// lấy chức vụ theo id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult GetDepartmentById(int id)
        {
            try
            {
                var db = new HRMContext();
                var Department = db.dBoPhans.FirstOrDefault(x => x.id == id);
                return Json(new { data = Department, Status = true }, JsonRequestBehavior.AllowGet);
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
        public ActionResult EditDepartment(DepartmentModel model)
        {
            try
            {
                var db = new HRMContext();
                var entity = db.dBoPhans.FirstOrDefault(x => x.id == model.id);
                entity.mabophan = model.mabophan;
                entity.tenbophan = model.tenbophan;
                entity.isproduce = model.isProduct;
                
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
        public ActionResult DeleteDepartment(DepartmentModel model)
        {
            try
            {
                var db = new HRMContext();
                var entity = db.dBoPhans.FirstOrDefault(x => x.id == model.id);
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
        public ActionResult DeleteMultiDepartment(int[] ids)
        {
            try
            {
                var db = new HRMContext();
                foreach (var id in ids)
                {
                    var entity = db.dBoPhans.FirstOrDefault(x => x.id == id);
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