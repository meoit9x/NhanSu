using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM.Models
{
    public class DepartmentModel
    {
        public int id { get; set; }

        public string mabophan { get; set; }

        public string tenbophan { get; set; }

        public string isProduct { get; set; }

        public string nguoitao { get; set; }

        public DateTime ngaytao { get; set; }

        public string nguoisua { get; set; }

        public DateTime ngaysua { get; set; }
    }
}