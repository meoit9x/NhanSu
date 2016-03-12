namespace HRM.Data
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("dFQC")]
    public partial class dFQC
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public dFQC()
        {
            dQuyCaches = new HashSet<dQuyCach>();
        }

        public int id { get; set; }

        [StringLength(50)]
        public string fmaso { get; set; }

        [StringLength(100)]
        public string ten { get; set; }

        public int? index { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dQuyCach> dQuyCaches { get; set; }
    }
}
