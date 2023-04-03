using film_library_backEnd.Data;
using film_library_backEnd.Models;
using film_library_backEnd.Models.Common;
using film_library_backEnd.Models.Reponse;
using film_library_backEnd.Models.Request;
using film_library_backEnd.Tools;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace film_library_backEnd.Services
{
    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public async Task<UserResponse> Auth(UserAuthRequest model)
        {
            UserResponse uReponse = new UserResponse();
            using (var db = new FILM_LIBRARYContext())
            {
                string spassword = Encrypt.GetSHA256(model.password);

                var user = await db.Users.FirstOrDefaultAsync(x => x.UserName == model.userName
                && x.Password == spassword);

                if (user == null) return null;
                uReponse.userName = user.UserName;
                uReponse.token = GenerateToken(user);
            }

            return uReponse;
        }

        private string GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(_appSettings.secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new Claim[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                        new Claim(ClaimTypes.NameIdentifier, user.UserName.ToString())
                    }
                    ),
                Expires = DateTime.UtcNow.AddDays(60),
                SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task<UserRegisterResponse> Register(UserRegisterRequest model)
        {
            UserRegisterResponse uResponse = new UserRegisterResponse();

            using (var db = new FILM_LIBRARYContext())
            {
                if (await db.Users.AnyAsync(x => x.UserName == model.userName && x.Email == model.email))
                {
                    uResponse.userName = model.userName;
                    uResponse.email = model.email;
                    return null;
                }
                uResponse.userName = model.userName;
                uResponse.email = model.email;

                var user = new User();
                user.FirstName = model.firstName;
                user.LastName = model.lastName;
                user.UserName = model.userName;
                user.Email = model.email;
                user.Password = Encrypt.GetSHA256(model.password);

                db.Users.Add(user);
                await db.SaveChangesAsync();

                return uResponse;

            }

        }
    }
}