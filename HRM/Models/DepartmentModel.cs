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

        public bool isProduct { get; set; }
    }
}