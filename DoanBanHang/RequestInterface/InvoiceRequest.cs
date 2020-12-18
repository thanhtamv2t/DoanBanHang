using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DoanBanHang.Models;

namespace DoanBanHang.RequestInterface
{
    public class InvoiceRequest
    {
        public int invoice_id { get; set; }

        public int cus_id { get; set; }
        public DateTime invoice_createdDate { get; set; }
        public DateTime invoice_deliveryDate { get; set; }
        public string invoice_address { get; set; }
        public double invoice_totalPrice { get; set; }
        public string invoice_status { get; set; }
        public string invoice_note { get; set; }

        public List<Invoice_details> details { get; set; }
    }
}
