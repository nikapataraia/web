﻿using Slot_bonus.Models.Helper_types;

namespace Slot_bonus.Models.Symbols
{
    public class Sniper : SpecialSymbol
    {
        public Sniper(int id, int symbolindex, int reelindex, int value) : base(id, symbolindex, reelindex, value)
        {
        }

        public override void DoAction(Location[] targets)
        {
            throw new NotImplementedException();
        }
    }
}
