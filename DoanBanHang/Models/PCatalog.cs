using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DoanBanHang.Models
{
    public class PCatalog
    {
        [Key]
        public int catalog_id { get; set; }
        public string catalog_name { get; set; }
    }
}
