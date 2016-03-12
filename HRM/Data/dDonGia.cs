namespace HRM.Data
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Web.Script.Serialization;

    [Table("dDonGia")]
    public partial class dDonGia
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public dDonGia()
        {
            dDonGiaCTs = new HashSet<dDonGiaCT>();
        }

        public int id { get; set; }

        [StringLength(50)]
        public string madongia { get; set; }

        public double? dongia { get; set; }

        public DateTime? ngaytao { get; set; }

        public int? idbophan { get; set; }

        [StringLength(50)]
        public string nguoitao { get; set; }

        public bool? isDelete { get; set; }

        [StringLength(50)]
        public string nguoisua { get; set; }

        public DateTime? ngaysua { get; set; }

        public virtual dBoPhan dBoPhan { get; set; }

        [ScriptIgnore]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dDonGiaCT> dDonGiaCTs { get; set; }
    }
}
