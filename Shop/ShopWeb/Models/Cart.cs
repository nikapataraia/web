using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopWeb.Models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey(nameof(Account))]

        public int BelongsTo { get; set; }
    }
}
