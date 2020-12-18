using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DoanBanHang.Models
{
    public class Invoice
    {
        [Key]
        public int invoice_id { get; set; }

        public int cus_id { get; set; }
        [DataType(DataType.Date)]
        public DateTime invoice_createdDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime invoice_deliveryDate { get; set; }
        public string invoice_address { get; set; }
        public Decimal invoice_totalPrice { get; set; }
        public string invoice_status { get; set; }
        public string invoice_note { get; set; }

        //public List<Invoice_details> details { get; set; }


    }
}
