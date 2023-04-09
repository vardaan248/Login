using LoginWebAPI.Context;
using LoginWebAPI.Helpers;
using LoginWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Text.RegularExpressions;

namespace LoginWebAPI.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _authContext;
        public UserController(AppDbContext appDbContext)
        {
            _authContext = appDbContext;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();

            var user = await _authContext.Users.FirstOrDefaultAsync(x => x.Username == userObj.Username && x.Password == userObj.Password);

            if (user == null)
                return NotFound(new { Message = "User not found" });

            return Ok(new { Message = "Login Success" });
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }

            // Valdidate uniqueness for email and username
            if (await IsUsernameExists(userObj.Username))
                return BadRequest(new { Message = "Username already exists" });
            
            if (await IsEmailExists(userObj.Email))
                return BadRequest(new { Message = "Email already exists" });

            // Validating password strength
            var pass = CheckPasswordStrength(userObj.Password);
            if (!string.IsNullOrEmpty(pass))
                return BadRequest(new { Message = pass });

            userObj.Password = PasswordHasher.HashPassword(userObj.Password);
            userObj.Role = "User";
            userObj.Token = string.Empty;

            await _authContext.Users.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
            return Ok(new { Message = "User registered successfully" });
        }

        private async Task<bool> IsUsernameExists(string userName) => await _authContext.Users.AnyAsync(user => user.Username == userName);

        private async Task<bool> IsEmailExists(string email) => await _authContext.Users.AnyAsync(user => user.Email == email);

        private string CheckPasswordStrength(string password)
        {
            StringBuilder sb = new();
            if (password.Length < 8)
                sb.Append("Minimum password length should be 8" + Environment.NewLine);

            if (Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]") && Regex.IsMatch(password, "[0-9]"))
                sb.Append("Passowrd should be Alphanumeric" + Environment.NewLine);

            if (Regex.IsMatch(password, "[<,>,@,!,$,*,%,^,&]"))
                sb.Append("Password should contain special characters like ([<,>,@,!,$,*,%,^,&])" + Environment.NewLine);

            return sb.ToString();
        }
    }
}
