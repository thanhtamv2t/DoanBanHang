using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DoanBanHang.Models
{
    public class Staff
    {
        [Key]
        public int staff_id { get; set; }

        public string staff_username { get; set; }
        private string staff_password { get; set; }
        public string staff_name { get; set; }
        [DataType(DataType.Date)]
        public DateTime staff_birtday { get; set; }
        [DataType(DataType.Date)]
        public DateTime staff_joinDate { get; set; }
        public string staff_phone { get; set; }
        public virtual RoleStaff role { get; set; }
    }
}
