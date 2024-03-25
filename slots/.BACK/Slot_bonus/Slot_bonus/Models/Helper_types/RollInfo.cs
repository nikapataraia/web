using Slot_bonus.Models.Symbols;

namespace Slot_bonus.Models.Helper_types
{
    public class RollInfo
    {
        public List<SpecialHits> SpecialHits { get; set; }
        public List<PointSymbol> PointSymbols { get; set; }

        public RollInfo(List<SpecialHits> specialHits, List<PointSymbol> pointSymbols)
        {
            SpecialHits = specialHits ?? new List<SpecialHits>();
            PointSymbols = pointSymbols ?? new List<PointSymbol>();
        }

    }
}
