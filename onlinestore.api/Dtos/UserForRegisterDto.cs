using System;
using System.ComponentModel.DataAnnotations;

namespace onlinestore.api.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [StringLength(20, MinimumLength = 6, ErrorMessage = "Password must be between 6 to 20 characters")]
        [Required]
        public string Password { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}