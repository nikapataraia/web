using Slot_bonus.Models.Helper_types;

namespace Slot_bonus.Models.Symbols
{
    public abstract class SpecialSymbol : PointSymbol
    {
        protected SpecialSymbol(int id, int symbolindex, int reelindex, int value) : base(id, symbolindex, reelindex, value)
        {
        }

        public abstract void DoAction(List<Location> targets , List<Reel> reels);
        public abstract List<Location> SelectTargets(List<Location> opensymbols);

    }
}
