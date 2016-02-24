namespace HRM.Data
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("dQuyCach")]
    public partial class dQuyCach
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public dQuyCach()
        {
            dDonGiaCTs = new HashSet<dDonGiaCT>();
            dHeSoCTs = new HashSet<dHeSoCT>();
            dQuyCachCTs = new HashSet<dQuyCachCT>();
        }

        public int id { get; set; }

        [StringLength(50)]
        public string tenquycach { get; set; }

        [StringLength(50)]
        public string nguoitao { get; set; }

        public DateTime? ngaytao { get; set; }

        [StringLength(50)]
        public string nguoisua { get; set; }

        public DateTime? ngaysua { get; set; }

        public bool? isDelete { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dDonGiaCT> dDonGiaCTs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dHeSoCT> dHeSoCTs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dQuyCachCT> dQuyCachCTs { get; set; }
    }
}