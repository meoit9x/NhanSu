using HRM.Data;
using HRM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRM.Controllers
{
    public class UnitPriceController : Controller
    {
        // GET: UnitPrice
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult GetAllUnitPrice()
        {
            var db = new HRMContext();
            var lstHeso = db.dDonGias.Where(x => x.isDelete != true).Select(x => new
            {
                x.id,
                x.idbophan,
                x.madongia,
                x.dongia,
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
        public ActionResult AddUnitPrice(UnitPriceModel model)
        {

            using (var db = new HRMContext())
            {
                using (var scope = db.Database.BeginTransaction())
                {
                    try
                    {
                        var entity = new dDonGia();
                        entity.idbophan = model.idbophan;
                        entity.madongia = model.madongia;
                        entity.dongia = model.dongia;
                        entity.isDelete = false;

                        var heso = db.dDonGias.Add(entity);

                        db.SaveChanges();

                        foreach (var item in model.DetailModel)
                        {
                            dDonGiaCT ct = new dDonGiaCT();
                            ct.tuthongso = item.tuthongso;
                            ct.denthongso = item.denthongso;
                            ct.idquycach = item.idquycach;
                            ct.iddongia = heso.id;

                            db.dDonGiaCTs.Add(ct);
                        }

                        db.SaveChanges();

                        scope.Commit();

                        return Json(new { Status = true }, JsonRequestBehavior.AllowGet);
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
        public ActionResult GetUnitPriceById(int id)
        {
            using (var db = new HRMContext())
            {
                try
                {
                    var unitPrice = db.dDonGias.FirstOrDefault(x => x.id == id);

                    UnitPriceModel model = new UnitPriceModel();
                    model.id = unitPrice.id;
                    model.madongia = unitPrice.madongia;
                    model.dongia = unitPrice.dongia;
                    model.idbophan = unitPrice.idbophan;
                    model.DetailModel = new List<UnitPriceDetailModel>(); 
                    foreach (var item in unitPrice.dDonGiaCTs)
                    {
                        UnitPriceDetailModel modelDetail = new UnitPriceDetailModel();
                        modelDetail.id = item.id;
                        modelDetail.tuthongso = item.tuthongso;
                        modelDetail.denthongso = item.denthongso;

                        if (item.dQuyCach != null)
                        {
                            modelDetail.idquycach = item.idquycach;
                            modelDetail.quycachName = item.dQuyCach.tenquycach;
                        }

                        modelDetail.isDelete = item.isDelete;

                        model.DetailModel.Add(modelDetail);
                    }
                    return Json(new { data = model, Status = true, Message = "Success" }, JsonRequestBehavior.AllowGet);
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
        public ActionResult EditUnitPrice(UnitPriceModel model)
        {
            using (var db = new HRMContext())
            {
                using (var scope = db.Database.BeginTransaction())
                {
                    try
                    {

                        var entity = db.dDonGias.FirstOrDefault(x => x.id == model.id);
                        entity.idbophan = model.idbophan;
                        entity.madongia = model.madongia;
                        entity.dongia = model.dongia;
                        entity.idbophan = model.idbophan;

                        foreach (var item in model.DetailModel)
                        {
                            dDonGiaCT ct;
                            if (item.id != null)
                            {
                                ct = db.dDonGiaCTs.FirstOrDefault(x => x.id == model.id);
                                ct.tuthongso = item.tuthongso;
                                ct.denthongso = item.denthongso;
                                ct.idquycach = item.idquycach;
                                ct.iddongia = entity.id;
                            }
                            else
                            {
                                ct = new dDonGiaCT();
                                ct.tuthongso = item.tuthongso;
                                ct.denthongso = item.denthongso;
                                ct.idquycach = item.idquycach;
                                ct.iddongia = entity.id;
                                ct.isDelete = item.isDelete;

                                db.dDonGiaCTs.Add(ct);
                            }

                        }

                        db.SaveChanges();
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
        public ActionResult DeleteUnitPrice(UnitPriceModel model)
        {
            try
            {
                var db = new HRMContext();
                var entity = db.dDonGias.FirstOrDefault(x => x.id == model.id);
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