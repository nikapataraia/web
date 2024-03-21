namespace Slot_bonus.Models.Symbols
{
    public abstract class SpecialSymbol : PointSymbol
    {
        protected SpecialSymbol(int id, int symbolindex, int reelindex, int value) : base(id, symbolindex, reelindex, value)
        {
        }

        public abstract void DoAction();

    }
}
