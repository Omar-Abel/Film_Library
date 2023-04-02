using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace film_library_backEnd.Models
{
    public partial class Film
    {
        [Key]
        public int Id { get; set; }
        [Column("tittle")]
        [StringLength(30)]
        [Unicode(false)]
        public string Tittle { get; set; } = null!;
        [Column("description")]
        [StringLength(256)]
        [Unicode(false)]
        public string Description { get; set; } = null!;
        [Column("releaseDate", TypeName = "date")]
        public DateTime ReleaseDate { get; set; }
        [Column("category")]
        [StringLength(50)]
        [Unicode(false)]
        public string Category { get; set; } = null!;
        [Column("imagePath")]
        [StringLength(1)]
        [Unicode(false)]
        public string ImagePath { get; set; } = null!;
    }
}
