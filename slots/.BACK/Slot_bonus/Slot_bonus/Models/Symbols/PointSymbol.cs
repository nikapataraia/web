namespace Slot_bonus.Models.Symbols
{
    public class PointSymbol : Symbol
    {
        public int value { get; set; }
        public PointSymbol(int id, int symbolindex, int reelindex, int value) : base(id, symbolindex, reelindex)
        {
            this.value = value;
        }
    }
}
