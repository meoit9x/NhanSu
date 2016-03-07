using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM.Models
{
    public class UnitPriceModel
    {
        public int id { get; set; }

        public string madongia { get; set; }

        public double? dongia { get; set; }

        public int? idbophan { get; set; }

        public string bophan { get; set; }

        public List<UnitPriceDetailModel> DetailModel { get; set; }
    }

    public class UnitPriceDetailModel
    {
        public int? id { get; set; }

        public double? tuthongso { get; set; }

        public double? denthongso { get; set; }

        public int? idquycach { get; set; }

        public string quycachName { get; set; }

        public bool? isDelete { get; set; }
    }
}