using Slot_bonus.Models.Helper_types;

namespace Slot_bonus.Models.Symbols
{
    public class Collector : SpecialSymbol
    {
        public Collector(int id, int symbolindex, int reelindex, int value) : base(id, symbolindex, reelindex, value)
        {
        }

        public override void DoAction(List<Location> targets, List<Reel> reels)
        {
            throw new NotImplementedException();
        }

        public override List<Location> SelectTargets(List<Location> opensymbols)
        {
            return opensymbols.Where(loc => loc.reelindex != this.location.reelindex && loc.symbolindex != this.location.symbolindex).ToList(); ;
        }
    }
}
