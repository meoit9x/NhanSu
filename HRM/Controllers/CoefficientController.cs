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
        [HttpGet]
        public ActionResult GetAllCoefficient()
        {
            var db = new HRMContext();
            var lstHeso = db.dHeSoes.Where(x => x.isDelete != true).Select(x => new {
                x.id,
                x.idbophan,
                x.thongso,
                x.tenheso,
                bophan = x.dBoPhan.tenbophan
            }).ToList();
            return Json(new { data = lstHeso, Status = true }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// thêm mới hệ số
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult AddCoefficient(CoefficientModel model)
        {

            using (var db = new HRMContext())
            {
                using (var scope = db.Database.BeginTransaction())
                {
                    try
                    {
                        var entity = new dHeSo();
                        entity.idbophan = model.idbophan;
                        entity.thongso = model.thongso;
                        entity.tenheso = model.tenheso;

                        var heso = db.dHeSoes.Add(entity);

                        db.SaveChanges();

                        foreach (var item in model.DetailModel)
                        {
                            dHeSoCT ct = new dHeSoCT();
                            ct.tuthongso = item.tuthongso;
                            ct.denthongso = item.denthongso;
                            ct.idquycach = item.idquycach;
                            ct.idHeSo = heso.id;

                            db.dHeSoCTs.Add(ct);
                        }

                        db.SaveChanges();

                        scope.Commit();

                        return Json(new { data = heso, Status = true }, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception ex)
                    {
                        scope.Rollback();
                        return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
                    }
                }
            }
        }

        /// <summary>
        /// lấy hệ số theo id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public ActionResult GetCoefficientById(int id)
        {
            using (var db = new HRMContext())
            {
                try
                {
                    List<CoefficientDetailModel> lstDetail = new List<CoefficientDetailModel>();
                    var Coefficient = db.dHeSoes.FirstOrDefault(x => x.id == id);
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

                        if (item.isDelete != true)
                        {
                            lstDetail.Add(modelDetail);
                        }
                        
                    }
                    return Json(new { data = Coefficient, Details = lstDetail, Status = true, Message = "Success" }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
                }
            }
        }

        /// <summary>
        /// Sửa hệ số
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult EditCoefficient(CoefficientModel model)
        {
            using (var db = new HRMContext())
            {
                using (var scope = db.Database.BeginTransaction())
                {
                    try
                    {

                        var entity = db.dHeSoes.FirstOrDefault(x => x.id == model.id);
                        entity.idbophan = model.idbophan;
                        entity.thongso = model.thongso;
                        entity.tenheso = model.tenheso;

                        foreach (var item in model.DetailModel)
                        {
                            dHeSoCT ct;
                            if (item.id != null)
                            {
                                ct = db.dHeSoCTs.FirstOrDefault(x => x.id == model.id);
                                ct.tuthongso = item.tuthongso;
                                ct.denthongso = item.denthongso;
                                ct.idquycach = item.idquycach;
                                ct.idHeSo = entity.id;
                                ct.isDelete = item.isDelete;
                            }
                            else
                            {
                                ct = new dHeSoCT();
                                ct.tuthongso = item.tuthongso;
                                ct.denthongso = item.denthongso;
                                ct.idquycach = item.idquycach;
                                ct.idHeSo = entity.id;
                                ct.isDelete = false;

                                db.dHeSoCTs.Add(ct);
                            }
                            db.SaveChanges();
                        }
                        scope.Commit();
                        return Json(new { data = entity, Status = true, Message = "Success" }, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception ex)
                    {
                        scope.Rollback();
                        return Json(new { Status = false, Message = ex.Message }, JsonRequestBehavior.AllowGet);
                    }
                }
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
                var entity = db.dHeSoes.FirstOrDefault(x => x.id == model.id);
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