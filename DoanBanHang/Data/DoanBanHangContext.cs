using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DoanBanHang.Models;

namespace DoanBanHang.Data
{
    public class DoanBanHangContext : DbContext
    {
        public DoanBanHangContext (DbContextOptions<DoanBanHangContext> options)
            : base(options)
        {
        }

        public DbSet<DoanBanHang.Models.Customer> Customer { get; set; }

        public DbSet<DoanBanHang.Models.PCatalog> PCatalog { get; set; }

        public DbSet<DoanBanHang.Models.Product> Product { get; set; }

        public DbSet<DoanBanHang.Models.Combo> Combo { get; set; }

        public DbSet<DoanBanHang.Models.Invoice> Invoice { get; set; }

        public DbSet<DoanBanHang.Models.Invoice_details> Invoice_details { get; set; }
    }
}
