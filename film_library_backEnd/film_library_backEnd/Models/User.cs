using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace film_library_backEnd.Models
{
    [Table("users")]
    public partial class User
    {
        public User()
        {
            Categories = new HashSet<Category>();
            Films = new HashSet<Film>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(60)]
        [Unicode(false)]
        public string FirstName { get; set; } = null!;
        [StringLength(60)]
        [Unicode(false)]
        public string LastName { get; set; } = null!;
        [StringLength(30)]
        [Unicode(false)]
        public string UserName { get; set; } = null!;
        [StringLength(90)]
        [Unicode(false)]
        public string Email { get; set; } = null!;
        [StringLength(256)]
        [Unicode(false)]
        public string Password { get; set; } = null!;

        [InverseProperty("IdUserNavigation")]
        public virtual ICollection<Category> Categories { get; set; }
        [InverseProperty("User")]
        public virtual ICollection<Film> Films { get; set; }
    }
}
