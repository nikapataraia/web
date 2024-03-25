namespace Slot_bonus.Models.Helper_types
{
    public class SpecialHits
    {
        public Location actiondoer { get; set; }
        public List<Location> Targets { get; }


        public SpecialHits(Location loc, List<Location> targets1)
        {
            actiondoer = loc;
            Targets = targets1;
        }
    }
}
