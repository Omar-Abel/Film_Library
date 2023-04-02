using film_library_backEnd.Data;
using film_library_backEnd.Models;
using film_library_backEnd.Models.Common;
using film_library_backEnd.Models.Reponse;
using film_library_backEnd.Models.Request;
using film_library_backEnd.Tools;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace film_library_backEnd.Services
{
    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public UserResponse Auth(UserAuthRequest model)
        {
            UserResponse uReponse = new UserResponse();
            Response reponse = new Response();
            using (var db = new FILM_LIBRARYContext())
            {
                string spassword = Encrypt.GetSHA256(model.password);

                var user = db.Users.Where(x => x.UserName == model.userName 
                && x.Password == spassword).FirstOrDefault();

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

    }
}
