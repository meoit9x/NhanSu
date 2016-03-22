namespace HRM.Data
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("dDonGiaBQ")]
    public partial class dDonGiaBQ
    {
        public int id { get; set; }

        public double? slkg { get; set; }

        

        public double? tongtienthoi { get; set; }

        public double slcai { get; set; }

       

       
        public double? tongtiencatdan { get; set; }

        

        public double? tongtienkiem { get; set; }

        public int? isSunDay { get; set; }

        public string idcty { get; set; }
        public string luongthang { get; set; }
        public int? postion { get; set; }
    }
}
