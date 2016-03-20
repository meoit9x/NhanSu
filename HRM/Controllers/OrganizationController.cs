using HRM.Data;
using HRM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRM.Controllers
{
    public class OrganizationController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// lấy tất cả công ty
        /// </summary>
        /// <returns></returns>
        public ActionResult GetAllOrganization()
        {
            var db = new HRMContext();
            var lstCongTy = db.dCongTies.Where(x => x.isdelete != true).ToList();
            return Json(new { data = lstCongTy, Status = true }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// thêm mới chức vụ
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult AddOrganization(OrganizationModels model)
        {
            var db = new HRMContext();
            var entity = new dCongTy();
            entity.macongty = model.macongty;
            entity.tencongty = model.tencongty;

            var organization = db.dCongTies.Add(entity);
            db.SaveChanges();

            return Json(new { data = organization, Status = true }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Sửa chức vụ    
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult EditOrganization(OrganizationModels model)
        {
            try
            {
                var db = new HRMContext();
                var entity = db.dCongTies.FirstOrDefault(x => x.id == model.id);
                entity.macongty = model.macongty;
                entity.tencongty = model.tencongty;

                db.SaveChanges();

                return Json(new { data = entity, Status = true, Message = "Success" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult DeleteOrganization(int id)
        {
            try
            {
                var db = new HRMContext();
                var entity = db.dCongTies.FirstOrDefault(x => x.id == id);
                entity.isdelete = true;
                db.SaveChanges();

                return Json(new { data = entity, Status = true, Message = "Success" }, JsonRequestBehavior.AllowGet);
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
        public ActionResult GetOrganizationById(int id)
        {
            try
            {
                var db = new HRMContext();
                var organization = db.dCongTies.FirstOrDefault(x => x.id == id);
                return Json(new { data = organization, Status = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}