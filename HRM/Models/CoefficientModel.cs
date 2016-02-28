using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM.Models
{
    public class CoefficientModel
    {
        public int id { get; set; }

        public double? thongso { get; set; }

        public string tenheso { get; set; }

        public int? idbophan { get; set; }

        public List<CoefficientDetailModel> DetailModel { get; set; }
    }

    public class CoefficientDetailModel
    {
        public int id { get; set; }

        public double? tuthongso { get; set; }

        public double? denthongso { get; set; }

        public int? idquycach { get; set; }
    }
}