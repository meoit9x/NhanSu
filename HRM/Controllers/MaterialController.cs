using HRM.Data;
using HRM.FirstReference;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HRM.Controllers
{
    public class MaterialController : Controller
    {
        // GET: Material
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Search(string from, string to, string code)
        {
            FirstService s = new FirstService();
            List<DataResult> list = s.GetData(from, to, code).ToList();
            return Json(new { data = list, Status = true }, JsonRequestBehavior.AllowGet);
        }
    }
}