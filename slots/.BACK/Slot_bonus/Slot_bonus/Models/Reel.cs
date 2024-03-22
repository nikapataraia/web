using Slot_bonus.Models.Symbols;

namespace Slot_bonus.Models
{
    public class Reel
    {
        public List<Symbol> Symbols { get; set; }
        public Reel(List<Symbol> startingsymbols) {
            this.Symbols = startingsymbols;
        }
    }
}
