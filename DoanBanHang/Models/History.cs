using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DoanBanHang.Models
{
    public class History
    {
        [Key]
        public int his_id { get; set; }
        public int his_amount { get; set; }
        public int his_reason { get; set; }
        public virtual Product product { get; set; }

    }
}
