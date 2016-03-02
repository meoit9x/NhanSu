using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM.Models
{
    public class PositionModel
    {
        public int id { get; set; }

        public string machucvu { get; set; }

        public string tenchucvu { get; set; }

        public string nguoitao { get; set; }

        public DateTime ngaytao { get; set; }

        public string nguoisua { get; set; }

        public DateTime ngaysua { get; set; }
    }
}