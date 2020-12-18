using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DoanBanHang.Data;
using DoanBanHang.Models;

namespace DoanBanHang.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly DoanBanHangContext _context;

        public CategoriesController(DoanBanHangContext context)
        {
            _context = context;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PCatalog>>> GetPCatalog()
        {
            return await _context.PCatalog.ToListAsync();
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PCatalog>> GetPCatalog(int id)
        {
            var pCatalog = await _context.PCatalog.FindAsync(id);

            if (pCatalog == null)
            {
                return NotFound();
            }

            return pCatalog;
        }

        // PUT: api/Categories/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPCatalog(int id, PCatalog pCatalog)
        {
            if (id != pCatalog.catalog_id)
            {
                return BadRequest();
            }

            _context.Entry(pCatalog).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PCatalogExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Categories
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PCatalog>> PostPCatalog(PCatalog pCatalog)
        {
            _context.PCatalog.Add(pCatalog);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPCatalog", new { id = pCatalog.catalog_id }, pCatalog);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PCatalog>> DeletePCatalog(int id)
        {
            var pCatalog = await _context.PCatalog.FindAsync(id);
            if (pCatalog == null)
            {
                return NotFound();
            }

            _context.PCatalog.Remove(pCatalog);
            await _context.SaveChangesAsync();

            return pCatalog;
        }

        private bool PCatalogExists(int id)
        {
            return _context.PCatalog.Any(e => e.catalog_id == id);
        }
    }
}
