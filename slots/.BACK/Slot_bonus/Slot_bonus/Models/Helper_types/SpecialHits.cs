namespace Slot_bonus.Models.Helper_types
{
    public class SpecialHits
    {
        public Location actiondoer { get; set; }
        public Location[] targets { get; set; }
        public SpecialHits(Location actiondoer , Location[] targets) {
            this.actiondoer= actiondoer;
            this.targets= targets;
        }
    }
}
