namespace HRM.Data
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Web.Script.Serialization;

    [Table("dHesoKON")]
    public partial class dHeSoKON
    {
       
        

        public int id { get; set; }

        public string tenheso { get; set; }

        public double? heso { get; set; }

        

      
        
    }
}
