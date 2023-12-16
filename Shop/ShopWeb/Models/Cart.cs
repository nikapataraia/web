using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopWeb.Models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string name { get;set; }
    }
}
