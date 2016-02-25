namespace HRM.Data
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("dCongTy")]
    public partial class dCongTy
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public dCongTy()
        {
            dNhanViens = new HashSet<dNhanVien>();
        }

        public int id { get; set; }

        [StringLength(200)]
        public string tencongty { get; set; }

        [StringLength(200)]
        public string diachi { get; set; }

        [StringLength(128)]
        public string tucachPN { get; set; }

        [StringLength(50)]
        public string dienthoai { get; set; }

        [StringLength(100)]
        public string email { get; set; }

        [StringLength(50)]
        public string nguoitao { get; set; }

        public DateTime? ngaytao { get; set; }

        [StringLength(50)]
        public string macty { get; set; }

        [StringLength(50)]
        public string nguoisua { get; set; }

        public DateTime? ngaysua { get; set; }

        public bool? isdelete { get; set; }

        public int? parent { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<dNhanVien> dNhanViens { get; set; }
    }
}
