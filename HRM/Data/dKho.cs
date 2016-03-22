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

        public string masp { get; set; }

        public string tensp { get; set; }

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

        public int status { get; set; }

        public double? tienthoi { get; set; }

        public double? tiencatdan { get; set; }

        public double? tienkiem { get; set; }

        public double? sdsoluongkg { get; set; }

        public double? sdsoluonghop { get; set; }

        public double? hscn { get; set; }

        public double? sdtienthoi { get; set; }

        public double? sdtiencatdan { get; set; }

        public double? sdtienkiem { get; set; }

        public string idcty { get; set; }
        public string luongthang { get; set; }
        public int isSunDay { get; set; }
    }
}
