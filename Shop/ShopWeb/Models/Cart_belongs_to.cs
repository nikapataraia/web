using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopWeb.Models
{
    [PrimaryKey(nameof(cart_id), nameof(BelongsTo))]
    public class Cart_belongs_to
    {
        [ForeignKey(nameof(Cart))]
        public int cart_id { get; set; }

        [ForeignKey(nameof(Account))]
        public int BelongsTo { get; set; }

    }
}
