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

        public long? soluong { get; set; }

        public DateTime? ngaynhap { get; set; }
    }
}
