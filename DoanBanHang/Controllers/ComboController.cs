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
    public class ComboController : ControllerBase
    {
        private readonly DoanBanHangContext _context;

        public ComboController(DoanBanHangContext context)
        {
            _context = context;
        }

        // GET: api/Combo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Combo>>> GetCombo()
        {
            return await _context.Combo.ToListAsync();
        }

        // GET: api/Combo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Combo>> GetCombo(int id)
        {
            var combo = await _context.Combo.FindAsync(id);

            if (combo == null)
            {
                return NotFound();
            }

            return combo;
        }

        // PUT: api/Combo/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCombo(int id, Combo combo)
        {
            if (id != combo.combo_id)
            {
                return BadRequest();
            }

            _context.Entry(combo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ComboExists(id))
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

        // POST: api/Combo
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Combo>> PostCombo(Combo combo)
        {
            _context.Combo.Add(combo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCombo", new { id = combo.combo_id }, combo);
        }

        // DELETE: api/Combo/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Combo>> DeleteCombo(int id)
        {
            var combo = await _context.Combo.FindAsync(id);
            if (combo == null)
            {
                return NotFound();
            }

            _context.Combo.Remove(combo);
            await _context.SaveChangesAsync();

            return combo;
        }

        private bool ComboExists(int id)
        {
            return _context.Combo.Any(e => e.combo_id == id);
        }
    }
}
