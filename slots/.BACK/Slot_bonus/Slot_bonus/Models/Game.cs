using Slot_bonus.Data;
using Slot_bonus.Models.Helper_types;
using Slot_bonus.Models.Symbols;
namespace Slot_bonus.Models
{
    public class Game
    {
        public List<Reel> Reels = new List<Reel>();
        public List<Location> ActiveLocations = new List<Location>();
        public List<Location> InactiveLocations = new List<Location>();
        public int MapWidth { get; }
        public int MapHeight { get; }
        public int rollsleft { get; set; }   

        public Game(int mapWidth, int mapHeight)
        {
            rollsleft = 3;
            MapWidth = mapWidth;
            MapHeight = mapHeight;
            InitializeLocations();
            int startingsymbolamount = getstartingsymbolamount();
            Dictionary<int, Dictionary<int, SymbolInfo>> startingLocations = SelectStartingLocations(startingsymbolamount);
            Dictionary<int, SymbolInfo> symbolsInfoOnReel;
            for (int i = 0; i < mapWidth; i++)
            {
                List<Symbol> symbolsOnReel = new List<Symbol>(mapHeight);
                bool istheresymbolsInfoOnReel = startingLocations.TryGetValue(i , out symbolsInfoOnReel);
                for(int j = 0; j < mapHeight ; j++)
                {
                    SymbolInfo symbolInfo;
                    if (istheresymbolsInfoOnReel && symbolsInfoOnReel.TryGetValue(j , out symbolInfo))
                    {
                        symbolsOnReel.Add(new PointSymbol(symbolInfo.Id, j, i, symbolInfo.Value));
                    }
                    else
                    {
                        symbolsOnReel.Add(new Symbol(0 , j ,i));
                    }
                }
                Reel createdreel = new Reel(symbolsOnReel);
                Reels.Add(createdreel);
            }
        }

        private Dictionary<int, Dictionary<int, SymbolInfo>> SelectStartingLocations(int amount)
        {
            var selectedLocations = new Dictionary<int, Dictionary<int, SymbolInfo>>();
            Random rnd = new Random();

            for (int i = 0; i < amount; i++)
            {
                if (InactiveLocations.Count == 0)
                {
                    break;
                }
                int rand = rnd.Next(0, InactiveLocations.Count);
                Location chosenloc = InactiveLocations[rand];
                InactiveLocations.Remove(chosenloc);
                SymbolInfo newsymbolinfo = SymbolData.Generetastartingsymbol();
                AddToActiveLocations(chosenloc);
                if (!selectedLocations.ContainsKey(chosenloc.reelindex))
                {
                    selectedLocations[chosenloc.reelindex] = new Dictionary<int, SymbolInfo>();
                }
                selectedLocations[chosenloc.reelindex].Add(chosenloc.symbolindex , newsymbolinfo);
            }

            return selectedLocations;
        }

        private void AddToActiveLocations(Location loc)
        {
            int index = ActiveLocations.FindIndex(l => (l.reelindex > loc.reelindex) || (l.reelindex == loc.reelindex && l.symbolindex > loc.symbolindex));
            if (index == -1)
            {
                ActiveLocations.Add(loc);
            }
            else
            {
                ActiveLocations.Insert(index, loc);
            }
        }

        private int getstartingsymbolamount()
        {
            Random rnd = new Random();
            int randomNumber = rnd.Next(100);
            return randomNumber < 80 ? 3 : 4;
        }

        private void InitializeLocations()
        {
            InactiveLocations = new List<Location>();

            for (int reelIndex = 0; reelIndex < MapWidth; reelIndex++)
            {
                for (int symbolIndex = 0; symbolIndex < MapHeight; symbolIndex++)
                {
                    var location = new Location(symbolIndex, reelIndex);
                    InactiveLocations.Add(location);
                }
            }
        }

        private void Doactions(Location culprit, Location[] targets)
        {

        }

        private RollInfo roll()
        {
            List<SpecialHits> specialhits = new List<SpecialHits>();
            List<PointSymbol> newsymbols = new List<PointSymbol>();
            List<Symbol> doactionsymbols= new List<Symbol>();
            rollsleft -= 1;
            bool somethingcameup = false;
            for(int i = 0; i < InactiveLocations.Count; i++)
            {
                int newid = SymbolData.GenerateRandomId();
                if(newid > 0)
                {
                    somethingcameup = true;
                    int value = SymbolData.GenerateRandomValue();
                    Location loc = InactiveLocations[i];
                    InactiveLocations.RemoveAt(i);
                    AddToActiveLocations(loc);
                    PointSymbol newSymbol;
                    switch (newid)
                    {
                        case 1:
                            newSymbol = new PointSymbol(newid, loc.symbolindex, loc.reelindex, value);
                            break;
                        case 2:
                            newSymbol = new Collector(newid, loc.symbolindex, loc.reelindex, value);
                            doactionsymbols.Add(newSymbol);
                            break;
                        case 3:
                            newSymbol = new Payer(newid, loc.symbolindex, loc.reelindex, value);
                            doactionsymbols.Add(newSymbol);
                            break;
                        case 4:
                            newSymbol = new Sniper(newid, loc.symbolindex, loc.reelindex, value);
                            doactionsymbols.Add(newSymbol);
                            break;
                        default:
                            newSymbol = new PointSymbol(newid, loc.symbolindex, loc.reelindex , value);
                            break;
                    }
                    newsymbols.Add(new PointSymbol(newid , loc.symbolindex , loc.reelindex , value));
                    Reels[loc.reelindex].Symbols[loc.symbolindex] = newSymbol;
                }
            }
            if(doactionsymbols.Count > 0)
            {
                foreach(Symbol symbol in doactionsymbols)
                {
                    if(symbol is SpecialSymbol specialSymbol)
                    {
                        var targets = specialSymbol.SelectTargets(ActiveLocations);
                        specialSymbol.DoAction(targets, Reels);
                        specialhits.Add(new SpecialHits(specialSymbol.location, targets));
                    }
                }
            }
            if (somethingcameup)
            {
                rollsleft += 1;
            }
            return new RollInfo(specialhits,newsymbols);
        }
    }
}
