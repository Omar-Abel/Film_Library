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
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("firstName")]
        [StringLength(30)]
        [Unicode(false)]
        public string FirstName { get; set; } = null!;
        [Column("lastName")]
        [StringLength(30)]
        [Unicode(false)]
        public string LastName { get; set; } = null!;
        [Column("userName")]
        [StringLength(30)]
        [Unicode(false)]
        public string UserName { get; set; } = null!;
        [Column("email")]
        [StringLength(60)]
        [Unicode(false)]
        public string Email { get; set; } = null!;
        [Column("password")]
        [StringLength(256)]
        [Unicode(false)]
        public string Password { get; set; } = null!;
    }
}
