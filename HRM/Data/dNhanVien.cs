namespace HRM.Data
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("dNhanVien")]
    public partial class dNhanVien
    {
        public int id { get; set; }

        [StringLength(50)]
        public string manhanvien { get; set; }

        [StringLength(200)]
        public string tennhanvien { get; set; }

        [StringLength(50)]
        public string machucvu { get; set; }

        public int? idbophan { get; set; }

        public int? idchucvu { get; set; }

        public int? idcty { get; set; }

        public virtual dBoPhan dBoPhan { get; set; }

        public virtual dChucVu dChucVu { get; set; }

        public virtual dCongTy dCongTy { get; set; }
    }
}
