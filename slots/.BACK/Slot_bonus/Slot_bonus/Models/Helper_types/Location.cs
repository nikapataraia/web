namespace Slot_bonus.Models.Helper_types
{
    public class Location
    {
        public int symbolindex { get; set; }
        public int reelindex { get; set; }
        public Location(int symbolindex, int reelindex)
        {
            this.symbolindex = symbolindex;
            this.reelindex = reelindex;
        }
    }
}
