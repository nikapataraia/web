using Slot_bonus.Models.Helper_types;

namespace Slot_bonus.Models.Symbols
{
    public class Symbol
    {
        public int id { get; set; }
        public Location location { get; set; }

        public Symbol(int id, int symbolindex , int reelindex)
        {
            this.id = id;
            this.location = new Location(symbolindex, reelindex);
        }
    }
}
