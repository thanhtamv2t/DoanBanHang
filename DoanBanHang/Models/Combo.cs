using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DoanBanHang.Models
{
    public class Combo
    {
        [Key]
        public int combo_id { get; set; }
        public string combo_name { get; set; }
        public Decimal combo_totalPrice { get; set; }
        public Decimal combo_afterDiscount { get; set; }
        public bool combo_disabled { get; set; }
        public int combo_amount { get; set; }
        public int combo_totalProduct { get; set; }

        public ICollection<Combo_details> combo_details { get; set; }
    }
}
