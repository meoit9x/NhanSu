namespace HRM.Data
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("dKho")]
    public partial class dKho
    {
        public int id { get; set; }

        [StringLength(50)]
        public string masp { get; set; }

        public double? soluongkg { get; set; }

        public DateTime? ngaynhap { get; set; }

        public double? soluonghop { get; set; }

        public double? sl_td { get; set; }

        public double? hsthoi { get; set; }

        public double? dongiathoi { get; set; }

        public double? hskiem { get; set; }

        public double? dgkiem { get; set; }

        public double? hscatdan { get; set; }

        public double? dongiacatdan { get; set; }
    }
}
