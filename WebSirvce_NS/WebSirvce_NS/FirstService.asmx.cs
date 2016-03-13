using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using WebSirvce_NS.ObjectR;
using System.Data.SqlClient;
using System.Web.Script.Serialization;
using WebSirvce_NS.Data;

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
        public List<DataResult> GetData(string from,string to,string makho)
        {
            FF35_Cord_sysEntities db = new FF35_Cord_sysEntities();

            var pfrom = new SqlParameter("@From", from);

            var _to = new SqlParameter("@To", to);

            var _makho = new SqlParameter("@Ma_Kho", makho);

            var dkho = db.Database
                .SqlQuery<GetData>("exec Test @From, @To, @Ma_Kho", pfrom, _to, _makho)
                .ToList();

            var dmvt = db.Database
                .SqlQuery<DMVT>("select ma_vt,ten_vt,ma_td1,sl_td1,packs,(packs/CASE WHEN sl_td1 = 0 THEN 1 ELSE sl_td1 END) as tlc from dmvt where ma_td1 !='' and sl_td1 != 0 and packs != 0")
                .ToList();

            List<DateTime> lDateSunDay = WebSirvce_NS.Units.Units.getSundays(Convert.ToDateTime(to).Month);

            List<GetData> dkho1 = new List<GetData>();

            foreach (DateTime sunday in lDateSunDay)
            {
                string date = sunday.ToString("yyyy-MM-dd");
                var datesunday = new SqlParameter("@From", date);
                var _datesunday = new SqlParameter("@To", date);

                var __makho = new SqlParameter("@Ma_Kho", makho);

                var _kho = db.Database
                .SqlQuery<GetData>("exec Test @From, @To, @Ma_Kho", datesunday, _datesunday, __makho)
                .ToList();
                _kho.RemoveAt(0);
                _kho.RemoveAt(0);

                dkho1.AddRange(_kho);
            }

            List<DataResult> result = new List<DataResult>();
            DataResult objResult = new DataResult();
            foreach (GetData objData in dkho)
            {
                if(objData.stt != null)
                {
                    objResult = new DataResult();
                    
                    // Lay tong so luong hop va kg ngay chu nhat 
                    
                    var sumsokg = (from x in dkho1 where x.ma_vt.Equals(objData.ma_vt) select x.so_luong ).Sum();
                    var sumsohop = (from x in dkho1 where x.ma_vt.Equals(objData.ma_vt) select x.sl_hop).Sum();
                    
                    // so luong ngay thuong
                    objData.so_luong = objData.so_luong - sumsokg;
                    objData.sl_hop = objData.sl_hop - sumsohop;

                    // lay quy cach
                    DMVT objdmvt = new DMVT();
                    objdmvt = dmvt.Find(vt => vt.ma_vt.Equals(objData.ma_vt));

                    // tao object ngay chu nhat 

                    var _objData = new GetData();

                    _objData.so_luong = sumsokg;
                    _objData.sl_hop = sumsohop;

                    objResult.kho_sunday = _objData;

                    // add ngay thuong
                    objResult.kho = objData;
                    objResult.dmvt = objdmvt;

                    result.Add(objResult);

                    
                }
            }

            return result;

        }
    }
}
