namespace HRM.Data
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Web.Script.Serialization;

    [Table("dHeSo")]
    public partial class dHeSo
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public dHeSo()
        {
            dHeSoCTs = new HashSet<dHeSoCT>();
        }

        public int id { get; set; }

        public int? idbophan { get; set; }

        public double? thongso { get; set; }

        [StringLength(50)]
        public string nguoitao { get; set; }

        [StringLength(100)]
        public string tenheso { get; set; }

        public DateTime? ngaytao { get; set; }

        [StringLength(50)]
        public string nguoisua { get; set; }

        public DateTime? ngaysua { get; set; }

        public bool? isDelete { get; set; }

        public virtual dBoPhan dBoPhan { get; set; }

        [ScriptIgnore]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dHeSoCT> dHeSoCTs { get; set; }
    }
}
