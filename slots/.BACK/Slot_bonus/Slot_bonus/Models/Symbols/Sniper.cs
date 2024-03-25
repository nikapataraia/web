using Slot_bonus.Data;
using Slot_bonus.Models.Helper_types;

namespace Slot_bonus.Models.Symbols
{
    public class Sniper : SpecialSymbol
    {
        public Sniper(int id, int symbolindex, int reelindex, int value) : base(id, symbolindex, reelindex, value)
        {
        }

        public override void DoAction(List<Location> targets, List<Reel> reels)
        {
            foreach (var target in targets)
            {
                var symbol = reels[target.reelindex].Symbols[target.symbolindex];

                if (symbol is PointSymbol pointSymbol)
                {
                    pointSymbol.value = this.value * pointSymbol.value;
                }
            }
        }
        public override List<Location> SelectTargets(List<Location> opensymbols)
        {
            Random rnd = new Random();
            int targetCount = rnd.Next(SymbolData.mintargetsforsniper,SymbolData.maxtargetsforsniper + 1);
            List<Location> openSymbolsCopy = new List<Location>(opensymbols);
            openSymbolsCopy = openSymbolsCopy.Where(loc => loc.reelindex != this.location.reelindex && loc.symbolindex != this.location.symbolindex).ToList();
            List<Location> selectedTargets = new List<Location>();
            for(int i = 0; i < targetCount; i++)
            {
                int index = rnd.Next(openSymbolsCopy.Count);
                Location selectedLocation = openSymbolsCopy[index];
                selectedTargets.Add(selectedLocation);
            }
            return selectedTargets;
        }
    }
}
