using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HRM.Models
{
    public class LoginViewModel
    {
        [Required]
        [Display(Name = "User")]
        public string User { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }
}
