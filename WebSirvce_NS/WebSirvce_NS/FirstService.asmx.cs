using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using WebSirvce_NS.ObjectR;
using System.Data.SqlClient;
using System.Web.Script.Serialization;

namespace WebSirvce_NS
{
    /// <summary>
    /// Summary description for FirstService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class FirstService : System.Web.Services.WebService
    {

        [WebMethod]
        public List<DataResult> GetData()
        {
            FF35_Cord_appEntities db = new FF35_Cord_appEntities();

            var from = new SqlParameter("@From", "2016-03-01");

            var to = new SqlParameter("@To", "2016-03-31");

            var makho = new SqlParameter("@Ma_Kho", "p155");

            var dkho = db.Database
                .SqlQuery<GetData>("exec Test @From, @To, @Ma_Kho", from, to, makho)
                .ToList();

            var dmvt = db.Database
                .SqlQuery<DMVT>("select ma_vt,ten_vt,ma_td1,sl_td1,packs,(packs/CASE WHEN sl_td1 = 0 THEN 1 ELSE sl_td1 END) as tlc from dmvt where ma_td1 !='' and sl_td1 != 0 and packs != 0")
                .ToList();

            List<DataResult> result = new List<DataResult>();
            foreach (GetData objData in dkho)
            {
                DMVT objdmvt = new DMVT();
                objdmvt = dmvt.Find(vt => vt.ma_vt.Equals(objData.ma_vt));
                DataResult objResult = new DataResult();
                objResult.kho = objData;
                objResult.dmvt = objdmvt;
                result.Add(objResult);
            }

            return result;

        }
    }
}
