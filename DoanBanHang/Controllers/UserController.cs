using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DoanBanHang.Data;
using DoanBanHang.Models;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using DoanBanHang.RequestInterface;

namespace DoanBanHang.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DoanBanHangContext _context;
        private IConfiguration _config;


        public UserController(DoanBanHangContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomer()
        {
            return await _context.Customer.ToListAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _context.Customer.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }
        [HttpPost("checkout")]
        public IActionResult checkout(InvoiceRequest input)
        {
            var currentUser = HttpContext.User;
            if (currentUser.HasClaim(c => c.Type == "UserId"))
            {
                var userID = Int32.Parse(currentUser.Claims.FirstOrDefault(c => c.Type == "UserId").Value);
                var details = input.details;
                var invoices = new Invoice();
                invoices.cus_id = userID;
                invoices.invoice_createdDate = DateTime.Now;
                invoices.invoice_deliveryDate = DateTime.Now;
                invoices.invoice_status = "pending";
                invoices.invoice_note = input.invoice_note;
                invoices.invoice_address = input.invoice_address;
                

                _context.Invoice.Add(invoices);

                _context.SaveChanges();

                _context.Entry(invoices).GetDatabaseValues();

                List<Invoice_details> list = new List<Invoice_details>();
                details.ForEach(it =>
                {
                    var iv = new Invoice_details();
                    iv = it;

                    iv.invoice_id = invoices.invoice_id;
                    list.Add(iv);
                });

                _context.Invoice_details.AddRange(list);

                _context.SaveChanges();

                return Ok(new
                {
                    status = true,
                    message = "Invoice saved"
                });
            }

            return NotFound(new
            {
                status = false,
                message = "Đăng nhập để sử dụng tính năng này"
            });

        }

        [HttpPost("login")]
        public async Task<IActionResult> login(Customer customer)
        {

            var cc = await _context.Customer.FirstOrDefaultAsync(c => c.cus_username == customer.cus_username && customer.cus_password == c.cus_password);

            if(cc == null)
            {
                return NotFound(new { 
                    Status = false,
                    Message = "Không tìm thấy tài khoản với thông tin được cung cấp",
                    customer = customer
                });;
            }

            return Ok(new {
                Status = true,
                Message = "Đăng nhập thành công",
                Token = GenerateJSONWebToken(cc),
                User = cc
            });
        }

        [HttpGet("test")]
        [Authorize]
        public IActionResult test()
        {
            var currentUser = HttpContext.User;

            var tester = Int32.Parse(currentUser.Claims.FirstOrDefault(c => c.Type == "UserId").Value);

            return Ok(new
            {
                status = true,
                message = "Test ne",
                test = tester
            });
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetMe()
        {
            var currentUser = HttpContext.User;
            if(currentUser.HasClaim(c=> c.Type == "UserId"))
            {
                var UserId = Int32.Parse(currentUser.Claims.FirstOrDefault(c => c.Type == "UserId").Value);

                var customer = await _context.Customer.FirstOrDefaultAsync(c => c.cus_id == UserId);

                return Ok(new
                {
                    status = true,
                    user = customer
                });
            }

            return NotFound(new
            {
                status = false,
                message = "Đăng nhập để sử dụng tính năng này"
            });
        }

        private string GenerateJSONWebToken(Customer customer)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, customer.cus_username),
                new Claim("UserId", customer.cus_id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(9999),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // PUT: api/User/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer customer)
        {
            if (id != customer.cus_id)
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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

        // POST: api/User
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost("register")]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            _context.Customer.Add(customer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomer", new { id = customer.cus_id }, customer);
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Customer>> DeleteCustomer(int id)
        {
            var customer = await _context.Customer.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customer.Remove(customer);
            await _context.SaveChangesAsync();

            return customer;
        }

        private bool CustomerExists(int id)
        {
            return _context.Customer.Any(e => e.cus_id == id);
        }
    }
}
