using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DoanBanHang.Models
{
    public class Product
    {
        [Key]
        public int product_id { get; set; }
        public string product_name { get; set; }
        public Decimal product_price { get; set; }
        public string product_details { get; set; }
        public int product_amount { get; set; }
        public string product_image { get; set; }
        [ForeignKey("catalog_id")]
        public PCatalog Catalog { get; set; }
    }
}
