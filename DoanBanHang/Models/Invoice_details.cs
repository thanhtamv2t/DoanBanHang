using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DoanBanHang.Models
{
    public class Invoice_details
    {
        [Key]
        public int ind_id { get; set; }
        public int ind_amountP { get; set; }
        public int ind_amountC { get; set; }
        public int invoice_id { get; set; }
        public virtual Combo combo { get; set; }
        public virtual Product product { get; set; }

    }
}
