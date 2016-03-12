namespace HRM.Data
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Web.Script.Serialization;

    [Table("dSanPham")]
    public partial class dSanPham
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public dSanPham()
        {
            dDonGiaSPs = new HashSet<dDonGiaSP>();
            dQuyCachCTs = new HashSet<dQuyCachCT>();
        }

        public int id { get; set; }

        [StringLength(50)]
        public string masanpham { get; set; }

        [StringLength(200)]
        public string tensanpham { get; set; }

        [StringLength(50)]
        public string nguoitao { get; set; }

        public DateTime? ngaytao { get; set; }

        [StringLength(50)]
        public string nguoisua { get; set; }

        public DateTime? ngaysua { get; set; }

        public bool? isDelete { get; set; }

        [ScriptIgnore]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dDonGiaSP> dDonGiaSPs { get; set; }

        [ScriptIgnore]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dQuyCachCT> dQuyCachCTs { get; set; }
    }
}
