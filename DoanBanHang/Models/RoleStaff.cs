using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DoanBanHang.Models
{
    public class RoleStaff
    {
        [Key]
        public int role_id { get; set; }
        public string role_name { get; set; }
    }
}
