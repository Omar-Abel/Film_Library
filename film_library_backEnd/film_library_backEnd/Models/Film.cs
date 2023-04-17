using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace film_library_backEnd.Models
{
    public partial class Film
    {
        [Key]
        public int Id { get; set; }
        [StringLength(60)]
        [Unicode(false)]
        public string Tittle { get; set; } = null!;
        [StringLength(60)]
        [Unicode(false)]
        public string Director { get; set; } = null!;
        [StringLength(450)]
        [Unicode(false)]
        public string Description { get; set; } = null!;
        [Column(TypeName = "date")]
        public DateTime ReleaseDate { get; set; }
        [StringLength(90)]
        [Unicode(false)]
        public string Category { get; set; } = null!;
        [StringLength(300)]
        [Unicode(false)]
        public string ImagePath { get; set; } = null!;
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        [InverseProperty("Films")]
        [JsonIgnore]
        public virtual User User { get; set; } = null!;
    }
}
