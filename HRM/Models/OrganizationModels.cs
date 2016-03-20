using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HRM.Models
{
    public class OrganizationModels
    {
        public int id { get; set; }

        public string tencongty { get; set; }

        public string macongty { get; set; }

        public string tucachPN { get; set; }

        public string dienthoai { get; set; }

        public string email { get; set; }

        public string nguoitao { get; set; }

        public DateTime ngaytao { get; set; }

        public string macty { get; set; }

        public string nguoisua { get; set; }

        public DateTime ngaysua { get; set; }

        public bool isdelete { get; set; }

        public int parent { get; set; }

        
    }
}