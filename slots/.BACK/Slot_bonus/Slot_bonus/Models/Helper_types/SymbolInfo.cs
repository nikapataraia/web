namespace Slot_bonus.Models.Helper_types
{
    public class SymbolInfo
    {
        public int Id { get; set; }
        public int Value { get; set; }

        public SymbolInfo(int id, int value)
        {
            Id = id;
            Value = value;
        }
    }
}
