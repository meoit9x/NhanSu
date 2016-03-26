namespace HRM.Data
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("dCongViecKhac")]
    public partial class dCongViecKhac
    {
        public int id { get; set; }

        public double? soluong { get; set; }

        public string tencongviec { get; set; }

        public double? dongia { get; set; }

        public double? heso { get; set; }


        public bool isdelete { get; set; }

        public double? thanhtien { get; set; }




    }
}
