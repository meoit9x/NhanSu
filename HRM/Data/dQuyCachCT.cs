namespace HRM.Data
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("dQuyCachCT")]
    public partial class dQuyCachCT
    {
        public int id { get; set; }

        public int? idquycach { get; set; }

        [StringLength(50)]
        public string masanpham { get; set; }

        public double? thongso { get; set; }

        public int? idsanpham { get; set; }

        [StringLength(50)]
        public string nguoitao { get; set; }

        public DateTime? ngaytao { get; set; }

        [StringLength(50)]
        public string nguoisua { get; set; }

        public DateTime? ngaysua { get; set; }

        public bool? isDelete { get; set; }

        public virtual dQuyCach dQuyCach { get; set; }

        public virtual dSanPham dSanPham { get; set; }
    }
}
