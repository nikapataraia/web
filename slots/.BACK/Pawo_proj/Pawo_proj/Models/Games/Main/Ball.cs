namespace Pawo_proj.Models.Games.Main
{
    public class Ball
    {
        private int BetAmount { get; set; }
        private int Finisher { get;  set; }
        private int ID { get; set; }
        private int Type { get;  set; }
        private static int id = 0;
        public Ball(int bet, int finisher, int type = 0)
        {
            this.BetAmount = bet;
            this.Finisher = finisher;
            ID = id;
            Type = type;
            id++;
        }
        public int getID()
        {
            return ID;
        }
        public int getBetAmount()
        {
            return BetAmount;
        }
    }
}
