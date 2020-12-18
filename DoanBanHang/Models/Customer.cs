using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DoanBanHang.Models
{
    public class Customer
    {
        [Key]
        public int cus_id { get; set; }
        public string cus_username { get; set; }
        public string cus_password { get; set; }
        public string cus_name { get; set; }
        [DataType(DataType.Date)]
        public DateTime cus_birthday { get; set; }
        public string cus_phone { get; set; }
        public string cus_address { get; set; }

    }
}
