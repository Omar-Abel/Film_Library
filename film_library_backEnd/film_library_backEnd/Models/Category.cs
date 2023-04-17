using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace film_library_backEnd.Models
{
    public partial class Category
    {
        [Key]
        public int Id { get; set; }
        [StringLength(60)]
        [Unicode(false)]
        public string Name { get; set; } = null!;
        public int IdUser { get; set; }

        [ForeignKey("IdUser")]
        [InverseProperty("Categories")]
        public virtual User IdUserNavigation { get; set; } = null!;
    }
}
