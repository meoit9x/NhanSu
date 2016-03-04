namespace HRM.Data
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("dHeSoCT")]
    public partial class dHeSoCT
    {
        public int id { get; set; }

        public double? tuthongso { get; set; }

        public double? denthongso { get; set; }

        public int? idHeSo { get; set; }

        [StringLength(50)]
        public string nguoitao { get; set; }

        public DateTime? ngaytao { get; set; }

        [StringLength(50)]
        public string nguoisua { get; set; }

        public DateTime? ngaysua { get; set; }

        public bool? isDelete { get; set; }

        public int? idquycach { get; set; }

        public virtual dHeSo dHeSo { get; set; }

        public virtual dQuyCach dQuyCach { get; set; }
    }
}
