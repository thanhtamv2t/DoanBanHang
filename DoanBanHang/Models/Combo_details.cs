using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DoanBanHang.Models
{
    public class Combo_details
    {
        [Key]
        public int cbd_id { get; set; }
        public int cbd_amount { get; set; }
        public virtual Product product { get; set; }
    }
}
