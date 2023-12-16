using System.ComponentModel.DataAnnotations;

namespace ShopWeb.Models
{
    public class Item
    {
        [Key]
        public int id { get; set; }
        [Required]
        public string name { get; set; }
        [Required]
        public int price { get; set; }
        public string description { get; set; }
        public string image_url { get; set; }

    }
}
