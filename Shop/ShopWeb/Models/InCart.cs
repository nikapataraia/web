using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace ShopWeb.Models
{
    [PrimaryKey(nameof(CartId), nameof(ItemId))]
    public class InCart
    {
        [ForeignKey(nameof(Cart))]
        public int CartId { get; set; }

        [ForeignKey(nameof(Item))]
        public int ItemId { get; set; }

        [Range(1, 10000)]
        public int Amount { get; set; }
    }
}
